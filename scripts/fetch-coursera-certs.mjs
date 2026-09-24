import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CERTS_FILE = path.join(__dirname, "../src/content/certifications.json");
const OUTPUT_DIR = path.join(__dirname, "../public/certificates");

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const rawData = await fs.readFile(CERTS_FILE, "utf-8");
  const certs = JSON.parse(rawData);

  console.log(`🔍 Traitement de ${certs.length} certifications Coursera...`);

  for (const cert of certs) {
    if (!cert.verificationUrl || !cert.verificationUrl.includes("coursera.org")) {
      console.log(`⏩ Ignoré: ${cert.name} (Pas de lien Coursera)`);
      continue;
    }

    try {
      console.log(`\n⏳ Récupération de: ${cert.name}`);
      console.log(`   URL: ${cert.verificationUrl}`);

      // 1. Récupérer la page HTML Coursera
      const res = await fetch(cert.verificationUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        },
      });

      if (!res.ok) {
        console.warn(`   ⚠️ Erreur HTTP ${res.status} sur ${cert.verificationUrl}`);
        continue;
      }

      const html = await res.text();

      // 2. Extraire la balise og:image
      const ogMatch = html.match(/<meta property=["']og:image["'] content=["']([^"']+)["']/i) ||
                      html.match(/<meta content=["']([^"']+)["'] property=["']og:image["']/i) ||
                      html.match(/https:\/\/s3\.amazonaws\.com\/coursera_assets\/meta_images\/generated\/[^"'\s]+/i);

      let imageUrl = ogMatch ? ogMatch[1] || ogMatch[0] : null;

      if (!imageUrl && cert.imageUrl) {
        imageUrl = cert.imageUrl;
      }

      if (!imageUrl) {
        console.warn(`   ⚠️ Aucune image trouvée pour ${cert.name}`);
        continue;
      }

      console.log(`   📸 Image trouvée: ${imageUrl}`);

      // 3. Télécharger l'image localement dans public/certificates/
      const imgRes = await fetch(imageUrl);
      if (!imgRes.ok) {
        console.warn(`   ⚠️ Impossible de télécharger l'image (${imgRes.status})`);
        continue;
      }

      const buffer = Buffer.from(await imgRes.arrayBuffer());
      const fileName = `${cert.id || cert.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.jpeg`;
      const localFilePath = path.join(OUTPUT_DIR, fileName);

      await fs.writeFile(localFilePath, buffer);
      console.log(`   ✅ Enregistré dans public/certificates/${fileName}`);

      // 4. Mettre à jour l'URL locale
      cert.imageUrl = `/certificates/${fileName}`;
      cert.remoteImageUrl = imageUrl;
    } catch (err) {
      console.error(`   ❌ Erreur sur ${cert.name}:`, err.message);
    }
  }

  await fs.writeFile(CERTS_FILE, JSON.stringify(certs, null, 2), "utf-8");
  console.log("\n🎉 Toutes les images ont été récupérées et certifications.json a été mis à jour !");
}

main().catch(console.error);
