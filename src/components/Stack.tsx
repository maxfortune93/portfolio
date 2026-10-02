import type { Dictionary } from '@/content';
import { Section } from './Section';

export function Stack({ dict }: { dict: Dictionary }) {
  return (
    <Section id="stack" title={dict.stack.title}>
      <div className="grid gap-8 sm:grid-cols-2">
        {dict.stack.groups.map((group) => (
          <div key={group.name} className="flex flex-col gap-3">
            <h3 className="font-mono text-xs uppercase tracking-widest text-accent">
              {group.name}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-line bg-surface px-3 py-1.5 text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
