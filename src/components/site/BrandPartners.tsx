import { type Site } from "@/lib/types";
import { BRAND_PARTNERS } from "@/lib/catalogs";

export function BrandPartners({
  site,
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
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">Vi arbetar med</div>
            <h2 className="h-display text-3xl md:text-4xl lg:text-5xl">
              Märken vi installerar och servar
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-3">
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              Auktoriserade på de märken vi rekommenderar — och kan serva
              det mesta som redan finns installerat hos dig.
            </p>
          </div>
        </div>

        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-6">
          {items.map((b) => (
            <li key={b.key}>
              <div className="font-semibold text-lg tracking-tight">
                {b.label}
              </div>
              <div className="text-xs text-[var(--muted)] mt-1">
                {b.category}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
