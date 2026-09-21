import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificationsSection from "@/components/CertificationsSection";
import Footer from "@/components/Footer";
import AIChatBot from "@/components/AIChatBot";
import {
  getSettings,
  getProjects,
  getSkills,
  getSecuritySkills,
  getCertifications,
  getAbout,
} from "@/lib/content";

export const revalidate = 3600;

export default function Home() {
  const settings = getSettings();
  const projects = getProjects();
  const skills = getSkills();
  const securitySkills = getSecuritySkills();
  const certifications = getCertifications();
  const about = getAbout();

  return (
    <main className="min-h-screen bg-background text-foreground bg-mesh selection:bg-blue-600/30 selection:text-white">
      <Navbar />
      <Hero settings={settings} />
      <AboutSection data={about} />
      <SkillsSection skills={skills} securitySkills={securitySkills} />
      <ProjectsSection projects={projects} />
      <CertificationsSection certifications={certifications} />
      <Footer settings={settings} />
      <AIChatBot
        projects={projects}
        skills={skills}
        securitySkills={securitySkills}
      />
    </main>
  );
}
