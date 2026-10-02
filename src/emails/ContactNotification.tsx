import { Body, Container, Head, Hr, Html, Preview, Text } from '@react-email/components';

interface ContactNotificationProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  lang: string;
}

const text = { fontSize: 14, lineHeight: '24px', margin: '0 0 12px', color: '#14181f' };
const label = { ...text, fontWeight: 700, margin: '0 0 2px', color: '#5b6574' };

/** Aviso que chega para você quando alguém usa o formulário. */
export function ContactNotification({
  name,
  email,
  subject,
  message,
  lang,
}: ContactNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>{`${name}: ${subject}`}</Preview>
      <Body
        style={{ backgroundColor: '#ffffff', fontFamily: 'Helvetica, Arial, sans-serif' }}
      >
        <Container
          style={{
            maxWidth: 560,
            margin: '32px auto',
            padding: 24,
            border: '1px solid #d9dee6',
            borderRadius: 8,
          }}
        >
          <Text style={{ ...text, fontWeight: 700, fontSize: 16 }}>
            Nova mensagem pelo portfólio
          </Text>
          <Text style={label}>Nome</Text>
          <Text style={text}>{name}</Text>
          <Text style={label}>Email (responda este email para falar com a pessoa)</Text>
          <Text style={text}>{email}</Text>
          <Text style={label}>Assunto</Text>
          <Text style={text}>{subject}</Text>
          <Hr style={{ borderColor: '#d9dee6' }} />
          <Text style={{ ...text, whiteSpace: 'pre-wrap' }}>{message}</Text>
          <Hr style={{ borderColor: '#d9dee6' }} />
          <Text style={{ ...text, fontSize: 12, color: '#5b6574' }}>
            Idioma da página: {lang}
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
