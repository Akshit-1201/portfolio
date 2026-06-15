import { Github, Linkedin } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import EmailOptions from '../components/EmailOptions';
import { PROFILE, EDUCATION } from '../data/profile';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative z-10 px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-32 pb-12"
      style={{ background: '#0C0C0C' }}
    >
      <div className="max-w-5xl mx-auto text-center">
        <FadeIn as="p" delay={0} y={20} className="text-[#A855F7] font-medium uppercase tracking-[0.3em] text-xs sm:text-sm mb-5">
          Let&apos;s build something
        </FadeIn>

        <FadeIn
          as="h2"
          delay={0.05}
          y={40}
          className="hero-heading font-black uppercase leading-[0.95] tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 120px)' }}
        >
          Get in touch
        </FadeIn>

        <FadeIn delay={0.15} y={20} className="mt-8 sm:mt-10 flex justify-center">
          <EmailOptions />
        </FadeIn>

        <FadeIn delay={0.25} y={20} className="mt-8 flex items-center justify-center gap-4">
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[#D7E2EA]/80 hover:text-[#D7E2EA] transition-colors"
          >
            <Github size={18} /> <span className="text-sm">{PROFILE.githubHandle}</span>
          </a>
          <span className="text-white/20">·</span>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-[#D7E2EA]/80 hover:text-[#D7E2EA] transition-colors"
          >
            <Linkedin size={18} /> <span className="text-sm">{PROFILE.linkedinHandle}</span>
          </a>
        </FadeIn>
      </div>

      {/* Footer meta */}
      <div className="max-w-5xl mx-auto mt-20 sm:mt-24 pt-8 border-t border-white/10 grid gap-6 sm:grid-cols-2 text-[#D7E2EA]/55">
        <div>
          <p className="uppercase tracking-wider text-xs text-[#D7E2EA]/60 mb-1.5">Education</p>
          <p className="text-sm text-[#D7E2EA]/80">{EDUCATION.degree}</p>
          <p className="text-sm">{EDUCATION.school}</p>
          <p className="text-xs mt-0.5">{EDUCATION.detail}</p>
        </div>
        <div className="sm:text-right">
          <p className="uppercase tracking-wider text-xs text-[#D7E2EA]/60 mb-1.5">Based in</p>
          <p className="text-sm text-[#D7E2EA]/80">{PROFILE.location}</p>
          <p className="text-xs mt-4 text-[#D7E2EA]/60">© {new Date().getFullYear()} {PROFILE.name}</p>
        </div>
      </div>
    </section>
  );
}
