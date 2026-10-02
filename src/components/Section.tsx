interface SectionProps {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
}

export function Section({ id, title, intro, children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="border-t border-line py-16 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mb-10 flex max-w-2xl flex-col gap-3">
          <h2 id={`${id}-title`} className="font-display text-3xl font-bold sm:text-4xl">
            {title}
          </h2>
          {intro ? <p className="text-muted">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
