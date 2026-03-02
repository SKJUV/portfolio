const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load .env.local manually (no dotenv dependency)
const envPath = path.join(__dirname, "..", ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
for (const line of envContent.split("\n")) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eqIdx = trimmed.indexOf("=");
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  const val = trimmed.slice(eqIdx + 1).trim();
  if (!process.env[key]) process.env[key] = val;
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

async function sync() {
  const raw = fs.readFileSync(
    path.join(__dirname, "..", "src", "data", "portfolio-data.json"),
    "utf-8"
  );
  const data = JSON.parse(raw);

  console.log("Local data summary:");
  console.log("  Projects:", data.projects.length);
  console.log("  Certifications:", data.certifications.length);
  console.log("  Skills:", data.skillCategories.length);
  console.log("  Security:", data.securitySkills.length);
  console.log("  Profile:", data.profileCategories.length);
  console.log("  Terminal:", data.terminalLines.length);

  const { error } = await supabase
    .from("portfolio_data")
    .upsert({ id: 1, data: data, updated_at: new Date().toISOString() });

  if (error) {
    console.error("Supabase UPSERT error:", error.message, error.code);
    process.exit(1);
  }

  console.log("\nSupabase updated successfully!");

  // Verify
  const { data: verify, error: verifyErr } = await supabase
    .from("portfolio_data")
    .select("data")
    .eq("id", 1)
    .single();

  if (verifyErr) {
    console.error("Verify error:", verifyErr.message);
  } else {
    const d = verify.data;
    console.log("\nVerification from Supabase:");
    console.log("  Projects:", d.projects.length);
    console.log("  Certifications:", d.certifications.length);
    console.log("  LinkedIn:", d.settings.contactLinkedin);
  }
}

sync().catch((e) => {
  console.error(e);
  process.exit(1);
});
