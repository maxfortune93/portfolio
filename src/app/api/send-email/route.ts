
import { EmailTemplate } from '@/email-templates';
import { Resend } from 'resend';
import * as React from "react";
import NewEmailTemplate from '@/email-templates/emailTo';

const resend = new Resend(process.env.RESEND_API_KEY);
console.log(resend)

export async function POST(req: Request) {
  const { email, subject, message } = await req.json();
  console.log(email)
  try {
     await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['marouanemiramax4@gmail.com'],
      subject: `${subject ?? 'Mensagem sem Subject'} `,
      react: EmailTemplate({userEmail: email, userMessage: message}),
    });

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['marouanemiramax4@gmail.com'], 
      subject: "Email de Confirmação",
      react: NewEmailTemplate(),
    });

    return Response.json({ message: 'Emails enviados com sucesso!' });
  } catch (error) {
    return Response.json({ error });
  }
}
