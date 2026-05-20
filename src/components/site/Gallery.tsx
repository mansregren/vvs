import { type Site } from "@/lib/types";

export function Gallery({ site }: { site: Site }) {
  if (!site.gallery_images || site.gallery_images.length === 0) return null;
  return (
    <section id="galleri" className="section border-t border-[var(--border)]">
      <div className="container-x">
        <div className="max-w-2xl mb-10">
          <div className="eyebrow mb-3">Galleri</div>
          <h2 className="h-display text-3xl md:text-4xl">Vårt arbete</h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Ett axplock av tidigare jobb.
          </p>
        </div>
        <div className="gallery-grid">
          {site.gallery_images.map((url, i) => (
            <a
              key={url + i}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="gallery-item block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt={`Galleri ${i + 1}`} loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
