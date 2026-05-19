// Seed: skapar en demo-VVS-firma + ett admin-konto + omdömen + gör admin till platform-admin.
// Kör med:  node scripts/seed.mjs
// Förutsätter att 0001/0002/0003-migrationerna är applicerade.
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
  facebook_page_url: null,
  instagram_url: null,
  instagram_enabled: false,
  instagram_post_urls: [],
  google_maps_embed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2034.5!2d14.040555!3d57.186944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTfCsDExJzEzLjAiTiAxNMKwMDInMjYuMCJF!5e0!3m2!1ssv!2sse!4v1700000000000',
  hero_image_url:
    "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1600&auto=format&q=80",
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
  certifications: [
    "saker-vatten",
    "gvk",
    "vvs-foretagen",
    "f-skatt",
    "behorig-el",
    "auktoriserad",
  ],
  brand_partners: [
    "ctc",
    "nibe",
    "ivt",
    "thermia",
    "geberit",
    "ifo",
    "fm-mattsson",
    "uponor",
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
  {
    customer_name: "Karl-Erik Sjöstrand",
    rating: 5,
    text: "Installerade vår CTC-värmepump och förklarade allt tydligt. Vi sänkte uppvärmningskostnaden direkt och pumpen har gått problemfritt sen dag ett.",
  },
];

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
    const { error } = await sb.from("sites").update(DEMO_SITE).eq("id", siteId);
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

  console.log("Markerar admin-user som platform-admin...");
  const { error: paErr } = await sb
    .from("platform_admins")
    .upsert({ user_id: userId });
  if (paErr) console.warn("  (platform_admins ej skapad än — kör migration 0003)");

  console.log("Seedar omdömen...");
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
  console.log(`  Site: ${DEMO_SITE.name}`);
  console.log(`  Slug: /${DEMO_SITE.slug}`);
  console.log(`  Login: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  console.log(`  Platform-admin: ${ADMIN_EMAIL}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
