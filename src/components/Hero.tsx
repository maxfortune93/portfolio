import type { Dictionary, Locale } from '@/content';
import { profile } from '@/content';
import { DownloadIcon, GithubIcon, LinkedinIcon } from './Icons';

export function Hero({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const { hero } = dict;
  const resume = profile.resumes[lang];
  const [firstName, ...rest] = profile.name.split(' ');
  const facts = [
    { label: hero.factRole, value: hero.role },
    { label: hero.factStack, value: profile.mainStack.join(', ') },
    { label: hero.factStatus, value: hero.factStatusValue },
    ...(profile.showEmail ? [{ label: hero.factContact, value: profile.email }] : []),
  ];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="mx-auto flex max-w-5xl flex-col gap-14 px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28">
        <div className="rise flex flex-col gap-7">
          <p className="glass inline-flex w-fit items-center gap-2 rounded-full border border-success/40 px-4 py-1.5 font-mono text-xs text-success">
            <span className="relative flex h-2 w-2">
              <span
                aria-hidden="true"
                className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"
              />
              <span
                aria-hidden="true"
                className="relative inline-flex h-2 w-2 rounded-full bg-success"
              />
            </span>
            {hero.availability}
          </p>

          <h1
            id="hero-title"
            className="font-display font-bold leading-[0.92] tracking-tighter"
          >
            <span className="block text-6xl sm:text-8xl lg:text-9xl">{firstName}</span>
            <span className="outline-text block text-6xl sm:text-8xl lg:text-9xl">
              {rest.join(' ')}
            </span>
            <span className="gradient-text mt-5 block text-2xl font-medium tracking-tight sm:text-4xl">
              {hero.role}
            </span>
          </h1>

          <p className="max-w-xl text-lg text-muted sm:text-xl">{hero.subtitle}</p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-fg shadow-lg shadow-accent/30 transition-transform hover:-translate-y-0.5"
            >
              {hero.ctaProjects}
            </a>
            <a
              href={resume.href}
              download={resume.filename}
              className="glass inline-flex items-center gap-2 rounded-full border border-line px-6 py-3.5 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
            >
              <DownloadIcon />
              {hero.ctaResume}
              {resume.language !== lang ? ` (${resume.language.toUpperCase()})` : ''}
            </a>
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="glass grid h-12 w-12 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <GithubIcon />
            </a>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="glass grid h-12 w-12 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>

        <dl className="rise rise-delay glass grid min-w-0 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-[1fr_1.3fr_1.1fr_1.7fr]">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex min-w-0 flex-col gap-1 bg-surface/80 p-5"
            >
              <dt className="font-mono text-xs uppercase tracking-wider text-accent">
                {fact.label}
              </dt>
              <dd className="break-words text-sm font-medium">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
