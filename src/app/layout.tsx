import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { getSettings, getCertifications } from "@/lib/content";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PageViewTracker from "@/components/PageViewTracker";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.sineng-juvenal.me";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = getSettings();
    const title = settings.siteTitle;
    const description = settings.siteDescription;

    return {
      title: {
        default: title,
        template: `%s | ${title}`,
      },
      description,
      icons: {
        icon: [
          { url: "/favicon.ico", sizes: "48x48" },
          { url: "/icon.svg", type: "image/svg+xml" },
          { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
          { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
      },
      keywords: [
        "Juvenal",
        "SINENG KENGNI",
        "SKJUV",
        "Juvenal SINENG KENGNI",
        "cybersecurity",
        "cybersécurité",
        "full-stack developer",
        "développeur full-stack",
        "portfolio",
        "sécurité informatique",
        "Next.js",
        "React",
        "TypeScript",
        "Cameroun",
        "Afrique francophone",
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
            alt: `Portfolio de ${settings.heroTitle}`,
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
    };
  } catch {
    return {
      title: "Portfolio — SINENG KENGNI Juvenal",
      description:
        "Portfolio de SINENG KENGNI Juvenal, passionné de cybersécurité et développeur Full-Stack.",
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const certifications = getCertifications();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "SINENG KENGNI Juvenal",
    alternateName: ["Juvenal SINENG KENGNI", "SKJUV", "Juvenal Sineng"],
    url: SITE_URL,
    jobTitle: "Full-Stack Developer & Cybersecurity Enthusiast",
    description:
      "Passionné par la sécurité applicative, l'architecture sécurisée et le développement de systèmes robustes.",
    sameAs: [
      "https://github.com/SKJUV",
      "https://www.linkedin.com/in/juvenal-sineng-kengni",
    ],
    knowsAbout: [
      "Cybersecurity",
      "Full-Stack Development",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "Java",
      "C#",
      "Network Security",
      "OWASP",
      "Penetration Testing",
    ],
    hasCredential: certifications.map((cert) => ({
      "@type": "EducationalOccupationalCredential",
      name: cert.name,
      credentialCategory: "Certificate",
      recognizedBy: {
        "@type": "Organization",
        name: cert.platform,
      },
      ...(cert.url ? { url: cert.url } : {}),
    })),
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Portfolio — SINENG KENGNI Juvenal",
    url: SITE_URL,
    description:
      "Portfolio professionnel de SINENG KENGNI Juvenal — Cybersecurity & Full-Stack Developer",
    author: {
      "@type": "Person",
      name: "SINENG KENGNI Juvenal",
    },
  };

  const coursesJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Certifications",
    numberOfItems: certifications.length,
    itemListElement: certifications.map((cert, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: cert.name,
        description: cert.name,
        provider: {
          "@type": "Organization",
          name: cert.platform,
        },
        ...(cert.url ? { url: cert.url } : {}),
      },
    })),
  };

  return (
    <html
      lang="fr"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {certifications.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(coursesJsonLd) }}
          />
        )}
      </head>
      <body className="font-sans antialiased selection:bg-blue-600/30 selection:text-white">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
        <PageViewTracker />
      </body>
    </html>
  );
}
