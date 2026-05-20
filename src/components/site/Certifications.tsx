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
              Vi följer branschstandarderna som krävs för att försäkringar och
              garantier ska gälla.
            </p>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {items.map((c) => {
            const logoUrl = assets?.[c.key];
            return (
              <li
                key={c.key}
                className="card flex flex-col items-center text-center"
              >
                <div className="h-24 md:h-28 mb-5 flex items-center justify-center">
                  {logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logoUrl}
                      alt={c.label}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div
                      className="w-20 h-20 rounded-2xl grid place-items-center text-white font-bold text-xl shadow-sm"
                      style={{
                        background: `linear-gradient(135deg, ${c.color}, color-mix(in oklab, ${c.color} 70%, black))`,
                      }}
                      aria-hidden
                    >
                      {c.initials}
                    </div>
                  )}
                </div>
                <div className="font-semibold leading-tight">{c.short}</div>
                <p className="text-sm text-[var(--muted)] mt-2 leading-relaxed">
                  {c.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
