"use client";

import { useEffect, useRef, useState } from "react";

// Antaganden (visas på sidan): heltid 40 h/vecka × 45 veckor = 1 800 h/år, arbetsliv 22–65 år,
// sömn 8 h/dygn. Övrigt = resten av dygnets timmar under samma period.
const HOURS_PER_YEAR = 1800;
const START = 22;
const RETIRE = 65;
const YEARS = RETIRE - START;
const TOTAL = YEARS * 8760;
const WORK = YEARS * HOURS_PER_YEAR;
const SLEEP = YEARS * 365 * 8;
const OTHER = TOTAL - WORK - SLEEP;

type Key = "work" | "sleep" | "other";
const CATS: { key: Key; label: string; hours: number; color: string }[] = [
  { key: "work", label: "Arbete", hours: WORK, color: "#1e9be6" },
  { key: "sleep", label: "Sömn", hours: SLEEP, color: "#5a4fcf" },
  { key: "other", label: "Allt annat", hours: OTHER, color: "#d6e4f0" },
];

// 100 rutor, var och en = 1 % av alla timmar mellan 22 och 65 år.
const counts = (() => {
  const raw = CATS.map((c) => (c.hours / TOTAL) * 100);
  const floor = raw.map(Math.floor);
  let rest = 100 - floor.reduce((a, b) => a + b, 0);
  const order = raw.map((r, i) => [r - floor[i], i] as const).sort((a, b) => b[0] - a[0]);
  for (const [, i] of order) if (rest-- > 0) floor[i]++;
  return floor;
})();
const CELLS: Key[] = CATS.flatMap((c, i) => Array<Key>(counts[i]).fill(c.key));

const nf = new Intl.NumberFormat("sv-SE");
const nf1 = new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const pct = (h: number) => Math.round((h / TOTAL) * 100);

const FACTS = [
  { value: nf.format(Math.round(WORK / 24)), unit: "dygn", label: "utan en enda paus" },
  { value: nf.format(Math.round(WORK / 2)), unit: "st", label: "långfilmer à 2 timmar" },
  { value: nf.format(Math.round(WORK / 4.5)), unit: "st", label: "tågresor Malmö–Stockholm" },
];

