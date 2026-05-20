import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getReviewsForSite, isPlatformAdmin } from "@/lib/site";
import { SiteEditor } from "@/components/admin/SiteEditor";
import { signOut } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: link } = await supabase
    .from("site_users")
    .select("site_id")
    .eq("user_id", user.id)
    .maybeSingle();

  const platformAdmin = await isPlatformAdmin(user.id);

  if (!link) {
    return (
      <main className="container-x py-20 space-y-4 max-w-xl">
        <h1 className="text-3xl font-semibold tracking-tight">
          Inget konto kopplat
        </h1>
        <p className="text-[var(--muted)]">
          Din användare är inloggad men inte kopplad till någon firma.
        </p>
        {platformAdmin && (
          <Link href="/admin/oversikt" className="btn-primary">
            Gå till plattform-admin
          </Link>
        )}
        <form action={signOut}>
          <button type="submit" className="btn-ghost">
            Logga ut
          </button>
        </form>
      </main>
    );
  }

  const { data: site } = await supabase
    .from("sites")
    .select("*")
    .eq("id", link.site_id)
    .single();
  if (!site) redirect("/admin/login");

  const reviews = await getReviewsForSite(site.id);

  return (
    <SiteEditor
      site={site}
      reviews={reviews}
      userEmail={user.email ?? ""}
      platformAdmin={platformAdmin}
    />
  );
}
