"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function getMySiteId() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase
    .from("site_users")
    .select("site_id")
    .eq("user_id", user.id)
    .maybeSingle();
  return { user, siteId: data?.site_id ?? null };
}

export async function updateMySite(formData: FormData) {
  const ctx = await getMySiteId();
  if (!ctx || !ctx.siteId) redirect("/admin/login");

  const supabase = await createClient();

  const services = (formData.get("services") as string)
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const update = {
    name: (formData.get("name") as string).trim(),
    city: (formData.get("city") as string).trim(),
    phone: (formData.get("phone") as string).trim(),
    address: (formData.get("address") as string).trim(),
    email: (formData.get("email") as string).trim() || null,
    primary_color: (formData.get("primary_color") as string).trim(),
    hero_tagline: ((formData.get("hero_tagline") as string) || "").trim() || null,
    about_text: ((formData.get("about_text") as string) || "").trim() || null,
    opening_hours:
      ((formData.get("opening_hours") as string) || "").trim() || null,
    services,
    facebook_url:
      ((formData.get("facebook_url") as string) || "").trim() || null,
    facebook_enabled: formData.get("facebook_enabled") === "on",
    instagram_url:
      ((formData.get("instagram_url") as string) || "").trim() || null,
    instagram_enabled: formData.get("instagram_enabled") === "on",
  };

  const { data: row, error } = await supabase
    .from("sites")
    .update(update)
    .eq("id", ctx.siteId)
    .select("slug")
    .single();
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath(`/${row.slug}`);
  revalidatePath("/", "layout");
}

export async function uploadLogo(formData: FormData) {
  const ctx = await getMySiteId();
  if (!ctx || !ctx.siteId) redirect("/admin/login");

  const file = formData.get("logo") as File | null;
  if (!file || file.size === 0) return;
  if (file.size > 2 * 1024 * 1024) {
    throw new Error("Loggan får max vara 2 MB.");
  }

  const admin = createAdminClient();
  const ext = file.name.split(".").pop()?.toLowerCase() || "png";
  const path = `${ctx.siteId}/logo-${Date.now()}.${ext}`;
  const { error: upErr } = await admin.storage
    .from("logos")
    .upload(path, file, { upsert: true, contentType: file.type });
  if (upErr) throw new Error(upErr.message);

  const { data: pub } = admin.storage.from("logos").getPublicUrl(path);

  const supabase = await createClient();
  const { error } = await supabase
    .from("sites")
    .update({ logo_url: pub.publicUrl })
    .eq("id", ctx.siteId);
  if (error) throw new Error(error.message);

  revalidatePath("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
