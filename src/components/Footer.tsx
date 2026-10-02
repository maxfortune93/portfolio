import type { Dictionary } from '@/content';
import { profile } from '@/content';

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} {profile.name}. {dict.footer.rights}
        </p>
        <p className="flex flex-wrap gap-x-4 gap-y-1">
          <span>{dict.footer.builtWith}</span>
          <a
            href={profile.siteRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent"
          >
            {dict.footer.source}
          </a>
        </p>
      </div>
    </footer>
  );
}
