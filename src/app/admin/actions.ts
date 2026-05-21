"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isPlatformAdmin } from "@/lib/site";

/**
 * Bestämmer vilken sajt en action ska arbeta mot.
 * - Utan `site_id` (eller med eget): användarens egen sajt via RLS-klienten.
 * - Med annat `site_id`: kräver platform-admin och kör med service-role-klient
 *   (annars skulle RLS blockera redigering av sajt man inte äger).
 */
async function resolveTarget(formData?: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: link } = await supabase
    .from("site_users")
    .select("site_id, role")
    .eq("user_id", user.id)
    .maybeSingle();
  const ownSiteId = link?.site_id ?? null;

  const requested = formData
    ? ((formData.get("site_id") as string | null) || null)
    : null;

  if (requested && requested !== ownSiteId) {
    const admin = await isPlatformAdmin(user.id);
    if (!admin) return null;
    return {
      user,
      siteId: requested,
      db: createAdminClient(),
      elevated: true as const,
    };
  }

  return {
    user,
    siteId: ownSiteId,
    db: supabase,
    elevated: false as const,
  };
}

async function revalidateSite(siteId: string, slug?: string) {
  revalidatePath("/admin");
  revalidatePath(`/admin/sajt/${siteId}`);
  revalidatePath("/admin/oversikt");

  // Bust den publika (ISR-cachade) sajt-sidan. Slå upp slug om den inte skickades.
  let s = slug;
  if (!s && siteId) {
    const admin = createAdminClient();
    const { data } = await admin
      .from("sites")
      .select("slug")
      .eq("id", siteId)
      .maybeSingle();
    s = data?.slug ?? undefined;
  }
  if (s) {
    revalidatePath(`/${s}`);
    if (s === "demo-vvs") revalidatePath("/demo");
  }
  // Host-routade kunddomäner ligger på "/" — busta den layouten också.
  revalidatePath("/", "layout");
}

