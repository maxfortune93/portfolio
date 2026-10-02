'use client';

import { useState } from 'react';
import type { Dictionary, Locale } from '@/content';
import { localeLabels, locales, profile } from '@/content';
import { CloseIcon, MenuIcon, MoonIcon, SunIcon } from './Icons';

interface HeaderProps {
  lang: Locale;
  dict: Dictionary;
  showExperience: boolean;
}

export function Header({ lang, dict, showExperience }: HeaderProps) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: '#projects', label: dict.nav.projects },
    { href: '#about', label: dict.nav.about },
    { href: '#stack', label: dict.nav.stack },
    ...(showExperience ? [{ href: '#experience', label: dict.nav.experience }] : []),
    { href: '#contact', label: dict.nav.contact },
  ];

  const toggleTheme = () => {
    const root = document.documentElement;
    const current =
      root.dataset.theme ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Armazenamento bloqueado: o tema vale só nesta visita.
    }
  };

  const rememberLocale = (locale: Locale) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000; samesite=lax`;
  };

  const linkClass =
    'rounded-md px-3 py-2 text-sm text-muted transition-colors hover:text-fg';

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href={`/${lang}`} className="font-display text-lg font-bold">
          {profile.shortName}
        </a>

        <nav
          aria-label={dict.nav.primaryNav}
          className="hidden items-center gap-1 md:flex"
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ul
            aria-label={dict.nav.language}
            className="flex items-center font-mono text-xs"
          >
            {locales.map((locale) => (
              <li key={locale}>
                <a
                  href={`/${locale}`}
                  hrefLang={locale}
                  lang={locale}
                  onClick={() => rememberLocale(locale)}
                  aria-current={locale === lang ? 'true' : undefined}
                  className={`rounded px-2 py-1 ${
                    locale === lang
                      ? 'bg-accent-soft text-accent'
                      : 'text-muted hover:text-fg'
                  }`}
                >
                  {localeLabels[locale]}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={dict.nav.switchTheme}
            className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted hover:text-fg"
          >
            <SunIcon />
            <MoonIcon />
          </button>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.nav.closeMenu : dict.nav.openMenu}
            className="grid h-9 w-9 place-items-center rounded-md border border-line text-muted hover:text-fg md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-menu"
          aria-label={dict.nav.primaryNav}
          className="border-t border-line bg-bg md:hidden"
        >
          <ul className="mx-auto flex max-w-5xl flex-col px-4 py-2 sm:px-6">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block ${linkClass} py-3 text-base`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
