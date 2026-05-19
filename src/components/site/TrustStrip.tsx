import { type Site } from "@/lib/types";

export function TrustStrip({ site }: { site: Site }) {
  const items: { label: string; sub?: string }[] = [];
  if (site.has_jour) {
    items.push({
      label: "Jour 24/7",
      sub: site.jour_text ?? "Akutservice när det är bråttom",
    });
  }
  if (site.offers_free_quote) {
    items.push({ label: "Kostnadsfri offert", sub: "Innan vi börjar arbeta" });
  }
  if (site.rot_avdrag) {
    items.push({ label: "ROT-avdrag", sub: "Vi hanterar pappersarbetet" });
  }
  if (site.guarantee_text) {
    items.push({ label: "Garanti", sub: site.guarantee_text });
  }
  if (items.length === 0) return null;

  return (
    <section className="border-y border-[var(--border)] bg-[var(--surface)]">
      <div className="container-x py-8 md:py-10">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
          {items.map((it) => (
            <li key={it.label} className="flex flex-col gap-1">
              <div className="flex items-center gap-2.5">
                <Tick color={site.primary_color} />
                <span className="font-semibold tracking-tight">{it.label}</span>
              </div>
              {it.sub && (
                <p className="text-sm text-[var(--muted)] leading-snug pl-7">
                  {it.sub}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Tick({ color }: { color: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="shrink-0"
    >
      <polyline points="5 12 10 17 19 8" />
    </svg>
  );
}

export function JourBanner({ site }: { site: Site }) {
  if (!site.has_jour) return null;
  const phone = site.jour_phone?.trim() || site.phone;
  const tel = `tel:${phone.replace(/\s/g, "")}`;
  return (
    <a
      href={tel}
      className="block border-y border-[var(--border)] group"
      style={{
        background: `color-mix(in oklab, ${site.primary_color} 96%, white)`,
      }}
    >
      <div className="container-x py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="inline-block w-2.5 h-2.5 rounded-full bg-white animate-pulse"
          />
          <span className="font-medium tracking-tight">
            Akut läckage eller stopp?{" "}
            {site.jour_text ?? "Akutservice dygnet runt."}
          </span>
        </div>
        <span className="font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
          Ring {phone}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="13 6 19 12 13 18" />
          </svg>
        </span>
      </div>
    </a>
  );
}
