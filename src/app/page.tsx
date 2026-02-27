import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SecuritySection from "@/components/SecuritySection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ProfileSection from "@/components/ProfileSection";
import CertificationsSection from "@/components/CertificationsSection";
import VisionSection from "@/components/VisionSection";
import Footer from "@/components/Footer";
import AIChatBot from "@/components/AIChatBot";
import { getPortfolioData } from "@/lib/data-manager";

// Map des composants de section
const sectionComponents: Record<string, React.ComponentType<{ data: Record<string, unknown> }>> = {
  SecuritySection: SecuritySection as unknown as React.ComponentType<{ data: Record<string, unknown> }>,
  ProjectsSection: ProjectsSection as unknown as React.ComponentType<{ data: Record<string, unknown> }>,
  SkillsSection: SkillsSection as unknown as React.ComponentType<{ data: Record<string, unknown> }>,
  ProfileSection: ProfileSection as unknown as React.ComponentType<{ data: Record<string, unknown> }>,
  CertificationsSection: CertificationsSection as unknown as React.ComponentType<{ data: Record<string, unknown> }>,
  VisionSection: VisionSection as unknown as React.ComponentType<{ data: Record<string, unknown> }>,
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const data = await getPortfolioData();

  const enabledSections = data.sections
    .filter((s) => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar sections={data.sections} />
      <Hero data={data} />
      {enabledSections.map((section) => {
        const Component = sectionComponents[section.component];
        if (!Component) return null;
        return <Component key={section.id} data={data as unknown as Record<string, unknown>} />;
      })}
      <Footer data={data} />
      <AIChatBot data={data} />
    </main>
  );
}
