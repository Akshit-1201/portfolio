import { useEffect, useState } from 'react';
import { Github, Linkedin, FileText } from 'lucide-react';
import { NAV_LINKS, PROFILE } from '../data/profile';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[#0C0C0C]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-5 sm:px-8 md:px-10 py-4 md:py-5">
        {/* Wordmark */}
        <a
          href="#top"
          onClick={(e) => handleNav(e, '#top')}
          className="text-[#D7E2EA] font-semibold uppercase tracking-widest text-sm md:text-base hover:opacity-70 transition-opacity"
        >
          Akshit<span className="text-[#A855F7]">.</span>
        </a>

        {/* In-page links (full set only at lg+ where there's room for all six) */}
        <ul className="hidden lg:flex items-center gap-5 xl:gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-[0.82rem] xl:text-[0.95rem] transition-opacity duration-200 hover:opacity-70"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Socials + résumé */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#D7E2EA] hover:bg-white/10 transition-colors"
          >
            <Github size={18} />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-full text-[#D7E2EA] hover:bg-white/10 transition-colors"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#D7E2EA]/40 text-[#D7E2EA] px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium uppercase tracking-wider hover:bg-[#D7E2EA]/10 transition-colors"
          >
            <FileText size={15} />
            <span className="hidden sm:inline">Résumé</span>
          </a>
        </div>
      </nav>
    </header>
  );
}
