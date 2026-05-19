"use client";
import { useState } from "react";

type Contact = { name: string; phone: string; role?: string };

export function ContactsEditor({
  name,
  initial,
}: {
  name: string;
  initial: Contact[];
}) {
  const [rows, setRows] = useState<Contact[]>(initial ?? []);

  function update(i: number, patch: Partial<Contact>) {
    setRows((rs) => rs.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  }
  function remove(i: number) {
    setRows((rs) => rs.filter((_, idx) => idx !== i));
  }
  function add() {
    setRows((rs) => [...rs, { name: "", phone: "", role: "" }]);
  }

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(rows)} />
      {rows.length === 0 && (
        <p className="text-sm text-[var(--muted)]">
          Inga extra kontakter än. Lägg till nedan om ni vill visa flera nummer
          (t.ex. olika tekniker).
        </p>
      )}
      <ul className="space-y-3">
        {rows.map((r, i) => (
          <li
            key={i}
            className="card grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end"
          >
            <label className="block">
              <span className="text-xs font-medium block mb-1 text-[var(--muted)]">
                Namn
              </span>
              <input
                type="text"
                value={r.name}
                onChange={(e) => update(i, { name: e.target.value })}
                className="input"
                placeholder="t.ex. Mikael Andersson"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium block mb-1 text-[var(--muted)]">
                Roll (valfritt)
              </span>
              <input
                type="text"
                value={r.role ?? ""}
                onChange={(e) => update(i, { role: e.target.value })}
                className="input"
                placeholder="t.ex. Tekniker / Servicechef"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium block mb-1 text-[var(--muted)]">
                Telefon
              </span>
              <input
                type="tel"
                value={r.phone}
                onChange={(e) => update(i, { phone: e.target.value })}
                className="input"
                placeholder="+46 70 000 00 00"
              />
            </label>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-sm text-red-600 hover:underline underline-offset-4 self-center sm:self-end pb-3"
            >
              Ta bort
            </button>
          </li>
        ))}
      </ul>
      <button type="button" onClick={add} className="btn-ghost btn-sm">
        + Lägg till kontakt
      </button>
    </div>
  );
}
