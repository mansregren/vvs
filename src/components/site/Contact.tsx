import { type Site } from "@/lib/types";

export function Contact({ site }: { site: Site }) {
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;
  const extraContacts = (site.contacts ?? []).filter((c) => c.name && c.phone);
  return (
    <section
      id="kontakt"
      className="section border-t border-[var(--border)] bg-[var(--warm)]"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">Kontakt</div>
            <h2 className="h-display text-3xl md:text-4xl lg:text-5xl">
              Hör av dig
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-3">
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              Snabbaste vägen till oss är att ringa. Behöver du skicka bilder
              eller en lite längre beskrivning — mejla, så återkommer vi.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-3">
          <a
            href={telHref}
            className="card group flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
            style={{ borderTop: `3px solid ${site.primary_color}` }}
          >
            <div className="flex items-center justify-between">
              <div className="eyebrow">Ring</div>
              <Arrow color={site.primary_color} />
            </div>
            <div className="text-2xl md:text-3xl font-semibold tracking-tight">
              {site.phone}
            </div>
            {site.opening_hours && (
              <div className="text-sm text-[var(--muted)] whitespace-pre-line mt-auto pt-3">
                {site.opening_hours}
              </div>
            )}
          </a>

          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="card group flex flex-col gap-4 hover:shadow-md hover:-translate-y-0.5 transition-all"
              style={{ borderTop: `3px solid ${site.primary_color}` }}
            >
              <div className="flex items-center justify-between">
                <div className="eyebrow">E-post</div>
                <Arrow color={site.primary_color} />
              </div>
              <div className="text-xl md:text-2xl font-semibold tracking-tight break-all">
                {site.email}
              </div>
              <div className="text-sm text-[var(--muted)] mt-auto pt-3">
                Skicka offertförfrågan eller fråga
              </div>
            </a>
          )}

          <div
            className="card flex flex-col gap-4"
            style={{ borderTop: `3px solid ${site.primary_color}` }}
          >
            <div className="eyebrow">Besöksadress</div>
            <div className="text-xl md:text-2xl font-semibold tracking-tight leading-snug">
              {site.address}
            </div>
            <div className="text-sm text-[var(--muted)] mt-auto pt-3">
              {site.city}
            </div>
          </div>
        </div>

        {extraContacts.length > 0 && (
          <div className="mt-12">
            <div className="eyebrow mb-6">Personal</div>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {extraContacts.map((c, i) => {
                const tel = `tel:${c.phone.replace(/\s/g, "")}`;
                return (
                  <li key={i} className="card">
                    <div className="font-semibold tracking-tight">{c.name}</div>
                    {c.role && (
                      <div className="text-xs uppercase tracking-widest text-[var(--muted)] mt-1">
                        {c.role}
                      </div>
                    )}
                    <a
                      href={tel}
                      className="text-lg font-medium mt-3 inline-block"
                      style={{ color: site.primary_color }}
                    >
                      {c.phone}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function Arrow({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="transition-transform group-hover:translate-x-1"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="13 6 19 12 13 18" />
    </svg>
  );
}
