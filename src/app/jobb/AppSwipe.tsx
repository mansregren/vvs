"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ACCENT, ACCENT_DEEP, APP_BG, ActionButtons, AppHeader, INK, JOBS, JobCard, MUTED, StatusBar, TabBar } from "./screens";

const THRESHOLD = 100;

export default function AppSwipe() {
  const [index, setIndex] = useState(0);
  const [applied, setApplied] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [leaving, setLeaving] = useState<null | "left" | "right">(null);
  const start = useRef({ x: 0, y: 0 });
  const done = index >= JOBS.length;

  const decide = useCallback(
    (dir: "left" | "right") => {
      if (leaving || index >= JOBS.length) return;
      setLeaving(dir);
      window.setTimeout(() => {
        if (dir === "right") setApplied((n) => n + 1);
        setIndex((i) => i + 1);
        setLeaving(null);
        setDrag({ x: 0, y: 0, active: false });
      }, 280);
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
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    setDrag({ x: 0, y: 0, active: true });
  }
  function onPointerMove(e: React.PointerEvent) {
    if (!drag.active) return;
    setDrag({ x: e.clientX - start.current.x, y: e.clientY - start.current.y, active: true });
  }
  function onPointerUp() {
    if (!drag.active) return;
    if (drag.x > THRESHOLD / 1.6) decide("right");
    else if (drag.x < -THRESHOLD / 1.6) decide("left");
    else setDrag({ x: 0, y: 0, active: false });
  }

  // drag-avstånd är i skärm-pixlar; telefonen är nedskalad, så förstärk lite
  const dx = leaving === "right" ? 520 : leaving === "left" ? -520 : drag.x * 1.4;
  const dy = drag.y * 0.5;
  const like = Math.min(Math.max(dx / THRESHOLD, 0), 1);
  const nope = Math.min(Math.max(-dx / THRESHOLD, 0), 1);

  return (
    <div className="relative h-full w-full select-none" style={{ background: APP_BG, color: INK }}>
      <StatusBar />
      <AppHeader />

      {done ? (
        <div className="mx-[16px] flex h-[560px] flex-col items-center justify-center rounded-[26px] bg-white px-[28px] text-center shadow-[0_18px_40px_-18px_rgba(11,37,64,0.35)]">
          <span className="grid h-[72px] w-[72px] place-items-center rounded-full text-[32px] text-white" style={{ background: `linear-gradient(135deg,${ACCENT},${ACCENT_DEEP})` }}>
            ✓
          </span>
          <h3 className="mt-[18px] text-[26px] font-semibold tracking-tight">
            {applied > 0 ? `${applied} ansökningar klara` : "Inga sökta jobb"}
          </h3>
          <p className="mt-[8px] text-[15px] leading-snug" style={{ color: MUTED }}>
            {applied > 0
              ? "Breven är skrivna utifrån ditt CV. Granska och skicka när du vill."
              : "Du swajpade vänster på allt. Nya jobb kommer varje dag."}
          </p>
          <button
            type="button"
            onClick={() => {
              setIndex(0);
              setApplied(0);
            }}
            className="mt-[22px] h-[50px] w-full rounded-[14px] text-[16px] font-semibold text-white"
            style={{ background: `linear-gradient(135deg,${ACCENT},${ACCENT_DEEP})` }}
          >
            Swajpa igen
          </button>
        </div>
      ) : (
        <div className="relative mx-[16px] h-[560px]">
          {JOBS.slice(index, index + 2)
            .map((job, i) => {
              const top = i === 0;
              return (
                <div
                  key={job.title}
                  className="absolute inset-0"
                  style={
                    top
                      ? {
                          transform: `translate(${dx}px, ${dy}px) rotate(${dx / 18}deg)`,
                          transition: drag.active && !leaving ? "none" : "transform 280ms ease-out",
                          cursor: drag.active ? "grabbing" : "grab",
                          touchAction: "none",
                          zIndex: 2,
                        }
                      : { transform: "translateY(12px) scale(0.95)", zIndex: 1, transition: "transform 280ms ease-out" }
                  }
                  onPointerDown={top ? onPointerDown : undefined}
                  onPointerMove={top ? onPointerMove : undefined}
                  onPointerUp={top ? onPointerUp : undefined}
                  onPointerCancel={top ? onPointerUp : undefined}
                >
                  <JobCard job={job} stamp={top ? { like, nope } : undefined} />
                </div>
              );
            })
            .reverse()}
        </div>
      )}

      <div className="mt-[22px]">
        <ActionButtons onNope={() => decide("left")} onSave={() => decide("left")} onLike={() => decide("right")} />
      </div>
      <TabBar active={0} />
    </div>
  );
}
