import type { Dictionary } from '@/content';
import { profile } from '@/content';
import { DownloadIcon, GithubIcon, LinkedinIcon } from './Icons';

export function Hero({ dict }: { dict: Dictionary }) {
  const { hero } = dict;
  const facts = [
    { label: hero.factRole, value: hero.role },
    { label: hero.factStack, value: profile.mainStack.join(', ') },
    { label: hero.factStatus, value: hero.factStatusValue },
    ...(profile.showEmail ? [{ label: hero.factContact, value: profile.email }] : []),
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="rise flex flex-col gap-6">
          <p className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent" />
            {hero.availability}
          </p>
          <h1
            id="hero-title"
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl"
          >
            {profile.name}
            <span className="mt-2 block text-3xl font-medium text-muted sm:text-4xl">
              {hero.role}
            </span>
          </h1>
          <p className="max-w-xl text-lg text-muted">{hero.subtitle}</p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-medium text-accent-fg hover:opacity-90"
            >
              {hero.ctaProjects}
            </a>
            <a
              href={profile.resume.href}
              download={profile.resume.filename}
              className="inline-flex items-center gap-2 rounded-md border border-line px-5 py-3 text-sm font-medium hover:border-accent hover:text-accent"
            >
              <DownloadIcon />
              {hero.ctaResume}
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid h-11 w-11 place-items-center rounded-md border border-line text-muted hover:border-accent hover:text-accent"
            >
              <GithubIcon />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid h-11 w-11 place-items-center rounded-md border border-line text-muted hover:border-accent hover:text-accent"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>

        <aside
          aria-labelledby="facts-title"
          className="rise rise-delay min-w-0 rounded-lg border border-line bg-surface p-6"
        >
          <h2
            id="facts-title"
            className="mb-4 font-mono text-xs uppercase tracking-widest text-accent"
          >
            {hero.factsTitle}
          </h2>
          <dl className="flex flex-col gap-4">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex flex-col gap-1 border-b border-line pb-4 last:border-0 last:pb-0"
              >
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  {fact.label}
                </dt>
                <dd className="break-words text-sm font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}
