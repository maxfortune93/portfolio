'use client';

import { useEffect, useRef } from 'react';

/**
 * Faz o bloco subir e aparecer ao entrar na tela. O conteúdo nasce visível (HTML e crawlers
 * enxergam tudo); só o que está abaixo da dobra é escondido depois que o JS monta.
 */
export function Reveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    node.classList.add('reveal', 'reveal-hidden');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        node.classList.remove('reveal-hidden');
        observer.disconnect();
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
