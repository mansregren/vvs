// Engångsskript: skapar/uppdaterar ett admin-konto, sätter platform-admin + owner.
// Kör med:  node scripts/create-admin.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";
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

const EMAIL = "mansregren@caztmedia.com";
// Starkt, läsbart lösen: prefix (upper/lower/symbol) + slumpad base64url.
const PASSWORD = "Czt!" + randomBytes(12).toString("base64url");

async function main() {
  console.log("Skapar/hittar admin-användare...");
  const { data: existingUsers } = await sb.auth.admin.listUsers();
  let userId = existingUsers?.users?.find((u) => u.email === EMAIL)?.id;

  if (!userId) {
    const { data: created, error } = await sb.auth.admin.createUser({
      email: EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    if (error) throw error;
    userId = created.user.id;
    console.log("  ny användare:", userId);
  } else {
    const { error } = await sb.auth.admin.updateUserById(userId, {
      password: PASSWORD,
      email_confirm: true,
    });
    if (error) throw error;
    console.log("  fanns redan — lösen uppdaterat:", userId);
  }

  console.log("Markerar som platform-admin (åtkomst till alla projekt)...");
  const { error: paErr } = await sb
    .from("platform_admins")
    .upsert({ user_id: userId });
  if (paErr) throw paErr;

  console.log("Kopplar som owner till demo-sajten...");
  const { data: demo } = await sb
    .from("sites")
    .select("id")
    .eq("slug", "demo-vvs")
    .maybeSingle();
  if (demo?.id) {
    const { error: linkErr } = await sb
      .from("site_users")
      .upsert({ site_id: demo.id, user_id: userId, role: "owner" });
    if (linkErr) throw linkErr;
  }

  console.log("\n========================================");
  console.log("  ADMIN-KONTO KLART");
  console.log("  E-post:  " + EMAIL);
  console.log("  Lösen:   " + PASSWORD);
  console.log("  Login:   /admin/login");
  console.log("  Översikt (alla projekt): /admin/oversikt");
  console.log("========================================");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
