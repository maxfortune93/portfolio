'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { ResolvedProject } from '@/content';
import { ArrowUpRightIcon } from './Icons';
import { TiltCard } from './TiltCard';

interface Labels {
  all: string;
  filter: string;
  repo: string;
  demo: string;
  empty: string;
}

/** Duas iniciais das primeiras palavras com letras (ignora pontuação e palavras curtas). */
const initials = (title: string) =>
  title
    .replace(/[^\p{L}\s]/gu, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();

// O filtro só aparece quando há projetos suficientes para fazer diferença.
const FILTER_MIN_PROJECTS = 4;

export function ProjectGrid({
  projects,
  labels,
}: {
  projects: ResolvedProject[];
  labels: Labels;
}) {
  const [tag, setTag] = useState<string | null>(null);

  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.stack))).sort(),
    [projects],
  );
  const visible = tag
    ? projects.filter((project) => project.stack.includes(tag))
    : projects;
  const showFilter = projects.length >= FILTER_MIN_PROJECTS;

  const chip = (active: boolean) =>
    `rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
      active
        ? 'border-accent bg-accent-soft text-accent'
        : 'border-line text-muted hover:text-fg'
    }`;

  return (
    <div className="flex flex-col gap-8">
      {showFilter ? (
        <div role="group" aria-label={labels.filter} className="flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={tag === null}
            onClick={() => setTag(null)}
            className={chip(tag === null)}
          >
            {labels.all}
          </button>
          {tags.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={tag === item}
              onClick={() => setTag(item)}
              className={chip(tag === item)}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      {visible.length === 0 ? (
        <p className="text-muted">{labels.empty}</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {visible.map((project) => (
            <li key={project.slug} className="min-w-0">
              <TiltCard
                id={`project-${project.slug}`}
                className="glass flex h-full flex-col gap-4 rounded-2xl border border-line p-6"
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt=""
                    width={800}
                    height={450}
                    className="aspect-video w-full rounded-md border border-line object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="relative grid aspect-[16/7] place-items-center overflow-hidden rounded-lg border border-line bg-gradient-to-br from-accent/25 via-accent-2/10 to-transparent"
                  >
                    <span className="outline-text font-display text-6xl font-bold tracking-tighter sm:text-7xl">
                      {initials(project.title)}
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <div className="flex items-baseline justify-between gap-4 font-mono text-xs text-muted">
                    <span>{project.company ?? ''}</span>
                    <span>{project.period ?? project.year}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold">{project.title}</h3>
                </div>
                <p className="text-muted">{project.summary}</p>
                {project.highlights.length > 0 ? (
                  <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted marker:text-accent">
                    {project.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                ) : null}
                <ul aria-label="Stack" className="mt-auto flex flex-wrap gap-2 pt-2">
                  {project.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-accent-soft px-3 py-1 font-mono text-xs text-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                {project.links.repo || project.links.demo ? (
                  <div className="flex gap-5 border-t border-line pt-4 text-sm font-medium">
                    {project.links.repo ? (
                      <a
                        href={project.links.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-accent"
                      >
                        {labels.repo}
                        <ArrowUpRightIcon />
                      </a>
                    ) : null}
                    {project.links.demo ? (
                      <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 hover:text-accent"
                      >
                        {labels.demo}
                        <ArrowUpRightIcon />
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </TiltCard>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
