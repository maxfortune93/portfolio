import type { Dictionary } from './dictionary';
import { en } from './dictionaries/en';
import { fr } from './dictionaries/fr';
import { pt } from './dictionaries/pt';
import type { Locale } from './locales';

const dictionaries: Record<Locale, Dictionary> = { pt, en, fr };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

export * from './locales';
export { profile } from './profile';
export { getProjects, projects } from './projects';
export type { Dictionary, TimelineItem } from './dictionary';
export type { ResolvedProject } from './projects';
