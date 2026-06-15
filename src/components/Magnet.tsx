import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

type MagnetProps = {
  children: ReactNode;
  /** How far (px) outside the element edges the magnetic field reaches. */
  padding?: number;
  /** Higher = weaker pull (the offset is divided by this). */
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * Mouse-following magnetic hover effect. Tracks the cursor relative to the
 * element centre and translates the children toward it while the cursor is
 * within `padding` of the element's edges.
 */
export default function Magnet({
  children,
  padding = 100,
  strength = 2,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
  style,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      const withinX = Math.abs(distX) < rect.width / 2 + padding;
      const withinY = Math.abs(distY) < rect.height / 2 + padding;

      if (withinX && withinY) {
        setIsActive(true);
        setOffset({ x: distX / strength, y: distY / strength });
      } else {
        setIsActive(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [padding, strength]);

  return (
    <div ref={ref} className={className} style={style}>
      <div
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transition: isActive ? activeTransition : inactiveTransition,
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  );
}
