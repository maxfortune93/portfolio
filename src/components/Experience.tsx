import type { Dictionary } from '@/content';
import { Section } from './Section';

/** Só aparece quando há itens em `experience.items` nos dicionários. */
export function Experience({ dict }: { dict: Dictionary }) {
  if (dict.experience.items.length === 0) return null;

  return (
    <Section id="experience" title={dict.experience.title}>
      <ol className="flex max-w-2xl flex-col gap-8 border-l border-line pl-6">
        {dict.experience.items.map((item) => (
          <li key={`${item.organization}-${item.title}`} className="flex flex-col gap-1">
            <span className="font-mono text-xs text-muted">{item.period}</span>
            <h3 className="font-display text-lg font-bold">{item.title}</h3>
            <p className="text-sm text-accent">{item.organization}</p>
            {item.description ? <p className="text-muted">{item.description}</p> : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}
