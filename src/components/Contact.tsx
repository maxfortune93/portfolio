import type { Dictionary, Locale } from '@/content';
import { profile } from '@/content';
import { ContactForm } from './ContactForm';
import { GithubIcon, LinkedinIcon } from './Icons';
import { Section } from './Section';

export function Contact({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const socials = [
    { label: 'GitHub', href: profile.links.github, icon: <GithubIcon /> },
    { label: 'LinkedIn', href: profile.links.linkedin, icon: <LinkedinIcon /> },
  ];

  return (
    <Section id="contact" title={dict.contact.title} intro={dict.contact.intro}>
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr]">
        <div className="flex min-w-0 flex-col gap-8">
          {profile.showEmail ? (
            <div className="flex flex-col gap-2">
              <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
                {dict.contact.orWrite}
              </h3>
              <a
                href={`mailto:${profile.email}`}
                className="break-words font-medium hover:text-accent"
              >
                {profile.email}
              </a>
            </div>
          ) : null}
          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
              {dict.contact.social}
            </h3>
            <ul className="flex flex-col gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-accent"
                  >
                    {social.icon}
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ContactForm lang={lang} labels={dict.contact.form} />
      </div>
    </Section>
  );
}
