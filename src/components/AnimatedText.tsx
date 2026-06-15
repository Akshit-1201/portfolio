import { useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

type AnimatedTextProps = {
  text: string;
  className?: string;
  style?: CSSProperties;
};

/**
 * A single character. The base span is invisible and only reserves layout
 * space; an absolutely positioned span on top animates its opacity from 0.2
 * to 1 across the character's slice of the parent's scroll progress.
 */
function Char({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span className="relative inline-block whitespace-pre">
      <span style={{ opacity: 0 }}>{char}</span>
      <motion.span className="absolute left-0 top-0 whitespace-pre" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

/**
 * Character-by-character scroll-reveal paragraph. Words are kept together
 * (so they don't break mid-word) while every character animates individually.
 */
export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Reduced motion: skip the scroll-driven per-character reveal and just show
  // the text at full opacity.
  if (prefersReduced) {
    return (
      <p className={className} style={style}>
        {text}
      </p>
    );
  }

  const total = text.length;
  const words = text.split(' ');

  let index = 0;
  const nodes: ReactNode[] = [];

  words.forEach((word, wordIndex) => {
    const wordChars = word.split('').map((char) => {
      const i = index++;
      return (
        <Char key={i} char={char} progress={scrollYProgress} range={[i / total, (i + 1) / total]} />
      );
    });

    nodes.push(
      <span key={`w-${wordIndex}`} className="inline-block whitespace-nowrap">
        {wordChars}
      </span>,
    );

    // Render the space between words as its own animating character so the
    // line can still wrap at word boundaries.
    if (wordIndex < words.length - 1) {
      const i = index++;
      nodes.push(
        <Char key={`s-${i}`} char=" " progress={scrollYProgress} range={[i / total, (i + 1) / total]} />,
      );
    }
  });

  return (
    <p ref={ref} className={className} style={style}>
      {nodes}
    </p>
  );
}