export async function updateMySite(formData: FormData) {
  const ctx = await resolveTarget(formData);
  if (!ctx?.siteId) redirect("/admin/login");

  const servicesChecked = formData.getAll("service_keys").map(String);
  const servicesCustom = (
    (formData.get("services_custom") as string | null) ?? ""
  )
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
  const services = [...servicesChecked, ...servicesCustom];

  let contacts: { name: string; phone: string; role?: string }[] = [];
  try {
    const raw = (formData.get("contacts_json") as string) ?? "[]";
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      contacts = parsed
        .filter((c) => c && typeof c === "object")
        .map((c) => ({
          name: String(c.name ?? "").trim(),
          phone: String(c.phone ?? "").trim(),
          role: c.role ? String(c.role).trim() : undefined,
        }))
        .filter((c) => c.name && c.phone);
    }
  } catch {
    contacts = [];
  }

  const certifications = formData.getAll("certifications").map(String);
  const brand_partners = formData.getAll("brand_partners").map(String);

  const instagram_post_urls = (
    (formData.get("instagram_post_urls") as string | null) ?? ""
  )
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 12);

  const yearsRaw = (formData.get("years_in_business") as string | null) ?? "";
  const years = yearsRaw.trim() ? parseInt(yearsRaw, 10) : null;

  const update: Record<string, unknown> = {
    name: ((formData.get("name") as string) ?? "").trim(),
    city: ((formData.get("city") as string) ?? "").trim(),
    domain:
      ((formData.get("domain") as string) ?? "").trim().toLowerCase() || null,
    phone: ((formData.get("phone") as string) ?? "").trim(),
    address: ((formData.get("address") as string) ?? "").trim(),
    email: ((formData.get("email") as string) ?? "").trim() || null,
    primary_color: ((formData.get("primary_color") as string) ?? "").trim(),
    hero_tagline:
      ((formData.get("hero_tagline") as string) ?? "").trim() || null,
    tagline_secondary:
      ((formData.get("tagline_secondary") as string) ?? "").trim() || null,
    about_text: ((formData.get("about_text") as string) ?? "").trim() || null,
    cta_text: ((formData.get("cta_text") as string) ?? "").trim() || null,
    service_area:
      ((formData.get("service_area") as string) ?? "").trim() || null,
    years_in_business: Number.isFinite(years) ? years : null,
    opening_hours:
      ((formData.get("opening_hours") as string) ?? "").trim() || null,
    google_maps_embed:
      ((formData.get("google_maps_embed") as string) ?? "").trim() || null,
    services,
    has_jour: formData.get("has_jour") === "on",
    jour_phone: ((formData.get("jour_phone") as string) ?? "").trim() || null,
    jour_text: ((formData.get("jour_text") as string) ?? "").trim() || null,
    rot_avdrag: formData.get("rot_avdrag") === "on",
    guarantee_text:
      ((formData.get("guarantee_text") as string) ?? "").trim() || null,
    offers_free_quote: formData.get("offers_free_quote") === "on",
    contacts,
    facebook_url:
      ((formData.get("facebook_url") as string) ?? "").trim() || null,
    facebook_enabled: formData.get("facebook_enabled") === "on",
    facebook_page_url:
      ((formData.get("facebook_page_url") as string) ?? "").trim() || null,
    instagram_url:
      ((formData.get("instagram_url") as string) ?? "").trim() || null,
    instagram_enabled: formData.get("instagram_enabled") === "on",
    instagram_post_urls,
    certifications,
    brand_partners,
  };

  // Försök först med alla nya fält. Vid PGRST204/42703 ta bort dem och kör fallback.
  let res = await ctx.db
    .from("sites")
    .update(update)
    .eq("id", ctx.siteId)
    .select("slug")
    .single();
  if (res.error?.code === "42703" || res.error?.code === "PGRST204") {
    const baseFields = [
      "name",
      "city",
      "domain",
      "phone",
      "address",
      "email",
      "primary_color",
      "hero_tagline",
      "about_text",
      "opening_hours",
      "google_maps_embed",
      "services",
      "facebook_url",
      "facebook_enabled",
      "instagram_url",
      "instagram_enabled",
    ];
    const baseUpdate: Record<string, unknown> = {};
    for (const k of baseFields) baseUpdate[k] = update[k];
    res = await ctx.db
      .from("sites")
      .update(baseUpdate)
      .eq("id", ctx.siteId)
      .select("slug")
      .single();
  }
  if (res.error) throw new Error(res.error.message);

  await revalidateSite(ctx.siteId, res.data?.slug);
}

async function uploadImageToBucket(
  formData: FormData,
  field: string,
  bucket: "logos" | "media",
  sitePrefix: string,
  siteId: string,
): Promise<string> {
  const file = formData.get(field) as File | null;
  if (!file || file.size === 0) throw new Error("Ingen fil vald.");
  if (file.size > 8 * 1024 * 1024) {
    throw new Error("Bilden får max vara 8 MB.");
  }
  const admin = createAdminClient();
  const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
  const path = `${siteId}/${sitePrefix}-${Date.now()}.${ext}`;
  const { error: upErr } = await admin.storage
    .from(bucket)
    .upload(path, file, { upsert: true, contentType: file.type });
  if (upErr) throw new Error(upErr.message);
  const { data: pub } = admin.storage.from(bucket).getPublicUrl(path);
  return pub.publicUrl;
}

export async function uploadLogo(formData: FormData) {
  const ctx = await resolveTarget(formData);
  if (!ctx?.siteId) redirect("/admin/login");
  const url = await uploadImageToBucket(formData, "logo", "logos", "logo", ctx.siteId);
  const { error } = await ctx.db
    .from("sites")
    .update({ logo_url: url })
    .eq("id", ctx.siteId);
  if (error) throw new Error(error.message);
  await revalidateSite(ctx.siteId);
}

export async function uploadHeroImage(formData: FormData) {
  const ctx = await resolveTarget(formData);
  if (!ctx?.siteId) redirect("/admin/login");
  const url = await uploadImageToBucket(formData, "image", "media", "hero", ctx.siteId);
  const { error } = await ctx.db
    .from("sites")
    .update({ hero_image_url: url })
    .eq("id", ctx.siteId);
  if (error) throw new Error(error.message);
  await revalidateSite(ctx.siteId);
}

