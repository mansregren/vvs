import { type Site } from "@/lib/types";
import { BRAND_PARTNERS } from "@/lib/catalogs";

export function BrandPartners({
  site,
  assets,
}: {
  site: Site;
  assets?: Record<string, string>;
}) {
  const active = (site.brand_partners ?? []).filter(Boolean);
  if (active.length === 0) return null;

  const items = active
    .map((key) => BRAND_PARTNERS.find((b) => b.key === key))
    .filter((b): b is (typeof BRAND_PARTNERS)[number] => !!b);
  if (items.length === 0) return null;

  return (
    <section
      id="partners"
      className="section border-t border-[var(--border)] bg-[var(--warm)]"
    >
      <div className="container-x">
        <div className="max-w-2xl mb-10">
          <div className="eyebrow mb-3">Vi arbetar med</div>
          <h2 className="h-display text-3xl md:text-4xl">
            Märken vi installerar och servar
          </h2>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {items.map((b) => {
            const logoUrl = assets?.[b.key];
            return (
              <li
                key={b.key}
                className="aspect-[5/3] rounded-xl bg-white border border-[var(--border)] grid place-items-center p-4"
                aria-label={b.label}
              >
                {logoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logoUrl}
                    alt={b.label}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <div
                      className="font-bold tracking-tight text-lg md:text-xl"
                      style={{ color: b.color }}
                    >
                      {b.label}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-[var(--muted)] mt-1">
                      {b.category}
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
