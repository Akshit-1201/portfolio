import { ArrowUpRight } from 'lucide-react';

type LiveProjectButtonProps = {
  className?: string;
  href?: string;
  label?: string;
};

/**
 * Ghost / outline pill link used on the project cards.
 */
export default function LiveProjectButton({ className = '', href, label = 'View Project' }: LiveProjectButtonProps) {
  const cls = `inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-2.5 sm:px-8 sm:py-3 text-sm transition-colors duration-200 hover:bg-[#D7E2EA]/10 ${className}`;

  return (
    <a href={href ?? '#'} target="_blank" rel="noreferrer" className={cls}>
      {label}
      <ArrowUpRight size={18} />
    </a>
  );
}
