// Seed: skapar en demo-VVS-firma med komplett innehåll + omdömen + login-konto.
// Kör med:  node scripts/seed.mjs
// Förutsätter att 0001_init.sql + 0002_extensions.sql är applicerade i Supabase.
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
  email: "hej@demo-vvs.se",
  hero_tagline:
    "Lokal VVS-firma med 20 års erfarenhet — för privatpersoner och företag.",
  tagline_secondary:
    "Vi installerar, servar och felsöker. Snabb respons, ärliga priser, kvalitet som håller.",
  about_text:
    "Detta är ett demo-innehåll som visar hur en VVS-firma kan presentera sig på sin egen sida. Här går en längre text om firmans historia, värdegrund och arbetsområde. Vi arbetar både med privata kunder och med företag i regionen och tar ansvar för hela kedjan — från första hembesöket till färdigt resultat.",
  services: [
    "Värmepumpar — installation och service",
    "Badrumsrenovering — totalentreprenad eller delar",
    "Rörarbeten och stambyten",
    "Felsökning och akut service",
    "Vattenskador — sanering och åtgärd",
    "Elinstallationer i samma uppdrag",
  ],
  opening_hours: "Mån–fre 07:00–16:00\nAkutservice efter överenskommelse",
  facebook_url: null,
  facebook_enabled: false,
  instagram_url: null,
  instagram_enabled: false,
  google_maps_embed: null,
  hero_image_url:
    "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1600&auto=format&q=80",
  tagline_secondary_set: true,
  years_in_business: 20,
  service_area: "Demostad med omnejd",
  cta_text: null,
  gallery_images: [
    "https://images.unsplash.com/photo-1564540586988-aa4e53c3d799?w=800&auto=format&q=80",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&auto=format&q=80",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&q=80",
    "https://images.unsplash.com/photo-1517414204284-fb7e35f969eb?w=800&auto=format&q=80",
    "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&auto=format&q=80",
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&auto=format&q=80",
  ],
};

const REVIEWS = [
  {
    customer_name: "Anna Andersson",
    rating: 5,
    text: "Snabb respons och proffsigt utfört arbete. Bytte vår varmvattenberedare på en eftermiddag. Tydlig kommunikation, prislapp som höll. Rekommenderas.",
  },
  {
    customer_name: "Björn Karlsson",
    rating: 5,
    text: "Renoverade hela badrummet hos oss. Kom i tid varje dag, höll budget och allt blev jättefint. Hade ingen anledning att jaga dem en enda gång.",
  },
  {
    customer_name: "Helena Lindgren",
    rating: 4,
    text: "Hjälpte oss med en akut vattenläcka en lördag. Tack för att ni svarade när andra inte gjorde det.",
  },
];

const ADMIN_EMAIL = "demo@vvs-sidor.local";
const ADMIN_PASSWORD = "vvs-demo-2026";

async function main() {
  console.log("Skapar/uppdaterar demo-site...");
  // tagline_secondary_set var en miss — ta bort det helt
  const { tagline_secondary_set: _drop, ...siteData } = DEMO_SITE;
  void _drop;

  const { data: existing } = await sb
    .from("sites")
    .select("id")
    .eq("slug", siteData.slug)
    .maybeSingle();

  let siteId = existing?.id;
  if (siteId) {
    const { error } = await sb.from("sites").update(siteData).eq("id", siteId);
    if (error) throw error;
    console.log("  uppdaterad:", siteId);
  } else {
    const { data, error } = await sb
      .from("sites")
      .insert(siteData)
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

  console.log("Seedar omdömen...");
  // Replace: ta bort alla för site_id, lägg in nya
  await sb.from("site_reviews").delete().eq("site_id", siteId);
  const { error: revErr } = await sb.from("site_reviews").insert(
    REVIEWS.map((r, i) => ({
      site_id: siteId,
      ...r,
      display_order: i,
    })),
  );
  if (revErr) throw revErr;

  console.log("\n✓ Klart!");
  console.log(`  Site: ${siteData.name}`);
  console.log(`  Slug: /${siteData.slug}`);
  console.log(`  Login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
