import { type Site } from "@/lib/types";
import { CERTIFICATIONS } from "@/lib/catalogs";

export function Certifications({
  site,
  assets,
}: {
  site: Site;
  assets?: Record<string, string>;
}) {
  const active = (site.certifications ?? []).filter(Boolean);
  if (active.length === 0) return null;

  const items = active
    .map((key) => CERTIFICATIONS.find((c) => c.key === key))
    .filter((c): c is (typeof CERTIFICATIONS)[number] => !!c);
  if (items.length === 0) return null;

  return (
    <section
      id="certifikat"
      className="section border-t border-[var(--border)]"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">Certifikat & branschmedlemskap</div>
            <h2 className="h-display text-3xl md:text-4xl lg:text-5xl">
              Auktoriserad — på riktigt
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-3">
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              Vi följer branschstandarderna som krävs för att försäkringar
              och garantier ska gälla. Be om intygen vid uppdragsstart om du
              vill verifiera.
            </p>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {items.map((c) => {
            const logoUrl = assets?.[c.key];
            return (
              <li key={c.key} className="card flex flex-col gap-5">
                <div className="aspect-[5/3] rounded-xl bg-white border border-[var(--border)] grid place-items-center p-4 overflow-hidden">
                  {logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logoUrl}
                      alt={c.label}
                      className="max-w-full max-h-full object-contain"
                    />
                  ) : (
                    <Badge initials={c.initials} color={c.color} />
                  )}
                </div>
                <div>
                  <div className="font-semibold leading-tight">{c.short}</div>
                  <div className="text-sm text-[var(--muted)] mt-2 leading-relaxed line-clamp-3">
                    {c.description}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Badge({ initials, color }: { initials: string; color: string }) {
  return (
    <div
      className="w-20 h-20 rounded-2xl grid place-items-center font-bold tracking-tight text-white"
      style={{
        background: `linear-gradient(135deg, ${color}, color-mix(in oklab, ${color} 70%, black))`,
        fontSize: initials.length >= 3 ? "1.15rem" : "1.4rem",
        letterSpacing: initials.length >= 3 ? "0" : "-0.02em",
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
