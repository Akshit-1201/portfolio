import { useRef } from 'react';
import type { MotionValue } from 'framer-motion';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import AbstractArt from '../components/AbstractArt';
import { PROJECTS } from '../data/profile';
import type { Project } from '../data/profile';

function ProjectCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // The card recedes (scales down) as the next card scrolls up to cover it.
  const prefersReduced = useReducedMotion();
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const range: [number, number] = [index / total, 1];
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="h-screen sticky top-0 flex items-center justify-center">
      <motion.div
        style={{ scale: prefersReduced ? 1 : scale, top: `${index * 22}px` }}
        className="relative w-full max-w-6xl rounded-[32px] sm:rounded-[44px] md:rounded-[52px] border border-[#D7E2EA]/20 p-5 sm:p-8 md:p-10"
      >
        {/* opaque background so it fully covers the previous card */}
        <div
          className="absolute inset-0 -z-10 rounded-[32px] sm:rounded-[44px] md:rounded-[52px]"
          style={{ background: '#121214' }}
        />

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
          {/* Text column */}
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-4 mb-3">
              <span
                className="font-black leading-none"
                style={{ color: project.accent, fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                {project.num}
              </span>
              <span className="text-[#D7E2EA]/60 uppercase tracking-[0.25em] text-xs sm:text-sm font-medium">
                {project.category}
              </span>
            </div>

            <h3
              className="text-[#D7E2EA] font-bold uppercase leading-tight mb-4"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 2.6rem)' }}
            >
              {project.name}
            </h3>

            <p
              className="text-[#D7E2EA]/70 font-light leading-relaxed mb-6 max-w-xl"
              style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.15rem)' }}
            >
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-7">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.04] text-[#D7E2EA]/80 px-3 py-1 text-xs font-light"
                >
                  {tech}
                </span>
              ))}
            </div>

            <LiveProjectButton href={project.link} />
          </div>

          {/* Visual column */}
          <div className="order-1 md:order-2">
            <AbstractArt
              accent={project.accent}
              icon={project.icon}
              variant={(['a', 'b', 'c'] as const)[index % 3]}
              className="w-full aspect-[4/3] rounded-[24px] sm:rounded-[32px] md:rounded-[40px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const total = PROJECTS.length;

  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 sm:-mt-12 md:-mt-14 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28"
      style={{ background: '#0C0C0C' }}
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-10 sm:mb-12"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        Projects
      </FadeIn>

      {/* Sticky stack: each card pins and the next scrolls up to cover it.
          Scrolling back up reverses the stack. The trailing spacer gives the
          LAST card a full screen of pin time (otherwise it would scroll off and
          get clipped under the navbar); the Skills section is pulled up to
          slide over it, so there is no dead space. */}
      <div ref={containerRef} className="relative">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.num} project={project} index={i} total={total} progress={scrollYProgress} />
        ))}
        {/* Taller than the Skills overlap (-100vh) so the last card stays fully
            visible for ~half a screen of scroll before Skills slides over it. */}
        <div aria-hidden className="h-[150vh]" />
      </div>
    </section>
  );
}
