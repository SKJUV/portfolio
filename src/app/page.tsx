import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SecuritySection from "@/components/SecuritySection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ProfileSection from "@/components/ProfileSection";
import Footer from "@/components/Footer";
import AIChatBot from "@/components/AIChatBot";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <SecuritySection />
      <ProjectsSection />
      <SkillsSection />
      <ProfileSection />
      <Footer />
      <AIChatBot />
    </main>
  );
}
