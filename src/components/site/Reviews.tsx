import { type Review, type Site } from "@/lib/types";

export function Reviews({
  site,
  reviews,
}: {
  site: Site;
  reviews: Review[];
}) {
  if (!reviews || reviews.length === 0) return null;
  const avg =
    reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;

  return (
    <section
      id="omdomen"
      className="section border-t border-[var(--border)] bg-[var(--warm)]"
    >
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="eyebrow mb-3">Vad kunderna säger</div>
            <h2 className="h-display text-3xl md:text-4xl">
              Snittbetyg från lokala kunder
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-5xl font-semibold tracking-tight tabular-nums">
              {avg.toFixed(1)}
            </div>
            <div>
              <Stars value={avg} />
              <div className="text-sm text-[var(--muted)] mt-1">
                {reviews.length} omdömen
              </div>
            </div>
          </div>
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r) => (
            <li key={r.id} className="card flex flex-col gap-3">
              <Stars value={r.rating} />
              <p className="text-[var(--foreground)]/90 leading-relaxed">
                "{r.text}"
              </p>
              <div
                className="mt-auto pt-3 text-sm font-medium"
                style={{ color: site.primary_color }}
              >
                — {r.customer_name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <div className="flex gap-0.5 text-lg" aria-label={`${value} av 5 stjärnor`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= full ? "star-on" : "star-off"}>
          ★
        </span>
      ))}
    </div>
  );
}
