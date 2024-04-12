
import { EmailTemplate } from '@/email-templates';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
console.log(resend)

export async function POST(req: Request) {
  const { email, subject, message } = await req.json();
  console.log(email)
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['marouane.pondikpa@gmail.com', email],
      subject: 'Hello world',
      react: EmailTemplate(),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
