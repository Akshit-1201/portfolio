import { ArrowUpRight, BookOpen } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import { PUBLICATION } from '../data/profile';

export default function PublicationSection() {
  return (
    <section
      id="publication"
      className="relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-28"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-12 sm:mb-16"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Publication
      </FadeIn>

      <FadeIn delay={0.1} y={30} className="max-w-4xl mx-auto">
        <a
          href={PUBLICATION.url}
          target="_blank"
          rel="noreferrer"
          className="group block rounded-[32px] sm:rounded-[44px] border border-white/10 p-7 sm:p-10 md:p-12 transition-colors duration-300 hover:border-white/25"
          style={{
            background:
              'radial-gradient(120% 120% at 0% 0%, rgba(129,140,248,0.12), transparent 55%), #111114',
          }}
        >
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[#D7E2EA]/80 text-xs uppercase tracking-widest font-medium">
              <BookOpen size={14} /> {PUBLICATION.venue} · {PUBLICATION.year}
            </span>
            <ArrowUpRight
              className="text-[#D7E2EA]/60 group-hover:text-[#D7E2EA] transition-colors"
              size={24}
            />
          </div>

          <h3
            className="text-[#D7E2EA] font-bold leading-tight mb-5"
            style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.6rem)' }}
          >
            {PUBLICATION.title}
          </h3>

          <p
            className="text-[#D7E2EA]/70 font-light leading-relaxed max-w-2xl"
            style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}
          >
            {PUBLICATION.note}
          </p>

          <div className="mt-7 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="text-[#D7E2EA]/50">
              Published on <span className="text-[#D7E2EA]/80">{PUBLICATION.publisher}</span>
            </span>
            <span className="text-[#D7E2EA]/50">
              DOI: <span className="text-[#818CF8]">{PUBLICATION.doi}</span>
            </span>
            <span className="ml-auto inline-flex items-center gap-1.5 text-[#D7E2EA] font-medium uppercase tracking-widest text-xs">
              Read paper <ArrowUpRight size={15} />
            </span>
          </div>
        </a>
      </FadeIn>
    </section>
  );
}
