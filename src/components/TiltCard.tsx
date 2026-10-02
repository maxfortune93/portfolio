'use client';

import { useRef } from 'react';

interface TiltCardProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

const MAX_TILT = 7;

/** Cartão que inclina em 3D e acende um brilho onde o mouse está. Só reage a mouse. */
export function TiltCard({ id, className = '', children }: TiltCardProps) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (event: React.PointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node || event.pointerType !== 'mouse') return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    node.style.setProperty('--ry', `${(x - 0.5) * MAX_TILT * 2}deg`);
    node.style.setProperty('--rx', `${(0.5 - y) * MAX_TILT * 2}deg`);
    node.style.setProperty('--mx', `${x * 100}%`);
    node.style.setProperty('--my', `${y * 100}%`);
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty('--rx', '0deg');
    node.style.setProperty('--ry', '0deg');
  };

  return (
    <article
      ref={ref}
      id={id}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`tilt ${className}`}
    >
      {children}
    </article>
  );
}
