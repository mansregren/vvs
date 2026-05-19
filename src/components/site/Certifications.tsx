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
                className="card flex flex-col"
              >
                {logoUrl ? (
                  <div className="h-24 md:h-28 grid place-items-center mb-6">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoUrl}
                      alt={c.label}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="mb-6">
                    <div
                      className="text-2xl font-semibold tracking-tight leading-tight"
                      style={{ color: c.color }}
                    >
                      {c.short}
                    </div>
                    <div
                      className="h-0.5 w-10 mt-3 rounded-full"
                      style={{ background: c.color, opacity: 0.4 }}
                      aria-hidden
                    />
                  </div>
                )}
                {logoUrl && (
                  <div className="font-semibold leading-tight">{c.short}</div>
                )}
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
