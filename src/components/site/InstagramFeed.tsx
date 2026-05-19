"use client";
import { useEffect, useRef } from "react";
import { type Site } from "@/lib/types";

// Instagram embed.js är officiell. Vi lägger till blockquote-element och kallar window.instgrm.Embeds.process().
declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export function InstagramFeed({ site }: { site: Site }) {
  const urls = (site.instagram_post_urls ?? []).filter(Boolean).slice(0, 6);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (urls.length === 0) return;

    const tryProcess = () => {
      if (window.instgrm?.Embeds) {
        window.instgrm.Embeds.process();
      }
    };

    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]',
    );
    if (existing) {
      tryProcess();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = tryProcess;
    document.body.appendChild(script);
  }, [urls.length]);

  if (urls.length === 0) return null;

  return (
    <section
      id="instagram"
      className="section border-t border-[var(--border)]"
    >
      <div className="container-x">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div className="max-w-2xl">
            <div className="eyebrow mb-3">Instagram</div>
            <h2 className="h-display text-3xl md:text-4xl">
              Senaste från Instagram
            </h2>
          </div>
          {site.instagram_url && (
            <a
              href={site.instagram_url}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost btn-sm"
            >
              Följ oss på Instagram
            </a>
          )}
        </div>
        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {urls.map((u) => (
            <blockquote
              key={u}
              className="instagram-media"
              data-instgrm-captioned
              data-instgrm-permalink={u}
              data-instgrm-version="14"
              style={{
                background: "#fff",
                border: 0,
                borderRadius: "1rem",
                boxShadow: "0 0 1px rgba(0,0,0,0.08)",
                margin: 0,
                maxWidth: "540px",
                minWidth: "326px",
                padding: 0,
                width: "100%",
              }}
            >
              <a href={u}>{u}</a>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
