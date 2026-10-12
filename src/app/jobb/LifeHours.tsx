"use client";

import { useState } from "react";

// Antaganden (visas på sidan): 40 h/vecka × 45 veckor = 1 800 h/år, arbetsliv 22–65 år.
const HOURS_PER_YEAR = 1800;
const START = 22;
const RETIRE = 65;
const LIFETIME = HOURS_PER_YEAR * (RETIRE - START);

const nf = new Intl.NumberFormat("sv-SE");
const nf1 = new Intl.NumberFormat("sv-SE", { maximumFractionDigits: 1, minimumFractionDigits: 1 });

export default function LifeHours() {
  const [age, setAge] = useState(25);
  const workedYears = Math.max(0, Math.min(age, RETIRE) - START);
  const left = HOURS_PER_YEAR * Math.max(0, RETIRE - Math.max(age, START));
  const share = workedYears / (RETIRE - START);

  const tiles = [
    { value: nf1.format(left / 8760), unit: "år", label: "dygnet runt, utan sömn" },
    { value: nf.format(Math.round(left / 4.5)), unit: "st", label: "tågresor Malmö–Stockholm" },
    { value: nf.format(Math.round(left / 8)), unit: "st", label: "hela arbetsdagar kvar" },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#0b84d8]">Livstid på jobbet</p>
        <h2 className="mt-3 max-w-3xl text-[34px] font-semibold leading-[1.08] tracking-[-0.03em] sm:text-5xl">
          Du jobbar ungefär{" "}
          <span className="bg-gradient-to-r from-[#2aa8f2] to-[#6f7dff] bg-clip-text text-transparent">
            {nf.format(LIFETIME)} timmar
          </span>{" "}
          i ditt liv.
        </h2>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[#4a6680]">
          Det är {nf1.format(LIFETIME / 8760)} år dygnet runt. Lite för länge för ett jobb du inte gillar.
        </p>

        <div className="mt-10 rounded-[32px] bg-white p-6 shadow-[0_1px_3px_rgba(11,37,64,0.06)] sm:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <label htmlFor="wc-age" className="text-[15px] font-medium text-[#4a6680]">
                Hur gammal är du? <span className="font-semibold text-[#0b2540]">{age} år</span>
              </label>
              <input
                id="wc-age"
                type="range"
                min={16}
                max={64}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="mt-3 block w-full accent-[#2aa8f2] md:w-80"
              />
            </div>
            <div className="md:text-right">
              <p className="text-[15px] font-medium text-[#4a6680]">Timmar kvar på jobbet</p>
              <p className="text-[56px] font-extrabold leading-none tracking-[-0.04em] tabular-nums text-[#0b2540] sm:text-7xl">
                {nf.format(left)}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <div className="h-3 overflow-hidden rounded-full bg-[#e6f4fe]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2aa8f2] to-[#6f7dff] transition-[width] duration-300"
                style={{ width: `${share * 100}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-[13px] text-[#5b7590]">
              <span>{START} år</span>
              <span>{Math.round(share * 100)} % av arbetslivet avklarat</span>
              <span>{RETIRE} år</span>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {tiles.map((t) => (
              <div key={t.label} className="rounded-2xl bg-[#f3f9fe] p-5">
                <p className="text-[32px] font-bold leading-none tracking-[-0.03em] tabular-nums">
                  {t.value} <span className="text-[18px] font-semibold text-[#5b7590]">{t.unit}</span>
                </p>
                <p className="mt-2 text-[14px] text-[#4a6680]">{t.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-[22px] font-semibold tracking-[-0.02em]">
            Gör dem till timmar du gillar. <span className="text-[#2aa8f2]">Love your job.</span>
          </p>
          <p className="mt-3 text-[12.5px] leading-relaxed text-[#7690a8]">
            Räknat på heltid: 40 timmar i veckan, 45 arbetsveckor per år (semester och helgdagar borträknade),
            från 22 till 65 år. Tågresa Malmö–Stockholm ca 4,5 timmar.
          </p>
        </div>
      </div>
    </section>
  );
}
