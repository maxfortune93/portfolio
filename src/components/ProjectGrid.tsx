'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import type { ResolvedProject } from '@/content';
import { ArrowUpRightIcon } from './Icons';

interface Labels {
  all: string;
  filter: string;
  repo: string;
  demo: string;
  empty: string;
}

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
              <article
                id={`project-${project.slug}`}
                className="flex h-full flex-col gap-4 rounded-lg border border-line bg-surface p-6"
              >
                {project.image ? (
                  <Image
                    src={project.image}
                    alt=""
                    width={800}
                    height={450}
                    className="aspect-video w-full rounded-md border border-line object-cover"
                  />
                ) : null}
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-xl font-bold">{project.title}</h3>
                  {project.year ? (
                    <span className="font-mono text-xs text-muted">{project.year}</span>
                  ) : null}
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
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