export async function uploadGalleryImage(formData: FormData) {
  const ctx = await resolveTarget(formData);
  if (!ctx?.siteId) redirect("/admin/login");
  const url = await uploadImageToBucket(formData, "image", "media", "gallery", ctx.siteId);
  const { data: site } = await ctx.db
    .from("sites")
    .select("gallery_images")
    .eq("id", ctx.siteId)
    .single();
  const current: string[] = Array.isArray(site?.gallery_images)
    ? (site!.gallery_images as string[])
    : [];
  const next = [...current, url];
  const { error } = await ctx.db
    .from("sites")
    .update({ gallery_images: next })
    .eq("id", ctx.siteId);
  if (error) throw new Error(error.message);
  await revalidateSite(ctx.siteId);
}

export async function removeGalleryImage(formData: FormData) {
  const ctx = await resolveTarget(formData);
  if (!ctx?.siteId) redirect("/admin/login");
  const url = (formData.get("url") as string) ?? "";
  if (!url) return;
  const { data: site } = await ctx.db
    .from("sites")
    .select("gallery_images")
    .eq("id", ctx.siteId)
    .single();
  const current: string[] = Array.isArray(site?.gallery_images)
    ? (site!.gallery_images as string[])
    : [];
  const next = current.filter((u) => u !== url);
  const { error } = await ctx.db
    .from("sites")
    .update({ gallery_images: next })
    .eq("id", ctx.siteId);
  if (error) throw new Error(error.message);
  await revalidateSite(ctx.siteId);
}

export async function addReview(formData: FormData) {
  const ctx = await resolveTarget(formData);
  if (!ctx?.siteId) redirect("/admin/login");
  const customer_name = ((formData.get("customer_name") as string) ?? "").trim();
  const text = ((formData.get("text") as string) ?? "").trim();
  const ratingRaw = (formData.get("rating") as string) ?? "5";
  const rating = Math.max(1, Math.min(5, parseInt(ratingRaw, 10) || 5));
  if (!customer_name || !text) throw new Error("Namn och text krävs.");
  const { error } = await ctx.db.from("site_reviews").insert({
    site_id: ctx.siteId,
    customer_name,
    text,
    rating,
  });
  if (error) throw new Error(error.message);
  await revalidateSite(ctx.siteId);
}

export async function removeReview(formData: FormData) {
  const ctx = await resolveTarget(formData);
  if (!ctx?.siteId) redirect("/admin/login");
  const id = (formData.get("id") as string) ?? "";
  if (!id) return;
  const { error } = await ctx.db
    .from("site_reviews")
    .delete()
    .eq("id", id)
    .eq("site_id", ctx.siteId);
  if (error) throw new Error(error.message);
  await revalidateSite(ctx.siteId);
}

export async function duplicateSite(formData: FormData) {
  const ctx = await resolveTarget(formData);
  if (!ctx?.siteId) redirect("/admin/login");

  const newSlug = ((formData.get("new_slug") as string) ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const newName = ((formData.get("new_name") as string) ?? "").trim();
  if (!newSlug || !newName) throw new Error("Slug och namn krävs.");

  const admin = createAdminClient();

  const { data: src, error: srcErr } = await admin
    .from("sites")
    .select("*")
    .eq("id", ctx.siteId)
    .single();
  if (srcErr || !src) throw new Error("Kunde inte ladda källan.");

  const { data: clash } = await admin
    .from("sites")
    .select("id")
    .eq("slug", newSlug)
    .maybeSingle();
  if (clash) throw new Error(`Slug "${newSlug}" är upptaget.`);

  const rest = { ...src } as Record<string, unknown>;
  delete rest.id;
  delete rest.created_at;
  delete rest.updated_at;
  rest.slug = newSlug;
  rest.name = newName;
  rest.domain = null;

  const { data: copy, error: copyErr } = await admin
    .from("sites")
    .insert(rest)
    .select("id")
    .single();
  if (copyErr || !copy)
    throw new Error(copyErr?.message ?? "Kopiering misslyckades.");

  await admin
    .from("site_users")
    .insert({ site_id: copy.id, user_id: ctx.user.id, role: "owner" });

  revalidatePath("/admin");
  revalidatePath("/admin/oversikt");
  redirect(ctx.elevated ? "/admin/oversikt" : "/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
