"use client";
import { useState } from "react";

const PALETTE = [
  "#0a4f8f", "#003366", "#0072ce", "#1e7e34", "#0a7c66", "#7c2d12",
  "#b91c1c", "#c2410c", "#a16207", "#365314", "#1f2937", "#000000",
];

export function ColorPicker({
  name,
  initial,
}: {
  name: string;
  initial: string;
}) {
  const [value, setValue] = useState(initial);
  return (
    <div className="space-y-3">
      <span className="text-sm font-medium block">Primärfärg</span>
      <input type="hidden" name={name} value={value} />
      <div className="flex flex-wrap gap-2">
        {PALETTE.map((c) => (
          <button
            type="button"
            key={c}
            onClick={() => setValue(c)}
            aria-label={c}
            className={`w-11 h-11 rounded-xl border border-[var(--border)] transition-transform hover:scale-105 ${
              value === c ? "ring-4 ring-offset-2" : ""
            }`}
            style={{ background: c }}
          />
        ))}
      </div>
      <div className="flex items-center gap-3">
        <div
          className="px-3 py-1.5 rounded-md text-white text-xs font-mono"
          style={{ background: value }}
        >
          {value}
        </div>
        <span className="text-xs text-[var(--muted)]">Eller anpassa:</span>
        <input
          type="color"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-11 h-11 rounded border border-[var(--border)] cursor-pointer"
        />
      </div>
    </div>
  );
}
