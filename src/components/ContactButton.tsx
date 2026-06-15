import type { MouseEvent } from 'react';

type ContactButtonProps = {
  className?: string;
  label?: string;
  /** When set, renders an anchor. In-page (#) targets smooth-scroll. */
  href?: string;
};

const CLASSES =
  'inline-block rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base transition-[filter] duration-200 hover:brightness-110';

const STYLE = {
  background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
  boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
  outline: '2px solid #FFFFFF',
  outlineOffset: '-3px',
} as const;

/**
 * Gradient pill call-to-action. Renders a button by default, or an anchor when
 * `href` is provided (in-page hash links smooth-scroll).
 */
export default function ContactButton({ className = '', label = 'Contact Me', href }: ContactButtonProps) {
  const cls = `${CLASSES} ${className}`;

  if (href) {
    const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
      if (href.startsWith('#')) {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    return (
      <a href={href} onClick={onClick} className={cls} style={STYLE}>
        {label}
      </a>
    );
  }

  return (
    <button type="button" className={cls} style={STYLE}>
      {label}
    </button>
  );
}
