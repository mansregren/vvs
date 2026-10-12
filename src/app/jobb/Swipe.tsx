"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Career = {
  title: string;
  emoji: string;
  pitch: string;
  path: string;
  bg: string;
  ink: string;
};

const CAREERS: Career[] = [
  { title: "Jurist", emoji: "⚖️", pitch: "Du vinner diskussioner du inte ens var med i.", path: "Juristprogrammet, 4,5 år", bg: "#1b1464", ink: "#ffd23f" },
  { title: "Ekonom", emoji: "📈", pitch: "Excel är inte ett program. Det är en livsstil.", path: "Civilekonom, 4 år", bg: "#00b37e", ink: "#ffffff" },
  { title: "Sjuksköterska", emoji: "🩺", pitch: "Lugn när allt brinner. Behövs överallt.", path: "Sjuksköterskeprogrammet, 3 år", bg: "#ff6b6b", ink: "#ffffff" },
  { title: "Programmerare", emoji: "💻", pitch: "Du löser problem som ingen annan förstår finns.", path: "Högskola, YH eller självlärd", bg: "#111111", ink: "#3ddcff" },
  { title: "Elektriker", emoji: "⚡", pitch: "Händerna i jobbet, eget företag inom räckhåll.", path: "El-programmet på gymnasiet", bg: "#ffd23f", ink: "#1b1464" },
  { title: "Lärare", emoji: "📚", pitch: "Du minns fortfarande din bästa lärare. Bli den.", path: "Lärarprogrammet, 3–5,5 år", bg: "#8a5cff", ink: "#ffffff" },
  { title: "Pilot", emoji: "✈️", pitch: "Kontoret har världens bästa utsikt.", path: "Trafikflygarutbildning, ca 2 år", bg: "#0077ff", ink: "#ffffff" },
  { title: "Kock", emoji: "🔥", pitch: "Snabbt, varmt, och folk blir glada på riktigt.", path: "Restaurang & livsmedel eller direkt i köket", bg: "#ff8a00", ink: "#ffffff" },
  { title: "Arkitekt", emoji: "📐", pitch: "Det du ritar står kvar i hundra år.", path: "Arkitektprogrammet, 5 år", bg: "#f2e8d5", ink: "#1b1464" },
  { title: "Psykolog", emoji: "🧠", pitch: "Alla berättar redan allt för dig ändå.", path: "Psykologprogrammet, 5 år + PTP", bg: "#00e0a4", ink: "#1b1464" },
  { title: "Polis", emoji: "🚓", pitch: "Ingen dag är den andra lik.", path: "Polisprogrammet, 2,5 år", bg: "#14213d", ink: "#ffffff" },
  { title: "Designer", emoji: "🎨", pitch: "Du ser direkt när något är 2 pixlar fel.", path: "Högskola, YH eller portfolio", bg: "#ff3d7f", ink: "#ffffff" },
];

const THRESHOLD = 110;

