import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { getPortfolioData } from "@/lib/data-manager";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://sineng-juvenal.me";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const data = await getPortfolioData();
    const title = data.settings.siteTitle;
    const description = data.settings.siteDescription;

    return {
      title: {
        default: title,
        template: `%s | ${title}`,
      },
      description,
      keywords: [
        "Juvenal", "SINENG KENGNI", "SKJUV", "Juvenal SINENG KENGNI",
        "cybersecurity", "cybersécurité", "full-stack developer",
        "développeur full-stack", "portfolio", "sécurité informatique",
        "Next.js", "React", "TypeScript", "Cameroun", "Afrique francophone"
      ],
      authors: [{ name: "SINENG KENGNI Juvenal", url: SITE_URL }],
      creator: "SINENG KENGNI Juvenal",
      publisher: "SINENG KENGNI Juvenal",
      metadataBase: new URL(SITE_URL),
      alternates: {
        canonical: "/",
      },
      openGraph: {
        type: "website",
        locale: "fr_FR",
        url: SITE_URL,
        title,
        description,
        siteName: title,
        images: [
          {
            url: "/og-image.png",
            width: 1200,
            height: 630,
            alt: `Portfolio de ${data.settings.heroTitle}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/og-image.png"],
        creator: "@SKJUV",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      verification: {
        // Ajouter ton code Google Search Console ici quand tu l'auras
        // google: "ton-code-verification",
      },
    };
  } catch {
    return {
      title: "Portfolio — SINENG KENGNI Juvenal",
      description: "Portfolio de SINENG KENGNI Juvenal, passionné de cybersécurité et développeur Full-Stack.",
    };
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // JSON-LD Schema.org pour le référencement structuré
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "SINENG KENGNI Juvenal",
    alternateName: ["Juvenal SINENG KENGNI", "SKJUV", "Juvenal Sineng"],
    url: SITE_URL,
    jobTitle: "Full-Stack Developer & Cybersecurity Enthusiast",
    description: "Passionné par la sécurité applicative, l'architecture sécurisée et le développement de systèmes robustes.",
    sameAs: [
      "https://github.com/SKJUV",
      "https://www.linkedin.com/in/juvenal-sineng-kengni",
    ],
    knowsAbout: [
      "Cybersecurity", "Full-Stack Development", "React", "Next.js",
      "TypeScript", "Node.js", "Python", "Java", "C#",
      "Network Security", "OWASP", "Penetration Testing"
    ],
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Portfolio — SINENG KENGNI Juvenal",
    url: SITE_URL,
    description: "Portfolio professionnel de SINENG KENGNI Juvenal — Cybersecurity & Full-Stack Developer",
    author: {
      "@type": "Person",
      name: "SINENG KENGNI Juvenal",
    },
  };

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
