import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ENV_FILE = path.join(__dirname, "../.env.local");
const CERTS_FILE = path.join(__dirname, "../src/content/certifications.json");
const OUTPUT_DIR = path.join(__dirname, "../public/certificates");

// Filter rules
const EXCLUDED_PATTERNS = [
  /excel/i,
  /microsoft\s+forms/i,
  /office\s*365/i,
  /google\s+(docs|drive|sheets)/i,
  /facebook\s+ads/i,
  /marketing/i,
  /slack/i,
  /taiga/i,
  /flyer|photoshop/i,
  /survey/i,
  /typeform/i,
  /profitbooks/i,
  /customer\s+(service|support|satisfaction)/i,
  /ticketing/i,
  /budget/i,
  /sales\s+data/i,
  /business\s+analysis/i,
  /ife-efe/i,
  /^introduction\s+to/i, // Per user preference: eliminate "Introduction to..."
  /\b101\b/i, // Exclude Python 101, etc.
  /\b(build|develop)\s+your\s+first\b/i,
  /^getting\s+started\s+with\s+microsoft/i,
  /^data\s+literacy/i,
  /h2o/i,
  /libreoffice/i
];

const TECHNICAL_KEYWORDS = [
  "cybersecurity",
  "cloud",
  "security",
  "threat",
  "hunting",
  "cryptography",
  "encryption",
  "penetration",
  "pentest",
  "python",
  "mysql",
  "database",
  "prompt engineering",
  "generative ai",
  "linux",
  "c++"
];

// Curated descriptions for certificates
const DESCRIPTIONS = {
  "google-cloud-cybersecurity": {
    fr: "Certificat Professionnel officiel Google Cloud : analyse des menaces cloud, détection d'intrusions, gestion des risques et réponse aux incidents.",
    en: "Official Google Cloud Professional Certificate: cloud threat analysis, intrusion detection, risk management, and incident response."
  },
  "detect-respond-recover-cloud-attacks": {
    fr: "Détection proactive, gestion d'incidents et restauration des infrastructures cloud suite à des cyberattaques (Google Cloud).",
    en: "Proactive detection, incident handling and cloud infrastructure recovery following cybersecurity attacks (Google Cloud)."
  },
  "prepare-cloud-security-analyst": {
    fr: "Programme d'intégration des compétences d'analyste en sécurité cloud : architecture défensive et gouvernance sécuritaire.",
    en: "Capstone program for cloud security analyst skills: defensive architecture and security governance."
  },
  "cloud-security-risks-protect-threats": {
    fr: "Identification des vulnérabilités critiques et mise en œuvre des mécanismes de protection dans les environnements cloud.",
    en: "Critical vulnerability identification and defense mechanism deployment in cloud environments."
  },
  "strategies-cloud-security-risk-management": {
    fr: "Gouvernance et stratégies avancées de gestion des risques dans le cloud computing (Google Cloud).",
    en: "Governance and advanced risk management strategies in cloud computing (Google Cloud)."
  },
  "security-principles-cloud-computing": {
    fr: "Principes fondamentaux de sécurité dans le cloud : modèles de responsabilité partagée, IAM et contrôle des accès.",
    en: "Cloud computing security fundamentals: shared responsibility model, IAM and access control."
  },
  "ibm-penetration-testing-threat-hunting-cryptography": {
    fr: "Tests d'intrusion offensifs, chasse aux menaces APT et implémentation de protocoles cryptographiques appliqués (IBM).",
    en: "Offensive penetration testing, APT threat hunting, and applied cryptographic protocol implementation (IBM)."
  },
  "generative-ai-prompt-engineering": {
    fr: "Techniques d'ingénierie de prompt avancées, modèles génératifs et orchestration de requêtes IA (IBM).",
    en: "Advanced prompt engineering techniques, generative foundation models, and AI workflow orchestration (IBM)."
  },
  "encryption-decryption-cpp": {
    fr: "Implémentation d'algorithmes cryptographiques, chiffrement symétrique et asymétrique en C++ bas niveau.",
    en: "Implementation of cryptographic algorithms, symmetric and asymmetric encryption in low-level C++."
  },
  "database-creation-modeling-mysql": {
    fr: "Conception, modélisation relationnelle (diagrammes EER) et optimisation de bases de données avec MySQL Workbench.",
    en: "Design, relational modeling (EER diagrams) and database optimization with MySQL Workbench."
  },
  "using-mysql-with-php": {
    fr: "Développement backend sécurisé couplant PHP et bases de données MySQL : requêtes préparées et prévention d'injections SQL.",
    en: "Secure backend development combining PHP and MySQL databases: prepared statements and SQL injection prevention."
  },
  "json-data-python": {
    fr: "Manipulation avancée, parsing et sérialisation de structures JSON et flux d'API REST avec Python.",
    en: "Advanced manipulation, parsing and serialization of JSON data structures and REST API feeds with Python."
  },
  "python-data-visualization": {
    fr: "Exploration et analyse visuelle de données complexes avec Python (Matplotlib & Seaborn).",
    en: "Exploration and visual analytics of complex data structures with Python (Matplotlib & Seaborn)."
  },
  "linux-terminal": {
    fr: "Administration système Unix/Linux, scripting shell bash, gestion des processus et des permissions sécurisées.",
    en: "Unix/Linux system administration, bash shell scripting, process management and secure permissions."
  }
};

