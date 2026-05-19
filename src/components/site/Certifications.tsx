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
        <div className="max-w-2xl mb-12">
          <div className="eyebrow mb-3">Certifikat & branschmedlemskap</div>
          <h2 className="h-display text-3xl md:text-4xl">
            Auktoriserad — på riktigt
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Vi följer branschstandarderna som krävs för att försäkringar och
            garantier ska gälla.
          </p>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {items.map((c) => {
            const logoUrl = assets?.[c.key];
            return (
              <li
                key={c.key}
                className="card flex items-center gap-4"
              >
                {logoUrl ? (
                  <div className="shrink-0 w-24 h-16 rounded-xl bg-white border border-[var(--border)] grid place-items-center overflow-hidden p-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={logoUrl}
                      alt={c.label}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <Badge initials={c.initials} color={c.color} />
                )}
                <div className="min-w-0">
                  <div className="font-semibold leading-tight">{c.short}</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5 line-clamp-2">
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
      className="shrink-0 w-14 h-14 rounded-xl grid place-items-center font-bold tracking-tight text-white"
      style={{
        background: `linear-gradient(135deg, ${color}, color-mix(in oklab, ${color} 70%, black))`,
        fontSize: initials.length >= 3 ? "0.85rem" : "1rem",
        letterSpacing: initials.length >= 3 ? "0" : "-0.02em",
      }}
      aria-hidden
    >
      {initials}
    </div>
  );
}
