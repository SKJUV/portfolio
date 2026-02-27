import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { getPortfolioData } from "@/lib/data-manager";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getPortfolioData();
    return {
      title: data.settings.siteTitle,
      description: data.settings.siteDescription,
    };
  } catch {
    return {
      title: "Portfolio",
      description: "Mon portfolio personnel",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
