import Header from "../components/Header";
import Hero from "../components/Hero";
import TechStack from "../components/TechStack";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import JourneySection from "../components/JourneySection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="page">
      <Header />
      <Hero />
      <TechStack />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <JourneySection />
      <ContactSection />
      <Footer />
    </main>
  );
}