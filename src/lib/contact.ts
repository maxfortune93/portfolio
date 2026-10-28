import { z } from 'zod';
import { defaultLocale, getDictionary, isLocale, profile } from '@/content';
import { confirmationEmail, notificationEmail } from './contact-email';
import { isRateLimited } from './rate-limit';

/** Variáveis usadas pelo formulário. No Next vêm de process.env; no Worker, de `env`. */
export interface ContactEnv {
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_SEND_CONFIRMATION?: string;
}

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(10).max(4000),
  lang: z.string().optional(),
  // Campo isca: pessoas não preenchem.
  website: z.string().optional(),
});

const json = (body: Record<string, unknown>, status: number) =>
  Response.json(body, { status });

interface SendInput {
  apiKey: string;
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

/** Envia pela API REST do Resend. Só usa `fetch`, então roda no Node e em Workers. */
async function sendWithResend({
  apiKey,
  from,
  to,
  subject,
  html,
  text,
  replyTo,
}: SendInput) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, html, text, reply_to: replyTo }),
  });
  return response.ok;
}

/** Lógica do formulário de contato, compartilhada pela rota do Next e pelo Worker. */
export async function handleContact(
  request: Request,
  env: ContactEnv,
): Promise<Response> {
  const ip =
    request.headers.get('cf-connecting-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    'unknown';
  if (isRateLimited(ip)) return json({ ok: false, code: 'rate_limited' }, 429);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, code: 'validation' }, 400);
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) return json({ ok: false, code: 'validation' }, 400);

  const { name, email, subject, message, lang, website } = parsed.data;

  // Robô preencheu a isca: responde sucesso e descarta.
  if (website) return json({ ok: true }, 200);

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) return json({ ok: false, code: 'not_configured' }, 503);

  const from = env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>';
  const to = env.CONTACT_TO_EMAIL || profile.email;
  const locale = lang && isLocale(lang) ? lang : defaultLocale;

  try {
    const notification = notificationEmail({
      name,
      email,
      subject,
      message,
      lang: locale,
    });
    const sent = await sendWithResend({
      apiKey,
      from,
      to,
      subject: `[Portfólio] ${subject}`,
      replyTo: email,
      ...notification,
    });
    if (!sent) {
      console.error('contact: falha ao enviar notificação');
      return json({ ok: false, code: 'send_failed' }, 502);
    }

    if (env.CONTACT_SEND_CONFIRMATION === 'true') {
      const confirmation = confirmationEmail(name, getDictionary(locale).emails);
      const confirmed = await sendWithResend({
        apiKey,
        from,
        to: email,
        subject: getDictionary(locale).emails.confirmationSubject,
        ...confirmation,
      });
      // A mensagem principal já chegou: falha na confirmação não vira erro para o visitante.
      if (!confirmed) console.error('contact: falha ao enviar confirmação');
    }

    return json({ ok: true }, 200);
  } catch {
    console.error('contact: erro inesperado');
    return json({ ok: false, code: 'send_failed' }, 502);
  }
}
