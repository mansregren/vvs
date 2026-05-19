import { type Site } from "@/lib/types";

// Facebook Page Plugin via iframe. Inget JS-SDK behövs.
// Renderar bara om site har en facebook_page_url satt (URL till själva FB-page:t).
export function FacebookFeed({ site }: { site: Site }) {
  if (!site.facebook_page_url) return null;
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    site.facebook_page_url,
  )}&tabs=timeline&width=500&height=600&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true`;

  return (
    <section
      id="facebook"
      className="section border-t border-[var(--border)] bg-[var(--warm)]"
    >
      <div className="container-x">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div className="max-w-2xl">
            <div className="eyebrow mb-3">Facebook</div>
            <h2 className="h-display text-3xl md:text-4xl">
              Senaste från Facebook
            </h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Klicka in för att läsa, gilla eller skriva.
            </p>
          </div>
          <a
            href={site.facebook_page_url}
            target="_blank"
            rel="noreferrer"
            className="btn-ghost btn-sm"
          >
            Besök Facebook-sidan
          </a>
        </div>
        <div className="grid place-items-center">
          <div className="w-full max-w-xl card !p-0 overflow-hidden">
            <iframe
              src={src}
              width="500"
              height="600"
              style={{ border: "none", overflow: "hidden", width: "100%" }}
              scrolling="no"
              allow="encrypted-media"
              title={`Facebook — ${site.name}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
