import { Resend } from 'resend';
import { z } from 'zod';
import { defaultLocale, getDictionary, isLocale, profile } from '@/content';
import { ContactConfirmation } from '@/emails/ContactConfirmation';
import { ContactNotification } from '@/emails/ContactNotification';
import { isRateLimited } from '@/lib/rate-limit';

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

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return json({ ok: false, code: 'not_configured' }, 503);

  const resend = new Resend(apiKey);
  const from = process.env.RESEND_FROM ?? 'Portfolio <onboarding@resend.dev>';
  const to = process.env.CONTACT_TO_EMAIL || profile.email;
  const locale = lang && isLocale(lang) ? lang : defaultLocale;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      reply_to: email,
      subject: `[Portfólio] ${subject}`,
      react: ContactNotification({ name, email, subject, message, lang: locale }),
    });
    if (error) {
      console.error('contact: falha ao enviar notificação', error.name);
      return json({ ok: false, code: 'send_failed' }, 502);
    }

    if (process.env.CONTACT_SEND_CONFIRMATION === 'true') {
      const copy = getDictionary(locale).emails;
      const confirmation = await resend.emails.send({
        from,
        to: [email],
        subject: copy.confirmationSubject,
        react: ContactConfirmation({ name, copy }),
      });
      // A mensagem principal já chegou: falha na confirmação não vira erro para o visitante.
      if (confirmation.error) console.error('contact: falha ao enviar confirmação');
    }

    return json({ ok: true }, 200);
  } catch {
    console.error('contact: erro inesperado');
    return json({ ok: false, code: 'send_failed' }, 502);
  }
}
