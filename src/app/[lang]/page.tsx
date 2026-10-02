import { notFound } from 'next/navigation';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { JsonLd } from '@/components/JsonLd';
import { Projects } from '@/components/Projects';
import { Stack } from '@/components/Stack';
import { StackMarquee } from '@/components/StackMarquee';
import { getDictionary, getProjects, isLocale } from '@/content';
import { buildStructuredData } from '@/lib/structured-data';

export default function Home({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();
  const lang = params.lang;
  const dict = getDictionary(lang);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-fg"
      >
        {dict.nav.skipToContent}
      </a>
      <Header lang={lang} dict={dict} showExperience={dict.experience.items.length > 0} />
      <main id="main">
        <Hero dict={dict} lang={lang} />
        <StackMarquee dict={dict} />
        <Projects dict={dict} projects={getProjects(lang)} />
        <About dict={dict} />
        <Stack dict={dict} />
        <Experience dict={dict} />
        <Contact dict={dict} lang={lang} />
      </main>
      <Footer dict={dict} />
      <JsonLd data={buildStructuredData(lang)} />
    </>
  );
}
