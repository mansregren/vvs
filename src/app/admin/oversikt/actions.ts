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
  if (siteErr || !siteRow) throw new Error(siteErr?.message ?? "Site-skapande misslyckades.");

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
  redirect(`/admin/sajt/${siteRow.id}`);
}

export async function signOutPlatform() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
