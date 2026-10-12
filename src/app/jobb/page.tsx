import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import Swipe from "./Swipe";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swajpa höger på din framtid",
  description:
    "Swajpa höger för att bli jurist. Swajpa höger på ekonomi. Hitta yrket du matchar med — som Tinder, fast för jobb.",
  robots: { index: false, follow: false },
};

export const viewport = {
  themeColor: "#ff3d7f",
};

export default function JobbPage() {
  return (
    <main
      className={`${display.className} relative flex-1 overflow-hidden text-white`}
      style={{
        background:
          "radial-gradient(circle at 15% 10%, #ffd23f 0, transparent 38%), radial-gradient(circle at 90% 20%, #3ddcff 0, transparent 40%), radial-gradient(circle at 80% 95%, #8a5cff 0, transparent 45%), radial-gradient(circle at 5% 90%, #00e0a4 0, transparent 40%), #ff3d7f",
      }}
    >
      <div className="mx-auto flex min-h-[100dvh] max-w-5xl flex-col items-center px-4 pb-10 pt-8 md:flex-row md:items-center md:gap-14 md:pt-0">
        <header className="w-full max-w-md text-center md:text-left">
          <p className="inline-block rounded-full bg-white/25 px-3 py-1 text-sm font-medium backdrop-blur">
            Som Tinder — fast för jobb
          </p>
          <h1 className="mt-4 text-5xl font-extrabold leading-[0.95] tracking-tight drop-shadow-sm md:text-7xl">
            Swajpa höger på din framtid.
          </h1>
          <p className="mt-4 text-lg font-medium text-white/90 md:text-xl">
            Swajpa höger för att bli jurist. Swajpa höger på ekonomi. Vänster
            på allt du inte orkar. Se vad du matchar med.
          </p>
          <p className="mt-3 hidden text-sm text-white/75 md:block">
            Dra kortet — eller använd piltangenterna.
          </p>
        </header>

        <Swipe />
      </div>
    </main>
  );
}
