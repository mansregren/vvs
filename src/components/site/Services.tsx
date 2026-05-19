import { type Site } from "@/lib/types";

export function Services({ site }: { site: Site }) {
  if (!site.services || site.services.length === 0) return null;
  return (
    <section className="border-b border-[var(--border)] py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-6 md:px-10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-10">
          Det vi gör
        </h2>
        <ul className="grid md:grid-cols-2 gap-x-12 gap-y-4">
          {site.services.map((s, i) => (
            <li
              key={i}
              className="flex items-baseline gap-4 text-lg border-b border-[var(--border)] pb-4"
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                style={{ backgroundColor: site.primary_color }}
              />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
