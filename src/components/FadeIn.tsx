import { useMemo } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { motion } from 'framer-motion';

type FadeInProps = {
  children: ReactNode;
  /** Intrinsic element to render (div, h1, nav, ...). */
  as?: keyof JSX.IntrinsicElements;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * Scroll-into-view fade/slide wrapper. Uses `motion.create()` so the rendered
 * element type can be chosen dynamically via the `as` prop.
 */
export default function FadeIn({
  children,
  as = 'div',
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className,
  style,
}: FadeInProps) {
  // Memoise so we don't recreate (and therefore remount) the motion component
  // on every render.
  const MotionTag = useMemo(() => motion.create(as), [as]) as ElementType;

  return (
    <MotionTag
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}
