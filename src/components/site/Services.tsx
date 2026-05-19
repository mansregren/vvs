import { type Site } from "@/lib/types";
import { renderService } from "@/lib/catalogs";

export function Services({ site }: { site: Site }) {
  if (!site.services || site.services.length === 0) return null;
  return (
    <section
      id="tjanster"
      className="section border-t border-[var(--border)] bg-[var(--warm)]"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-10">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">Tjänster</div>
            <h2 className="h-display text-3xl md:text-4xl lg:text-5xl">
              Det vi gör
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-3">
            <p className="text-lg leading-relaxed text-[var(--muted)]">
              Klicka på en tjänst för att läsa mer.
            </p>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {site.services.map((s, i) => {
            const { title, description } = renderService(s);
            return (
              <li key={i}>
                <details className="group bg-[var(--surface)] border border-[var(--border)] rounded-xl open:shadow-md transition-shadow">
                  <summary className="cursor-pointer list-none p-4 flex items-center justify-between gap-3">
                    <span className="font-medium leading-tight">
                      {title}
                    </span>
                    <Chevron color={site.primary_color} />
                  </summary>
                  {description && (
                    <p className="px-4 pb-4 text-sm text-[var(--muted)] leading-relaxed">
                      {description}
                    </p>
                  )}
                </details>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Chevron({ color }: { color: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="transition-transform shrink-0 group-open:rotate-180"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
