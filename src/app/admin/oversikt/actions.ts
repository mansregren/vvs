"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isPlatformAdmin } from "@/lib/site";

async function requirePlatformAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login?next=/admin/oversikt");
  const ok = await isPlatformAdmin(user.id);
  if (!ok) throw new Error("Inte behörig.");
  return user;
}

export async function createSiteAndOwner(formData: FormData) {
  await requirePlatformAdmin();
  const admin = createAdminClient();

  const name = ((formData.get("name") as string) ?? "").trim();
  const slug = ((formData.get("slug") as string) ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const city = ((formData.get("city") as string) ?? "").trim();
  const phone = ((formData.get("phone") as string) ?? "").trim();
  const address = ((formData.get("address") as string) ?? "").trim();
  const ownerEmail = ((formData.get("owner_email") as string) ?? "")
    .trim()
    .toLowerCase();
  const ownerPassword = ((formData.get("owner_password") as string) ?? "").trim();

  if (!name || !slug || !city || !phone || !address || !ownerEmail || !ownerPassword) {
    throw new Error("Alla fält krävs.");
  }

  const { data: clash } = await admin
    .from("sites")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();
  if (clash) throw new Error(`Slug "${slug}" är upptaget.`);

  const { data: siteRow, error: siteErr } = await admin
    .from("sites")
    .insert({
      name,
      slug,
      city,
      phone,
      address,
      primary_color: "#0a4f8f",
    })
    .select("id")
    .single();
  if (siteErr || !siteRow)
    throw new Error(siteErr?.message ?? "Site-skapande misslyckades.");

  const { data: existingUsers } = await admin.auth.admin.listUsers();
  let userId = existingUsers?.users?.find(
    (u) => u.email?.toLowerCase() === ownerEmail,
  )?.id;
  if (!userId) {
    const { data: createdUser, error: userErr } =
      await admin.auth.admin.createUser({
        email: ownerEmail,
        password: ownerPassword,
        email_confirm: true,
      });
    if (userErr || !createdUser?.user)
      throw new Error(userErr?.message ?? "Användar-skapande misslyckades.");
    userId = createdUser.user.id;
  }

  await admin
    .from("site_users")
    .insert({ site_id: siteRow.id, user_id: userId, role: "owner" });

  revalidatePath("/admin/oversikt");
  redirect("/admin/oversikt");
}

export async function uploadCertAsset(formData: FormData) {
  await requirePlatformAdmin();
  const key = ((formData.get("key") as string) ?? "").trim();
  const kind = ((formData.get("kind") as string) ?? "").trim();
  if (!key || !kind) throw new Error("Saknar key/kind.");

  const admin = createAdminClient();
  let logoUrl: string | null = null;

  const pastedUrl = ((formData.get("logo_url") as string) ?? "").trim();
  if (pastedUrl) {
    if (!/^https?:\/\//.test(pastedUrl)) {
      throw new Error("URL måste börja med https:// eller http://.");
    }
    logoUrl = pastedUrl;
  } else {
    const file = formData.get("logo") as File | null;
    if (!file || file.size === 0) throw new Error("Välj fil eller klistra in URL.");
    if (file.size > 4 * 1024 * 1024)
      throw new Error("Bilden får max vara 4 MB.");
    const ext = (file.name.split(".").pop() || "png").toLowerCase();
    const path = `${kind}/${key}-${Date.now()}.${ext}`;
    const { error: upErr } = await admin.storage
      .from("cert-assets")
      .upload(path, file, { upsert: true, contentType: file.type });
    if (upErr) throw new Error(upErr.message);
    const { data: pub } = admin.storage.from("cert-assets").getPublicUrl(path);
    logoUrl = pub.publicUrl;
  }

  const { error: dbErr } = await admin
    .from("cert_assets")
    .upsert({
      key,
      kind,
      logo_url: logoUrl,
      updated_at: new Date().toISOString(),
    });
  if (dbErr) throw new Error(dbErr.message);

  revalidatePath("/admin/oversikt");
  revalidatePath("/", "layout");
}

export async function removeCertAsset(formData: FormData) {
  await requirePlatformAdmin();
  const key = ((formData.get("key") as string) ?? "").trim();
  if (!key) return;
  const admin = createAdminClient();
  await admin.from("cert_assets").delete().eq("key", key);
  revalidatePath("/admin/oversikt");
  revalidatePath("/", "layout");
}

export async function signOutPlatform() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