export default function LifeHours() {
  const [active, setActive] = useState<Key | null>(null);
  const [shown, setShown] = useState(false);
  const [age, setAge] = useState(25);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const left = HOURS_PER_YEAR * Math.max(0, RETIRE - Math.max(age, START));
  const activeCat = CATS.find((c) => c.key === active);

  return (
    <section className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0b84d8]">Total arbetstid under livet</p>
        <h2 className="mt-3 text-[64px] font-extrabold leading-[0.95] tracking-[-0.05em] tabular-nums sm:text-[104px]">
          {nf.format(WORK)}
          <span className="ml-2 text-[28px] font-semibold tracking-[-0.02em] text-[#5b7590] sm:text-[40px]">timmar</span>
        </h2>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[#4a6680] sm:text-lg">
          Så mycket av ditt liv lägger du på jobbet. Det är {nf1.format(WORK / 8760)} år dygnet runt —
          lite för länge för ett jobb du inte gillar.
        </p>

        <div ref={ref} className="mt-10 grid gap-8 rounded-[32px] bg-white p-6 shadow-[0_1px_3px_rgba(11,37,64,0.06)] sm:p-10 md:grid-cols-[minmax(0,420px)_1fr] md:gap-14">
          {/* waffle */}
          <figure>
            <figcaption className="mb-4 text-[15px] font-semibold">
              Ditt vuxna liv, 22–65 år
              <span className="block text-[13px] font-normal text-[#5b7590]">En ruta = 1 % av alla timmar</span>
            </figcaption>
            <div className="relative">
              <div
                className="grid grid-cols-10 gap-[3px] sm:gap-1"
                role="img"
                aria-label={CATS.map((c) => `${c.label} ${pct(c.hours)} procent`).join(", ")}
                onMouseLeave={() => setActive(null)}
              >
                {CELLS.map((k, i) => {
                  const c = CATS.find((x) => x.key === k)!;
                  const dim = active && active !== k;
                  return (
                    <span
                      key={i}
                      onMouseEnter={() => setActive(k)}
                      className="aspect-square rounded-[4px] transition-[opacity,transform] duration-500 ease-out"
                      style={{
                        background: c.color,
                        opacity: !shown ? 0 : dim ? 0.18 : 1,
                        transform: shown ? "scale(1)" : "scale(0.4)",
                        transitionDelay: shown && active === null ? `${i * 9}ms` : "0ms",
                      }}
                    />
                  );
                })}
              </div>
              {activeCat && (
                <div className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-xl bg-[#0b2540] px-3 py-2 text-[13px] text-white shadow-lg">
                  <span className="font-semibold">{activeCat.label}</span> · {nf.format(activeCat.hours)} h · {pct(activeCat.hours)} %
                </div>
              )}
            </div>
          </figure>

          {/* legend + facts */}
          <div className="flex flex-col">
            <ul className="space-y-1">
              {CATS.map((c) => (
                <li key={c.key}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(c.key)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(c.key)}
                    onBlur={() => setActive(null)}
                    onClick={() => setActive(active === c.key ? null : c.key)}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-[#f3f9fe]"
                    style={{ opacity: active && active !== c.key ? 0.45 : 1 }}
                  >
                    <span className="h-4 w-4 shrink-0 rounded-[4px]" style={{ background: c.color }} />
                    <span className="flex-1 text-[16px] font-semibold">{c.label}</span>
                    <span className="text-[15px] tabular-nums text-[#4a6680]">{nf.format(c.hours)} h</span>
                    <span className="w-12 text-right text-[18px] font-bold tabular-nums">{pct(c.hours)} %</span>
                  </button>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#5b7590]">
              {nf.format(WORK)} timmar räcker till
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-3 md:grid-cols-1 lg:grid-cols-3">
              {FACTS.map((f) => (
                <div key={f.label} className="rounded-2xl bg-[#f3f9fe] p-4">
                  <p className="text-[26px] font-bold leading-none tracking-[-0.03em] tabular-nums">
                    {f.value} <span className="text-[15px] font-semibold text-[#5b7590]">{f.unit}</span>
                  </p>
                  <p className="mt-1.5 text-[13.5px] leading-snug text-[#4a6680]">{f.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#0b2540]/8 p-4">
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="wc-age" className="text-[14px] font-medium text-[#4a6680]">
                  Din ålder: <span className="font-semibold text-[#0b2540]">{age} år</span>
                </label>
                <span className="text-[14px] text-[#4a6680]">
                  kvar: <span className="text-[18px] font-bold tabular-nums text-[#0b2540]">{nf.format(left)} h</span>
                </span>
              </div>
              <input
                id="wc-age"
                type="range"
                min={16}
                max={64}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="mt-4 block h-2 w-full cursor-pointer appearance-none rounded-full [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-[#1e9be6] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-[#1e9be6] [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(11,37,64,0.35)]"
                style={{ background: `linear-gradient(to right,#1e9be6 ${((age - 16) / 48) * 100}%,#e1eef8 ${((age - 16) / 48) * 100}%)` }}
              />
            </div>
          </div>
        </div>

        <div className="mt-14 text-center">
          <p className="text-[34px] font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-6xl">
            Your time is precious.
            <br />
            <span className="text-[#1e9be6]">Your work should be too.</span>
          </p>
          <p className="mt-4 text-[17px] font-medium text-[#4a6680] sm:text-lg">
            You spend your life working. Make it one you love.
          </p>
        </div>
        <p className="mx-auto mt-12 max-w-2xl text-center text-[12.5px] leading-relaxed text-[#7690a8]">
          Räknat på heltid: 40 timmar i veckan, 45 arbetsveckor per år (semester och helgdagar borträknade), från 22
          till 65 år. Sömn 8 timmar per dygn. Tågresa Malmö–Stockholm ca 4,5 timmar.
        </p>
      </div>
    </section>
  );
}
