import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import type { Dictionary } from '@/content';
import { profile } from '@/content';

interface ContactConfirmationProps {
  name: string;
  copy: Dictionary['emails'];
}

const text = { fontSize: 14, lineHeight: '24px', margin: '0 0 12px', color: '#14181f' };

/** Confirmação enviada ao visitante (só com CONTACT_SEND_CONFIRMATION=true). */
export function ContactConfirmation({ name, copy }: ContactConfirmationProps) {
  return (
    <Html>
      <Head />
      <Preview>{copy.confirmationSubject}</Preview>
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
          <Text style={text}>
            {copy.greeting}, {name}.
          </Text>
          {copy.body.map((paragraph) => (
            <Text key={paragraph} style={text}>
              {paragraph}
            </Text>
          ))}
          <Text style={text}>{copy.signoff}</Text>
          <Text style={{ ...text, fontWeight: 700, margin: '0 0 4px' }}>
            {profile.name}
          </Text>
          <Text style={{ ...text, margin: 0 }}>
            <Link href={profile.links.linkedin} style={{ color: '#0b6bcb' }}>
              LinkedIn
            </Link>
            {' · '}
            <Link href={profile.links.github} style={{ color: '#0b6bcb' }}>
              GitHub
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
