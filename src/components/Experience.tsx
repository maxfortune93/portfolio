import type { Dictionary } from '@/content';
import { Section } from './Section';

/** Só aparece quando há itens em `experience.items` nos dicionários. */
export function Experience({ dict }: { dict: Dictionary }) {
  const { experience } = dict;
  if (experience.items.length === 0) return null;

  return (
    <Section id="experience" title={experience.title}>
      <div className="flex flex-col gap-14">
        <ol className="flex max-w-3xl flex-col gap-10 border-l border-line pl-6">
          {experience.items.map((item) => (
            <li
              key={`${item.organization}-${item.period}`}
              className="relative flex flex-col gap-2"
            >
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-2 h-2.5 w-2.5 rounded-full bg-accent"
              />
              <span className="font-mono text-xs text-muted">
                {item.period}
                {item.location ? ` · ${item.location}` : ''}
              </span>
              <h3 className="font-display text-xl font-bold">{item.title}</h3>
              <p className="text-sm font-medium text-accent">{item.organization}</p>
              {item.description ? <p className="text-muted">{item.description}</p> : null}
              {item.highlights?.length ? (
                <ul className="flex list-disc flex-col gap-1.5 pl-5 text-sm text-muted marker:text-accent">
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
              {item.tech?.length ? (
                <ul
                  aria-label={experience.technologies}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {item.tech.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-xs text-accent"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>

        <div className="grid gap-10 sm:grid-cols-2">
          {experience.education.length > 0 ? (
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                {experience.educationTitle}
              </h3>
              <ul className="flex flex-col gap-4">
                {experience.education.map((item) => (
                  <li key={item.title} className="flex flex-col gap-0.5">
                    <span className="font-medium">{item.title}</span>
                    <span className="text-sm text-muted">
                      {item.organization} · {item.period}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {experience.languages.length > 0 ? (
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                {experience.languagesTitle}
              </h3>
              <ul className="flex flex-col gap-2">
                {experience.languages.map((language) => (
                  <li
                    key={language.name}
                    className="flex flex-wrap justify-between gap-x-4 border-b border-line pb-2 text-sm"
                  >
                    <span className="font-medium">{language.name}</span>
                    <span className="text-muted">{language.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
