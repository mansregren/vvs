import { type Site } from "@/lib/types";

export function Services({ site }: { site: Site }) {
  if (!site.services || site.services.length === 0) return null;
  return (
    <section
      id="tjanster"
      className="section border-t border-[var(--border)] bg-[var(--warm)]"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-12">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">Tjänster</div>
            <h2 className="h-display text-3xl md:text-4xl lg:text-5xl">
              Det vi gör
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-3">
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              Vi tar uppdrag både för privatpersoner och företag — från
              servicebesök och felsökning till totalrenovering. Är du osäker
              på vad du behöver? Ring oss så reder vi ut det.
            </p>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {site.services.map((s, i) => {
            const [title, ...rest] = s.split("—");
            const description = rest.join("—").trim();
            const num = String(i + 1).padStart(2, "0");
            return (
              <li
                key={i}
                className="card group relative transition-all hover:shadow-md hover:-translate-y-0.5"
              >
                <div
                  className="text-sm font-mono font-medium mb-4"
                  style={{ color: site.primary_color }}
                >
                  {num}
                </div>
                <h3 className="font-semibold text-lg leading-tight mb-2">
                  {title.trim()}
                </h3>
                {description && (
                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {description}
                  </p>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
