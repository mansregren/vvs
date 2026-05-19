import { type Site } from "@/lib/types";

const ICONS: Record<string, string> = {
  vatten: "💧",
  rör: "🔧",
  bad: "🛁",
  värme: "🔥",
  pump: "♨️",
  el: "⚡",
  ventilation: "🌬️",
  service: "🛠️",
  felsök: "🔍",
  akut: "🚨",
  default: "▪",
};

function iconFor(label: string): string {
  const l = label.toLowerCase();
  for (const k of Object.keys(ICONS)) {
    if (l.includes(k)) return ICONS[k];
  }
  return ICONS.default;
}

export function Services({ site }: { site: Site }) {
  if (!site.services || site.services.length === 0) return null;
  return (
    <section
      id="tjanster"
      className="section border-t border-[var(--border)] bg-[var(--warm)]"
    >
      <div className="container-x">
        <div className="max-w-2xl mb-12">
          <div className="eyebrow mb-3">Tjänster</div>
          <h2 className="h-display text-3xl md:text-4xl">Det vi gör</h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Vi tar uppdrag både för privatpersoner och företag — från
            servicebesök till nybyggnationer.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {site.services.map((s, i) => {
            const [title, ...rest] = s.split("—");
            const description = rest.join("—").trim();
            return (
              <li
                key={i}
                className="card group flex gap-4 transition-shadow hover:shadow-md"
              >
                <div
                  className="shrink-0 w-12 h-12 rounded-xl grid place-items-center text-2xl"
                  style={{
                    background: `color-mix(in oklab, ${site.primary_color} 14%, white)`,
                  }}
                >
                  {iconFor(s)}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-lg leading-snug">
                    {title.trim()}
                  </h3>
                  {description && (
                    <p className="text-sm text-[var(--muted)] mt-1">
                      {description}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
