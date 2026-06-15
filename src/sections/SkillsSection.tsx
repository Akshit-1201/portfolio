import FadeIn from '../components/FadeIn';
import { SKILL_GROUPS } from '../data/profile';

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative z-10 -mt-[100vh] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-28"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-14 sm:mb-16 md:mb-20"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Skills
      </FadeIn>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        {SKILL_GROUPS.map((group, i) => (
          <FadeIn key={group.title} delay={i * 0.1} y={30}>
            <div className="h-full rounded-[28px] sm:rounded-[32px] border border-white/10 bg-white/[0.03] p-6 sm:p-8 transition-colors duration-300 hover:border-white/20">
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-[#A855F7] font-black text-lg">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="text-[#D7E2EA] font-semibold uppercase tracking-wide text-lg sm:text-xl">
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-white/10 bg-white/[0.04] text-[#D7E2EA]/85 px-3.5 py-1.5 text-sm font-light"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
