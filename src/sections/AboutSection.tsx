import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import AnimatedText from '../components/AnimatedText';
import { PROFILE } from '../data/profile';

const BASE =
  'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7';

const MOON = `${BASE}/moon_icon.11395d36.png`;
const OBJECT_3D = `${BASE}/p59_1.4659672e.png`;
const LEGO = `${BASE}/lego_icon-1.703bb594.png`;
const GROUP_3D = `${BASE}/Group_134-1.2e04f3ce.png`;

const ABOUT_TEXT = PROFILE.summary;

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
      style={{ background: '#0C0C0C' }}
    >
      {/* Decorative 3D corner images */}
      <FadeIn
        delay={0.1}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]"
      >
        <img src={MOON} alt="" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeIn>

      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]"
      >
        <img src={OBJECT_3D} alt="" className="w-[100px] sm:w-[140px] md:w-[180px]" />
      </FadeIn>

      <FadeIn
        delay={0.15}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]"
      >
        <img src={LEGO} alt="" className="w-[120px] sm:w-[160px] md:w-[210px]" />
      </FadeIn>

      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="pointer-events-none absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]"
      >
        <img src={GROUP_3D} alt="" className="w-[130px] sm:w-[170px] md:w-[220px]" />
      </FadeIn>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn
          as="h2"
          delay={0}
          y={40}
          className="hero-heading font-black uppercase leading-none tracking-tight text-center"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          About me
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
          <AnimatedText
            text={ABOUT_TEXT}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
          <ContactButton href="#contact" />
        </div>
      </div>
    </section>
  );
}
