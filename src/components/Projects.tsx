import type { Dictionary, ResolvedProject } from '@/content';
import { profile } from '@/content';
import { ArrowUpRightIcon } from './Icons';
import { ProjectGrid } from './ProjectGrid';
import { Section } from './Section';

interface ProjectsProps {
  dict: Dictionary;
  projects: ResolvedProject[];
}

export function Projects({ dict, projects }: ProjectsProps) {
  return (
    <Section id="projects" title={dict.projects.title} intro={dict.projects.intro}>
      <ProjectGrid
        projects={projects}
        labels={{
          all: dict.projects.filterAll,
          filter: dict.projects.filterLabel,
          repo: dict.projects.repo,
          demo: dict.projects.demo,
          empty: dict.projects.empty,
        }}
      />
      <a
        href={`${profile.links.github}?tab=repositories`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
      >
        {dict.projects.moreOnGithub}
        <ArrowUpRightIcon />
      </a>
    </Section>
  );
}
