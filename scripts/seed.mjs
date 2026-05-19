// Seed: skapar en demo-VVS-firma + ett login-konto för lokalt tester.
// Kör med:  node scripts/seed.mjs
// Förutsätter att 0001_init.sql är applicerad i Supabase.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envText = readFileSync(join(__dirname, "..", ".env.local"), "utf8");
const env = Object.fromEntries(
  envText
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => {
      const i = l.indexOf("=");
      return [l.slice(0, i), l.slice(i + 1)];
    }),
);

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  console.error("Saknar URL eller SERVICE_ROLE i .env.local");
  process.exit(1);
}

const sb = createClient(url, serviceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const DEMO_SITE = {
  slug: "demo-vvs",
  domain: null,
  name: "Demo VVS-firma",
  city: "Demostad",
  primary_color: "#0a4f8f",
  phone: "+46 70 000 00 00",
  address: "Demogatan 1, 111 22 Demostad",
  email: null,
  hero_tagline:
    "Lokal VVS-firma i Demostad. Vi installerar, servar och felsöker — för privatpersoner och företag i regionen.",
  about_text:
    "Detta är ett demo-innehåll som visar hur en VVS-firma kan presentera sig på sin egen sida. Längre om-text går här — historik, värdegrund, arbetsområde.",
  services: [
    "Värmepumpar — installation och service",
    "Badrumsrenovering",
    "Rörarbeten och stambyten",
    "Felsökning och akut service",
  ],
  opening_hours: "Mån–fre 07:00–16:00",
  facebook_url: null,
  facebook_enabled: false,
  instagram_url: null,
  instagram_enabled: false,
};

const ADMIN_EMAIL = "demo@vvs-sidor.local";
const ADMIN_PASSWORD = "vvs-demo-2026";

async function main() {
  console.log("Skapar/uppdaterar demo-site...");
  const { data: existing } = await sb
    .from("sites")
    .select("id")
    .eq("slug", DEMO_SITE.slug)
    .maybeSingle();

  let siteId = existing?.id;
  if (siteId) {
    const { error } = await sb
      .from("sites")
      .update(DEMO_SITE)
      .eq("id", siteId);
    if (error) throw error;
    console.log("  uppdaterad:", siteId);
  } else {
    const { data, error } = await sb
      .from("sites")
      .insert(DEMO_SITE)
      .select("id")
      .single();
    if (error) throw error;
    siteId = data.id;
    console.log("  ny:", siteId);
  }

  console.log("Skapar/hittar admin-användare...");
  const { data: existingUsers } = await sb.auth.admin.listUsers();
  let userId = existingUsers?.users?.find((u) => u.email === ADMIN_EMAIL)?.id;

  if (!userId) {
    const { data: created, error } = await sb.auth.admin.createUser({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      email_confirm: true,
    });
    if (error) throw error;
    userId = created.user.id;
    console.log("  ny:", userId);
  } else {
    console.log("  finns redan:", userId);
  }

  console.log("Kopplar user → site...");
  const { error: linkErr } = await sb
    .from("site_users")
    .upsert({ site_id: siteId, user_id: userId, role: "owner" });
  if (linkErr) throw linkErr;

  console.log("\n✓ Klart!");
  console.log(`  Site: ${DEMO_SITE.name}`);
  console.log(`  Slug: /${DEMO_SITE.slug}`);
  console.log(`  Login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
