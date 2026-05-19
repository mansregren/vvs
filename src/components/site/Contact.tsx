import { type Site } from "@/lib/types";

export function Contact({ site }: { site: Site }) {
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;
  return (
    <section
      id="kontakt"
      className="section border-t border-[var(--border)]"
    >
      <div className="container-x">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow mb-3">Kontakt</div>
          <h2 className="h-display text-3xl md:text-4xl">Hör av dig</h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Vi svarar oftast inom ett par timmar på kontorstid.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <a
            href={telHref}
            className="card flex flex-col gap-3 hover:shadow-md transition-shadow"
            style={{ borderLeft: `4px solid ${site.primary_color}` }}
          >
            <div className="eyebrow">Ring</div>
            <div className="text-2xl md:text-3xl font-semibold tracking-tight">
              {site.phone}
            </div>
            {site.opening_hours && (
              <div className="text-sm text-[var(--muted)] whitespace-pre-line">
                {site.opening_hours}
              </div>
            )}
          </a>

          {site.email ? (
            <a
              href={`mailto:${site.email}`}
              className="card flex flex-col gap-3 hover:shadow-md transition-shadow"
              style={{ borderLeft: `4px solid ${site.primary_color}` }}
            >
              <div className="eyebrow">E-post</div>
              <div className="text-2xl md:text-3xl font-semibold tracking-tight break-all">
                {site.email}
              </div>
              <div className="text-sm text-[var(--muted)]">
                Skicka en offertförfrågan eller fråga
              </div>
            </a>
          ) : (
            <div
              className="card flex flex-col gap-3"
              style={{ borderLeft: `4px solid ${site.primary_color}` }}
            >
              <div className="eyebrow">Besöksadress</div>
              <div className="text-2xl md:text-3xl font-semibold tracking-tight">
                {site.address}
              </div>
              <div className="text-sm text-[var(--muted)]">{site.city}</div>
            </div>
          )}

          {site.email && (
            <div
              className="card flex flex-col gap-3 md:col-span-2"
              style={{ borderLeft: `4px solid ${site.primary_color}` }}
            >
              <div className="eyebrow">Adress</div>
              <div className="text-lg font-medium">{site.address}</div>
              <div className="text-sm text-[var(--muted)]">{site.city}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
