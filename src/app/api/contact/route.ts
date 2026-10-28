import { handleContact } from '@/lib/contact';

export function POST(request: Request) {
  return handleContact(request, {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM: process.env.RESEND_FROM,
    CONTACT_TO_EMAIL: process.env.CONTACT_TO_EMAIL,
    CONTACT_SEND_CONFIRMATION: process.env.CONTACT_SEND_CONFIRMATION,
  });
}
