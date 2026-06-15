import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import AboutSection from './sections/AboutSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import PublicationSection from './sections/PublicationSection';
import ContactSection from './sections/ContactSection';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <main style={{ background: '#0C0C0C', overflowX: 'clip' }}>
        <Navbar />
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <PublicationSection />
        <ContactSection />
      </main>
    </MotionConfig>
  );
}
