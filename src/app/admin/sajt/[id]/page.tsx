import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { isPlatformAdmin } from "@/lib/site";
import { SiteEditor } from "@/components/admin/SiteEditor";
import { signOut } from "../../actions";

export const dynamic = "force-dynamic";

export default async function EditSitePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/admin/login?next=/admin/sajt/${id}`);

  const platformAdmin = await isPlatformAdmin(user.id);
  if (!platformAdmin) {
    return (
      <main className="container-x py-20 max-w-xl space-y-4">
        <div className="eyebrow">Plattform-admin</div>
        <h1 className="text-3xl font-semibold tracking-tight">Inte behörig</h1>
        <p className="text-[var(--muted)]">
          Bara plattform-admin kan redigera andra firmors sajter.{" "}
          <Link href="/admin" className="underline underline-offset-4">
            Till din egen admin
          </Link>
          .
        </p>
        <form action={signOut}>
          <button type="submit" className="btn-ghost">
            Logga ut
          </button>
        </form>
      </main>
    );
  }

  // Service-role: läs valfri sajt + dess omdömen (förbi RLS).
  const admin = createAdminClient();
  const { data: site } = await admin
    .from("sites")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!site) notFound();

  const { data: reviewRows } = await admin
    .from("site_reviews")
    .select("id, customer_name, rating, text, display_order")
    .eq("site_id", id)
    .order("display_order", { ascending: true });

  const reviews = (reviewRows ?? []).map((r) => ({
    id: r.id,
    customer_name: r.customer_name,
    rating: r.rating,
    text: r.text,
  }));

  return (
    <SiteEditor
      site={site}
      reviews={reviews}
      userEmail={user.email ?? ""}
      platformAdmin={platformAdmin}
      siteId={id}
    />
  );
}
