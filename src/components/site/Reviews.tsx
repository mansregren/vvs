import { type Review, type Site } from "@/lib/types";

export function Reviews({
  site,
  reviews,
}: {
  site: Site;
  reviews: Review[];
}) {
  if (!reviews || reviews.length === 0) return null;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const [featured, ...rest] = reviews;

  return (
    <section
      id="omdomen"
      className="section border-t border-[var(--border)]"
    >
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-14">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-3">Omdömen</div>
            <h2 className="h-display text-3xl md:text-4xl lg:text-5xl">
              Vad kunderna säger
            </h2>
          </div>
          <div className="lg:col-span-7 lg:pt-3 flex items-baseline gap-4">
            <div className="text-6xl font-semibold tracking-tight tabular-nums">
              {avg.toFixed(1)}
            </div>
            <div>
              <StarRow value={avg} color={site.primary_color} />
              <div className="text-sm text-[var(--muted)] mt-1.5">
                Snitt av {reviews.length} omdömen
              </div>
            </div>
          </div>
        </div>

        {featured && (
          <figure className="border-y border-[var(--border)] py-10 md:py-14 mb-10">
            <StarRow value={featured.rating} color={site.primary_color} large />
            <blockquote className="mt-6 text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight leading-snug max-w-4xl">
              "{featured.text}"
            </blockquote>
            <figcaption
              className="mt-6 text-sm font-medium"
              style={{ color: site.primary_color }}
            >
              — {featured.customer_name}
            </figcaption>
          </figure>
        )}

        {rest.length > 0 && (
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {rest.map((r) => (
              <li key={r.id} className="card flex flex-col gap-4">
                <StarRow value={r.rating} color={site.primary_color} />
                <p className="text-[var(--foreground)]/90 leading-relaxed">
                  {r.text}
                </p>
                <div
                  className="mt-auto pt-2 text-sm font-medium"
                  style={{ color: site.primary_color }}
                >
                  — {r.customer_name}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function StarRow({
  value,
  color,
  large = false,
}: {
  value: number;
  color: string;
  large?: boolean;
}) {
  const full = Math.round(value);
  const size = large ? 22 : 16;
  return (
    <div
      className="inline-flex gap-1"
      role="img"
      aria-label={`${value} av 5 stjärnor`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} size={size} filled={i <= full} color={color} />
      ))}
    </div>
  );
}

function StarIcon({
  size,
  filled,
  color,
}: {
  size: number;
  filled: boolean;
  color: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? color : "none"}
      stroke={filled ? color : "currentColor"}
      strokeWidth="1.6"
      strokeLinejoin="round"
      style={!filled ? { color: "var(--border-strong)" } : undefined}
      aria-hidden
    >
      <polygon points="12,2.5 14.9,8.8 21.8,9.5 16.6,14.2 18.1,21 12,17.4 5.9,21 7.4,14.2 2.2,9.5 9.1,8.8" />
    </svg>
  );
}