async function getCourseraCauth() {
  if (process.env.COURSERA_CAUTH) {
    return process.env.COURSERA_CAUTH;
  }
  try {
    const envData = await fs.readFile(ENV_FILE, "utf-8");
    const match = envData.match(/COURSERA_CAUTH=["']?([^"'\r\n]+)["']?/);
    if (match) return match[1];
  } catch (err) {
    // Ignore error if file doesn't exist
  }
  throw new Error("❌ COURSERA_CAUTH non trouvé dans l'environnement ni dans .env.local");
}

async function fetchGraphql(cauth, query, variables) {
  const res = await fetch("https://www.coursera.org/graphql", {
    method: "POST",
    headers: {
      "Cookie": `CAUTH=${cauth}`,
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    },
    body: JSON.stringify({ query, variables })
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  }

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

const CERTS_QUERY = `query GetMyCerts($cursor: String, $limit: Int, $productType: Certificates_ProductType) {
  Certificate {
    getMyCertificatesPaginated(cursor: $cursor, limit: $limit, productType: $productType) {
      elements {
        verifyCode
        grantedAt
        grade
        product {
          __typename
          ... on Course_Course {
            name
            slug
            partners {
              name
            }
          }
          ... on Specialization_Specialization {
            name
            slug
            partners {
              name
            }
          }
        }
      }
      pagination {
        cursor
        totalElements
      }
    }
  }
}`;

function isRelevantCertificate(name) {
  for (const pattern of EXCLUDED_PATTERNS) {
    if (pattern.test(name)) return false;
  }
  const lower = name.toLowerCase();
  return TECHNICAL_KEYWORDS.some((kw) => lower.includes(kw));
}

function getSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function downloadCertificateImage(verifyCode, targetFilename, verifyUrl) {
  const localPath = path.join(OUTPUT_DIR, targetFilename);

  // Check if already downloaded
  try {
    await fs.access(localPath);
    // Already exists
    return `/certificates/${targetFilename}`;
  } catch {
    // Needs download
  }

  const directS3 = `https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~${verifyCode}/CERTIFICATE_LANDING_PAGE~${verifyCode}.jpeg`;

  let imgRes = await fetch(directS3);
  let finalUrl = directS3;

  if (!imgRes.ok) {
    console.log(`   ⏳ Génération du badge S3 pour ${verifyCode}...`);
    // Scrape verify page to trigger generator and extract og:image
    try {
      const pageRes = await fetch(verifyUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }
      });
      if (pageRes.ok) {
        const html = await pageRes.text();
        const og = html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                   html.match(/content=["']([^"']+)["']\s+property=["']og:image["']/i);
        if (og && og[1]) {
          finalUrl = og[1];
          imgRes = await fetch(finalUrl);
        }
      }
    } catch (e) {
      console.warn(`   ⚠️ Erreur lors du scraping de ${verifyUrl}:`, e.message);
    }
  }

  if (imgRes.ok) {
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    await fs.writeFile(localPath, buffer);
    console.log(`   ✅ Image sauvegardée: public/certificates/${targetFilename} (${Math.round(buffer.length / 1024)} KB)`);
    return `/certificates/${targetFilename}`;
  } else {
    console.warn(`   ⚠️ Impossible de télécharger l'image pour ${verifyCode} (${imgRes.status})`);
    return null;
  }
}

async function main() {
  console.log("🚀 Démarrage de la synchronisation Coursera avec le compte officiel...\n");

  const cauth = await getCourseraCauth();
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  // 1. Fetch Specializations
  console.log("📡 Récupération des spécialisations & diplômes professionnels...");
  const specData = await fetchGraphql(cauth, CERTS_QUERY, {
    cursor: "0",
    limit: 20,
    productType: "SPECIALIZATION"
  });
  const specializations = specData.Certificate.getMyCertificatesPaginated.elements;
  console.log(`   ✨ ${specializations.length} spécialisation(s) trouvée(s).`);

  // 2. Fetch Courses
  console.log("\n📡 Récupération des cours complétés (pagination jusqu'à 100)...");
  const courseData = await fetchGraphql(cauth, CERTS_QUERY, {
    cursor: "0",
    limit: 100,
    productType: "COURSE"
  });
  const courses = courseData.Certificate.getMyCertificatesPaginated.elements;
  console.log(`   ✨ ${courses.length} cours complétés trouvés.`);

  // 3. Process & Filter
  const processed = [];

  // Add relevant specializations first (Highest Prestige)
  for (const spec of specializations) {
    const name = spec.product?.name || "Spécialisation";
    const partner = spec.product?.partners?.[0]?.name || "Coursera";
    const code = spec.verifyCode;
    const year = spec.grantedAt ? new Date(spec.grantedAt).getFullYear().toString() : "2026";
    const slug = getSlug(name);
    const id = `coursera-spec-${slug}`;
    const targetFilename = `${id}.jpeg`;
    const verifyUrl = `https://www.coursera.org/account/accomplishments/specialization/${code}`;

    console.log(`\n🏆 Spécialisation d'Élite: [${partner}] ${name} (${code})`);
    const localImg = await downloadCertificateImage(code, targetFilename, verifyUrl);

    // Matching descriptions
    let descFr = DESCRIPTIONS["google-cloud-cybersecurity"]?.fr;
    let descEn = DESCRIPTIONS["google-cloud-cybersecurity"]?.en;
    if (!descFr) {
      descFr = `Certificat Professionnel d'excellence émis par ${partner} : cursus complet validé.`;
      descEn = `Official Professional Certificate issued by ${partner}: comprehensive verified track.`;
    }

    processed.push({
      id,
      name: `Certificat Professionnel : ${name}`,
      name_en: `Professional Certificate: ${name}`,
      platform: `Coursera (${partner})`,
      date: year,
      description: descFr,
      description_en: descEn,
      verificationUrl: verifyUrl,
      imageUrl: localImg,
      remoteImageUrl: `https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~${code}/CERTIFICATE_LANDING_PAGE~${code}.jpeg`,
      isSpecialization: true,
      grade: spec.grade ? `${Math.round(spec.grade * 100)}%` : undefined
    });
  }

  // Filter and add relevant courses
  for (const c of courses) {
    const name = c.product?.name;
    if (!name) continue;

    if (!isRelevantCertificate(name)) {
      // Skipped (e.g. Excel, Forms, Marketing)
      continue;
    }

    const partner = c.product?.partners?.[0]?.name || "Coursera";
    const code = c.verifyCode;
    const year = c.grantedAt ? new Date(c.grantedAt).getFullYear().toString() : "2025";
    const slug = getSlug(name);
    const id = `coursera-${slug}`;
    const targetFilename = `${id}.jpeg`;
    const verifyUrl = `https://www.coursera.org/account/accomplishments/verify/${code}`;

    console.log(`\n📘 Certificat Technique Retenu: [${partner}] ${name} (${code})`);
    const localImg = await downloadCertificateImage(code, targetFilename, verifyUrl);

    // Find best description
    let descFr = "";
    let descEn = "";

    for (const [key, d] of Object.entries(DESCRIPTIONS)) {
      if (slug.includes(key) || key.includes(slug)) {
        descFr = d.fr;
        descEn = d.en;
        break;
      }
    }

    if (!descFr) {
      if (slug.includes("detect-respond")) {
        descFr = DESCRIPTIONS["detect-respond-recover-cloud-attacks"].fr;
        descEn = DESCRIPTIONS["detect-respond-recover-cloud-attacks"].en;
      } else if (slug.includes("prepare") || slug.includes("analyst")) {
        descFr = DESCRIPTIONS["prepare-cloud-security-analyst"].fr;
        descEn = DESCRIPTIONS["prepare-cloud-security-analyst"].en;
      } else if (slug.includes("risks") || slug.includes("protect")) {
        descFr = DESCRIPTIONS["cloud-security-risks-protect-threats"].fr;
        descEn = DESCRIPTIONS["cloud-security-risks-protect-threats"].en;
      } else if (slug.includes("risk-management")) {
        descFr = DESCRIPTIONS["strategies-cloud-security-risk-management"].fr;
        descEn = DESCRIPTIONS["strategies-cloud-security-risk-management"].en;
      } else if (slug.includes("security-principles")) {
        descFr = DESCRIPTIONS["security-principles-cloud-computing"].fr;
        descEn = DESCRIPTIONS["security-principles-cloud-computing"].en;
      } else if (slug.includes("penetration") || slug.includes("cryptography")) {
        descFr = DESCRIPTIONS["ibm-penetration-testing-threat-hunting-cryptography"].fr;
        descEn = DESCRIPTIONS["ibm-penetration-testing-threat-hunting-cryptography"].en;
      } else if (slug.includes("prompt-engineering") || slug.includes("generative-ai")) {
        descFr = DESCRIPTIONS["generative-ai-prompt-engineering"].fr;
        descEn = DESCRIPTIONS["generative-ai-prompt-engineering"].en;
      } else if (slug.includes("encryption")) {
        descFr = DESCRIPTIONS["encryption-decryption-cpp"].fr;
        descEn = DESCRIPTIONS["encryption-decryption-cpp"].en;
      } else if (slug.includes("mysql") && slug.includes("workbench")) {
        descFr = DESCRIPTIONS["database-creation-modeling-mysql"].fr;
        descEn = DESCRIPTIONS["database-creation-modeling-mysql"].en;
      } else if (slug.includes("mysql") && slug.includes("php")) {
        descFr = DESCRIPTIONS["using-mysql-with-php"].fr;
        descEn = DESCRIPTIONS["using-mysql-with-php"].en;
      } else if (slug.includes("json")) {
        descFr = DESCRIPTIONS["json-data-python"].fr;
        descEn = DESCRIPTIONS["json-data-python"].en;
      } else if (slug.includes("visualization") || slug.includes("matplotlib")) {
        descFr = DESCRIPTIONS["python-data-visualization"].fr;
        descEn = DESCRIPTIONS["python-data-visualization"].en;
      } else if (slug.includes("linux")) {
        descFr = DESCRIPTIONS["linux-terminal"].fr;
        descEn = DESCRIPTIONS["linux-terminal"].en;
      } else {
        descFr = `Certification officielle ${partner} : validation pratique et théorique des compétences.`;
        descEn = `Official ${partner} certification: practical and theoretical skills validation.`;
      }
    }

    processed.push({
      id,
      name,
      platform: partner === "Coursera" ? "Coursera" : `Coursera (${partner})`,
      date: year,
      description: descFr,
      description_en: descEn,
      verificationUrl: verifyUrl,
      imageUrl: localImg,
      remoteImageUrl: `https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~${code}/CERTIFICATE_LANDING_PAGE~${code}.jpeg`,
      grade: c.grade ? `${Math.round(c.grade * 100)}%` : undefined
    });
  }

  console.log(`\n📊 Résultat : ${processed.length} certifications d'élite retenues.`);
  await fs.writeFile(CERTS_FILE, JSON.stringify(processed, null, 2), "utf-8");
  console.log(`💾 Fichier mis à jour avec succès : src/content/certifications.json !`);
}

main().catch((err) => {
  console.error("❌ Erreur d'exécution :", err);
  process.exit(1);
});
