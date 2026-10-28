import type { Dictionary } from '@/content';
import { profile } from '@/content';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const wrap = (body: string) =>
  `<div style="font-family:Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:24px;border:1px solid #d9dee6;border-radius:8px;color:#14181f;font-size:14px;line-height:24px">${body}</div>`;

const label = (text: string) =>
  `<p style="margin:16px 0 2px;font-weight:700;color:#5b6574">${escapeHtml(text)}</p>`;

interface Notification {
  name: string;
  email: string;
  subject: string;
  message: string;
  lang: string;
}

/** Aviso que chega para você quando alguém usa o formulário. */
export function notificationEmail({ name, email, subject, message, lang }: Notification) {
  const html = wrap(
    `<p style="margin:0 0 8px;font-weight:700;font-size:16px">Nova mensagem pelo portfólio</p>` +
      label('Nome') +
      `<p style="margin:0">${escapeHtml(name)}</p>` +
      label('Email (responda este email para falar com a pessoa)') +
      `<p style="margin:0">${escapeHtml(email)}</p>` +
      label('Assunto') +
      `<p style="margin:0">${escapeHtml(subject)}</p>` +
      `<hr style="border:0;border-top:1px solid #d9dee6;margin:16px 0">` +
      `<p style="margin:0;white-space:pre-wrap">${escapeHtml(message)}</p>` +
      `<p style="margin:16px 0 0;font-size:12px;color:#5b6574">Idioma da página: ${escapeHtml(lang)}</p>`,
  );
  const text = `Nome: ${name}\nEmail: ${email}\nAssunto: ${subject}\n\n${message}\n\nIdioma da página: ${lang}`;
  return { html, text };
}

/** Confirmação enviada ao visitante (só com CONTACT_SEND_CONFIRMATION=true). */
export function confirmationEmail(name: string, copy: Dictionary['emails']) {
  const paragraphs = copy.body
    .map((paragraph) => `<p style="margin:0 0 12px">${escapeHtml(paragraph)}</p>`)
    .join('');
  const html = wrap(
    `<p style="margin:0 0 12px">${escapeHtml(copy.greeting)}, ${escapeHtml(name)}.</p>` +
      paragraphs +
      `<p style="margin:0 0 12px">${escapeHtml(copy.signoff)}</p>` +
      `<p style="margin:0 0 4px;font-weight:700">${escapeHtml(profile.name)}</p>` +
      `<p style="margin:0"><a href="${profile.links.linkedin}" style="color:#0b6bcb">LinkedIn</a> · <a href="${profile.links.github}" style="color:#0b6bcb">GitHub</a></p>`,
  );
  const text = `${copy.greeting}, ${name}.\n\n${copy.body.join('\n\n')}\n\n${copy.signoff}\n${profile.name}`;
  return { html, text };
}
