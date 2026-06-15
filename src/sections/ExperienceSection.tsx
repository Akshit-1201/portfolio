import FadeIn from '../components/FadeIn';
import { EXPERIENCE } from '../data/profile';

const BORDER = '1px solid rgba(12, 12, 12, 0.15)';

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative z-10 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
      style={{ background: '#FFFFFF' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="font-black uppercase text-center mb-12 sm:mb-16 md:mb-20"
        style={{ color: '#0C0C0C', fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Experience
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {EXPERIENCE.map((job) => (
          <div key={`${job.company}-${job.role}`}>
            {/* Role header */}
            <FadeIn delay={0} y={30}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 pb-8 sm:pb-10">
                <div>
                  <h3
                    className="font-bold uppercase leading-tight"
                    style={{ color: '#0C0C0C', fontSize: 'clamp(1.4rem, 3.2vw, 2.6rem)' }}
                  >
                    {job.role}
                  </h3>
                  <p className="font-medium mt-1" style={{ color: '#0C0C0C' }}>
                    {job.company} <span style={{ opacity: 0.5 }}>· {job.meta}</span>
                  </p>
                </div>
                <p
                  className="font-medium uppercase tracking-wider whitespace-nowrap"
                  style={{ color: '#0C0C0C', opacity: 0.5 }}
                >
                  {job.period}
                </p>
              </div>
            </FadeIn>

            {/* Impact bullets */}
            {job.bullets.map((bullet, i) => (
              <FadeIn key={i} delay={i * 0.08} y={24}>
                <div
                  className="flex items-start gap-5 sm:gap-8 md:gap-10 py-6 sm:py-7 md:py-8"
                  style={{ borderTop: BORDER, borderBottom: i === job.bullets.length - 1 ? BORDER : undefined }}
                >
                  <span
                    className="font-black leading-none flex-shrink-0"
                    style={{ color: '#0C0C0C', fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p
                    className="font-light leading-relaxed pt-1"
                    style={{ color: '#0C0C0C', opacity: 0.75, fontSize: 'clamp(0.95rem, 1.6vw, 1.3rem)' }}
                  >
                    {bullet}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
