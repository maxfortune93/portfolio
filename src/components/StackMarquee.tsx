import type { Dictionary } from '@/content';

/** Faixa contínua com a stack. A segunda cópia é só visual, escondida de leitores de tela. */
export function StackMarquee({ dict }: { dict: Dictionary }) {
  const items = dict.stack.groups.flatMap((group) => group.items);
  const track = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="marquee-track items-center font-display text-2xl font-bold text-muted sm:text-3xl"
    >
      {items.map((item) => (
        <li key={item} className="flex items-center gap-12 whitespace-nowrap">
          {item}
          <span aria-hidden="true" className="text-accent">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee border-y border-line py-6">
      {track(false)}
      {track(true)}
    </div>
  );
}
