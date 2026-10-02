import type { Dictionary } from '@/content';
import { Section } from './Section';

export function About({ dict }: { dict: Dictionary }) {
  return (
    <Section id="about" title={dict.about.title}>
      <div className="flex max-w-2xl flex-col gap-4 text-lg leading-relaxed">
        {dict.about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}
