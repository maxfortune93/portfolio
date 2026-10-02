import type { Metadata, Viewport } from 'next';
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { notFound } from 'next/navigation';
import { getDictionary, isLocale, locales } from '@/content';
import { getSiteUrl, languageAlternates, localePath } from '@/lib/site';
import '../globals.css';

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display' });
const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
});
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f7f9' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1318' },
  ],
};

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  if (!isLocale(params.lang)) return {};
  const dict = getDictionary(params.lang);
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: dict.meta.title,
    description: dict.meta.description,
    authors: [{ name: 'Marouane Pondikpa', url: siteUrl }],
    alternates: {
      canonical: localePath(params.lang),
      languages: { ...languageAlternates(), 'x-default': siteUrl },
      // Dica para agentes: índice em texto puro do site.
      types: { 'text/plain': '/llms.txt' },
    },
    openGraph: {
      type: 'profile',
      url: localePath(params.lang),
      title: dict.meta.title,
      description: dict.meta.description,
      siteName: 'Marouane Pondikpa',
      locale: params.lang,
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.meta.title,
      description: dict.meta.description,
    },
  };
}

// Aplica o tema salvo antes da primeira pintura, para não piscar.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();

  return (
    <html
      lang={params.lang}
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div aria-hidden="true" className="scroll-progress" />
        <div aria-hidden="true" className="bg-aurora">
          <div className="blob blob-a" />
          <div className="blob blob-b" />
        </div>
        {children}
      </body>
    </html>
  );
}
