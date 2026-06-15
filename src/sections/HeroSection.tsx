import type { MouseEvent } from 'react';
import { ArrowUpRight } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import { PROFILE, STATS } from '../data/profile';

function smoothScroll(e: MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
}

export default function HeroSection() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col" style={{ overflowX: 'clip' }}>
      {/* soft accent glow to fill the centre visually */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60vh] w-[60vw] rounded-full blur-[120px]"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.10), transparent 70%)' }}
      />

      {/* Main intro — vertically centred in the remaining space */}
      <div className="flex-1 flex items-center px-5 sm:px-8 md:px-10 pt-28 pb-10 lg:pt-24">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-4">
          {/* Left — intro */}
          <div className="lg:col-span-7">
            <FadeIn
              as="p"
              delay={0.05}
              y={-12}
              className="text-[#A855F7] font-medium uppercase tracking-[0.3em] text-xs sm:text-sm mb-4"
            >
              {PROFILE.role} · {PROFILE.location}
            </FadeIn>

            <FadeIn
              as="h1"
              delay={0.15}
              y={40}
              className="hero-heading font-black uppercase tracking-tight leading-[0.86] text-[15vw] sm:text-[13vw] lg:text-[9.5vw]"
            >
              Hi, I&apos;m
              <br />
              Akshit
            </FadeIn>

            <FadeIn delay={0.3} y={20} className="mt-6 sm:mt-8 max-w-lg">
              <p
                className="text-[#D7E2EA]/70 font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)' }}
              >
                {PROFILE.tagline}
              </p>
            </FadeIn>

            <FadeIn delay={0.45} y={20} className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4 sm:gap-5">
              <ContactButton href="#contact" />
              <a
                href="#projects"
                onClick={(e) => smoothScroll(e, '#projects')}
                className="inline-flex items-center gap-2 text-[#D7E2EA] font-medium uppercase tracking-widest text-sm hover:opacity-70 transition-opacity"
              >
                View Projects
                <ArrowUpRight size={18} />
              </a>
            </FadeIn>
          </div>

          {/* Right — avatar (drop your photo at public/avatar.png) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <FadeIn
              delay={0.4}
              x={40}
              y={0}
              className="relative w-[210px] sm:w-[290px] md:w-[340px] lg:w-full lg:max-w-[460px]"
            >
              <div
                className="absolute -inset-6 rounded-full blur-3xl"
                style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.30), transparent 70%)' }}
              />
              <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[28px] sm:rounded-[36px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent">
                <img
                  src={PROFILE.avatar}
                  alt={`${PROFILE.name}, ${PROFILE.role}`}
                  draggable={false}
                  className="h-full w-full object-cover object-center select-none transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Stats strip — anchors the hero and bridges the left/right columns */}
      <FadeIn delay={0.6} y={20} className="px-5 sm:px-8 md:px-10 pb-10 sm:pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 border-t border-white/10 pt-6 sm:pt-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <div
                className="hero-heading font-black leading-none"
                style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
              >
                {stat.value}
              </div>
              <div className="mt-1.5 text-[#D7E2EA]/55 uppercase tracking-wider text-[0.7rem] sm:text-xs font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
