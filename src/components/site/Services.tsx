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
              Ett urval av vad vi erbjuder.
            </p>
          </div>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
          {site.services.map((s, i) => {
            const { title, description } = renderService(s);
            const hasDesc = Boolean(description) && description !== title;
            return (
              <li
                key={i}
                className="bg-[var(--surface)] border border-[var(--border)] rounded-xl p-4"
              >
                <span className="font-medium leading-tight block">{title}</span>
                {hasDesc && (
                  <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed">
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
