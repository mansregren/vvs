import { type Site } from "@/lib/types";

// Plockar ut bara src-URL:en från en inklistrad <iframe>-snippet, eller använder strängen direkt om det redan är en URL.
function extractEmbedSrc(input: string): string | null {
  const trimmed = input.trim();
  if (trimmed.startsWith("<iframe")) {
    const m = trimmed.match(/src="([^"]+)"/);
    return m?.[1] ?? null;
  }
  if (trimmed.startsWith("http")) return trimmed;
  return null;
}

export function MapSection({ site }: { site: Site }) {
  if (!site.google_maps_embed) return null;
  const src = extractEmbedSrc(site.google_maps_embed);
  if (!src) return null;

  return (
    <section id="hitta" className="border-t border-[var(--border)]">
      <div className="container-x py-16 md:py-20">
        <div className="max-w-2xl mb-8">
          <div className="eyebrow mb-3">Hitta hit</div>
          <h2 className="h-display text-3xl md:text-4xl">
            {site.address}
          </h2>
        </div>
        <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--warm)]">
          <iframe
            src={src}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            allowFullScreen
            title={`Karta — ${site.name}`}
          />
        </div>
      </div>
    </section>
  );
}
