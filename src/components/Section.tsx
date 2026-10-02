import { Reveal } from './Reveal';

interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}

export function Section({ id, title, intro, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-20 sm:py-28">
      <Reveal className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-12 flex max-w-2xl flex-col gap-4">
          <h2
            id={`${id}-title`}
            className="font-display text-4xl font-bold tracking-tight sm:text-6xl"
          >
            <span className="gradient-text">{title}</span>
          </h2>
          {intro ? <p className="text-lg text-muted">{intro}</p> : null}
        </div>
        {children}
      </Reveal>
    </section>
  );
}
