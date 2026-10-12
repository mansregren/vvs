"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ACCENT, ACCENT_DEEP, ActionButtons, AppHeader, Avatar, CompanyLogo, INK, JOBS, JobCard, MUTED, StatusBar, TabBar, USER_IMG, SWIPE_BG, CARD_BG, type Job } from "./screens";

const THRESHOLD = 100;

export default function AppSwipe() {
  const [index, setIndex] = useState(0);
  const [applied, setApplied] = useState(0);
  const [drag, setDrag] = useState({ x: 0, y: 0, active: false });
  const [leaving, setLeaving] = useState<null | "left" | "right">(null);
  const [swipes, setSwipes] = useState(0);
  const [match, setMatch] = useState<Job | null>(null);
  const matched = useRef(false);
  const start = useRef({ x: 0, y: 0 });
  const done = index >= JOBS.length;

  const decide = useCallback(
    (dir: "left" | "right") => {
      if (leaving || match || index >= JOBS.length) return;
      setLeaving(dir);
      const job = JOBS[index];
      const count = swipes + 1;
      setSwipes(count);
      window.setTimeout(() => {
        if (dir === "right") setApplied((n) => n + 1);
        // Första högerswajpen från och med andra swajpen blir en match.
        if (dir === "right" && count >= 2 && !matched.current) {
          matched.current = true;
          setMatch(job);
        }
        setIndex((i) => i + 1);
        setLeaving(null);
        setDrag({ x: 0, y: 0, active: false });
      }, 280);
    },
    [leaving, index, match, swipes],
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
    <div className="relative h-full w-full select-none" style={{ background: SWIPE_BG, color: INK }}>
      <StatusBar light />
      <AppHeader light />

      {done ? (
        <div className="mx-[16px] flex h-[560px] flex-col items-center justify-center rounded-[26px] px-[28px] text-center shadow-[0_22px_44px_-18px_rgba(11,37,64,0.55)]" style={{ background: CARD_BG }}>
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
              setSwipes(0);
              matched.current = false;
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

      {match && <MatchOverlay job={match} onClose={() => setMatch(null)} />}
    </div>
  );
}

function MatchOverlay({ job, onClose }: { job: Job; onClose: () => void }) {
  return (
    <div
      className="absolute inset-0 z-30 flex flex-col items-center px-[28px] text-center text-white"
      style={{
        background: `linear-gradient(170deg,rgba(127,208,251,0.97) 0%,rgba(42,168,242,0.97) 45%,rgba(11,132,216,0.98) 100%)`,
        animation: "wc-fade 320ms ease-out both",
      }}
    >
      <style>{`
        @keyframes wc-fade{from{opacity:0}to{opacity:1}}
        @keyframes wc-pop{0%{opacity:0;transform:scale(.6)}70%{transform:scale(1.06)}100%{opacity:1;transform:scale(1)}}
        @keyframes wc-left{from{opacity:0;transform:translateX(-90px) rotate(-6deg)}to{opacity:1;transform:translateX(0) rotate(-6deg)}}
        @keyframes wc-right{from{opacity:0;transform:translateX(90px) rotate(6deg)}to{opacity:1;transform:translateX(0) rotate(6deg)}}
        @keyframes wc-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
      <div className="h-[54px]" />
      <p className="mt-[60px] text-[14px] font-semibold uppercase tracking-[0.22em] text-white/85" style={{ animation: "wc-up 400ms 150ms ease-out both" }}>
        Ni swajpade båda höger
      </p>
      <h3 className="mt-[8px] text-[52px] font-extrabold leading-none tracking-[-0.04em]" style={{ animation: "wc-pop 500ms 200ms ease-out both" }}>
        It&apos;s a match!
      </h3>
      <div className="mt-[40px] flex items-center">
        <span style={{ animation: "wc-left 520ms 300ms cubic-bezier(.2,.8,.2,1) both" }}>
          <Avatar src={USER_IMG} size={116} ring={4} />
        </span>
        <span className="relative -ml-[22px]" style={{ animation: "wc-right 520ms 300ms cubic-bezier(.2,.8,.2,1) both" }}>
          <Avatar src={job.recruiter.img} size={116} ring={4} />
          <span className="absolute -bottom-[4px] -right-[4px] rounded-[14px] bg-white p-[3px]">
            <CompanyLogo job={job} size={38} radius={11} />
          </span>
        </span>
      </div>
      <p className="mt-[26px] text-[17px] leading-snug text-white/95" style={{ animation: "wc-up 400ms 500ms ease-out both" }}>
        <strong className="font-semibold">{job.recruiter.name}</strong> på {job.company} vill
        <br />
        gärna prata om <strong className="font-semibold">{job.title.toLowerCase()}</strong>.
      </p>
      <div className="absolute inset-x-[24px] bottom-[40px] space-y-[10px]" style={{ animation: "wc-up 400ms 650ms ease-out both" }}>
        <button
          type="button"
          onClick={onClose}
          className="h-[54px] w-full rounded-[16px] bg-white text-[17px] font-semibold"
          style={{ color: ACCENT_DEEP }}
        >
          Skicka ett meddelande
        </button>
        <button type="button" onClick={onClose} className="h-[50px] w-full rounded-[16px] border-2 border-white/70 text-[16px] font-semibold">
          Fortsätt swajpa
        </button>
      </div>
    </div>
  );
}
