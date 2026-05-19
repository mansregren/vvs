import { type Site } from "@/lib/types";
import { CERTIFICATIONS } from "@/lib/catalogs";

export function Certifications({ site }: { site: Site }) {
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
            Vi följer branschstandarderna som krävs för försäkringar och
            garantier ska gälla.
          </p>
        </div>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {items.map((c) => (
            <li
              key={c.key}
              className="card flex items-center gap-4 hover:shadow-md transition-shadow"
            >
              <a
                href={c.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 w-full"
                aria-label={c.label}
              >
                <Badge
                  initials={c.initials}
                  color={c.color}
                />
                <div className="min-w-0">
                  <div className="font-semibold leading-tight">{c.short}</div>
                  <div className="text-xs text-[var(--muted)] mt-0.5 line-clamp-2">
                    {c.description}
                  </div>
                </div>
              </a>
            </li>
          ))}
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