export default function Swipe() {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState<Career[]>([]);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [leaving, setLeaving] = useState<null | "left" | "right">(null);
  const start = useRef({ x: 0, y: 0 });

  const done = index >= CAREERS.length;

  const decide = useCallback(
    (dir: "left" | "right") => {
      if (leaving || index >= CAREERS.length) return;
      setLeaving(dir);
      const career = CAREERS[index];
      window.setTimeout(() => {
        if (dir === "right") setLiked((l) => [...l, career]);
        setIndex((i) => i + 1);
        setLeaving(null);
        setDrag({ x: 0, y: 0, active: false });
      }, 260);
    },
    [leaving, index],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") decide("right");
      if (e.key === "ArrowLeft") decide("left");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [decide]);

  function onPointerDown(e: React.PointerEvent) {
    if (leaving) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0, active: true });
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!drag.active) return;
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y, active: true });
  }

  function onPointerUp() {
    if (!drag.active) return;
    if (drag.x > THRESHOLD) decide("right");
    else if (drag.x < -THRESHOLD) decide("left");
    else setDrag({ x: 0, y: 0, active: false });
  }

  function restart() {
    setIndex(0);
    setLiked([]);
  }

  if (done) {
    return (
      <section className="mt-10 w-full max-w-sm rounded-[2rem] bg-white p-6 text-[#1b1464] shadow-2xl md:mt-0">
        <h2 className="text-3xl font-extrabold leading-tight">
          {liked.length > 0 ? "Det är en match!" : "Kräsen, du."}
        </h2>
        <p className="mt-2 text-[#1b1464]/70">
          {liked.length > 0
            ? "Du swajpade höger på:"
            : "Du swajpade vänster på allt. Testa igen?"}
        </p>
        {liked.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {liked.map((c) => (
              <li
                key={c.title}
                className="rounded-full px-4 py-2 text-sm font-bold"
                style={{ background: c.bg, color: c.ink }}
              >
                {c.emoji} {c.title}
              </li>
            ))}
          </ul>
        )}
        <p className="mt-6 text-sm text-[#1b1464]/70">
          Snart: swajpa på riktiga lediga jobb — så skriver vi ansökan åt dig.
        </p>
        <div className="mt-5 flex flex-col gap-3">
          <a
            href="mailto:mansregren@caztmedia.com?subject=S%C3%A4g%20till%20n%C3%A4r%20jobb-appen%20%C3%A4r%20klar"
            className="rounded-full bg-[#ff3d7f] px-5 py-3 text-center font-bold text-white transition hover:scale-[1.02]"
          >
            Säg till mig när den är klar
          </a>
          <button
            onClick={restart}
            className="rounded-full border-2 border-[#1b1464]/15 px-5 py-3 font-bold transition hover:bg-[#1b1464]/5"
          >
            Swajpa igen
          </button>
        </div>
      </section>
    );
  }

  const dx = leaving === "right" ? 600 : leaving === "left" ? -600 : drag.x;
  const dy = leaving ? drag.y : drag.y * 0.4;
  const likeOpacity = Math.min(Math.max(dx / THRESHOLD, 0), 1);
  const nopeOpacity = Math.min(Math.max(-dx / THRESHOLD, 0), 1);

  return (
    <section className="mt-10 flex w-full max-w-sm flex-col items-center md:mt-0">
      <div className="relative h-[440px] w-full select-none">
        {CAREERS.slice(index, index + 3)
          .map((c, i) => {
            const top = i === 0;
            const style: React.CSSProperties = top
              ? {
                  background: c.bg,
                  color: c.ink,
                  transform: `translate(${dx}px, ${dy}px) rotate(${dx / 14}deg)`,
                  transition: drag.active && !leaving ? "none" : "transform 260ms ease-out",
                  cursor: drag.active ? "grabbing" : "grab",
                  touchAction: "none",
                  zIndex: 3,
                }
              : {
                  background: c.bg,
                  color: c.ink,
                  transform: `translateY(${i * 14}px) scale(${1 - i * 0.05})`,
                  transition: "transform 260ms ease-out",
                  zIndex: 3 - i,
                };
            return (
              <article
                key={c.title}
                className="absolute inset-0 flex flex-col justify-between rounded-[2rem] p-7 shadow-2xl ring-4 ring-white/40"
                style={style}
                onPointerDown={top ? onPointerDown : undefined}
                onPointerMove={top ? onPointerMove : undefined}
                onPointerUp={top ? onPointerUp : undefined}
                onPointerCancel={top ? onPointerUp : undefined}
              >
                {top && (
                  <>
                    <span
                      className="absolute left-6 top-6 -rotate-12 rounded-xl border-4 border-[#00e0a4] px-3 py-1 text-2xl font-extrabold text-[#00e0a4]"
                      style={{ opacity: likeOpacity }}
                    >
                      JA!
                    </span>
                    <span
                      className="absolute right-6 top-6 rotate-12 rounded-xl border-4 border-[#ff3d3d] px-3 py-1 text-2xl font-extrabold text-[#ff3d3d]"
                      style={{ opacity: nopeOpacity }}
                    >
                      NEJ
                    </span>
                  </>
                )}
                <div className="mt-10 text-8xl leading-none">{c.emoji}</div>
                <div>
                  <h2 className="text-5xl font-extrabold tracking-tight">{c.title}</h2>
                  <p className="mt-3 text-xl font-medium opacity-90">{c.pitch}</p>
                  <p className="mt-4 inline-block rounded-full bg-black/15 px-3 py-1 text-sm font-medium">
                    🎓 {c.path}
                  </p>
                </div>
              </article>
            );
          })
          .reverse()}
      </div>

      <div className="mt-10 flex items-center gap-6">
        <button
          onClick={() => decide("left")}
          aria-label="Swajpa vänster"
          className="grid h-16 w-16 place-items-center rounded-full bg-white text-3xl text-[#ff3d3d] shadow-xl transition hover:scale-110 active:scale-95"
        >
          ✕
        </button>
        <span className="text-sm font-bold text-white/85">
          {index + 1} / {CAREERS.length}
        </span>
        <button
          onClick={() => decide("right")}
          aria-label="Swajpa höger"
          className="grid h-16 w-16 place-items-center rounded-full bg-white text-3xl text-[#ff3d7f] shadow-xl transition hover:scale-110 active:scale-95"
        >
          ♥
        </button>
      </div>
    </section>
  );
}
