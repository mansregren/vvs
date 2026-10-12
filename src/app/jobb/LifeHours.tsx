// Heltid 40 h/vecka × 45 veckor = 1 800 h/år, 22–65 år = 77 400 h ≈ 8,8 år dygnet runt.
export default function LifeHours() {
  return (
    <section className="px-4 pb-4 pt-12 text-center sm:px-6 md:pb-8 md:pt-16">
      <div className="mx-auto max-w-3xl">
        <p className="text-[15px] font-medium text-[#4a6680]">Under ditt liv jobbar du ungefär</p>
        <p className="mt-2 bg-gradient-to-r from-[#1e9be6] to-[#5a4fcf] bg-clip-text text-[72px] font-extrabold leading-none tracking-[-0.05em] text-transparent tabular-nums sm:text-[120px]">
          77 400 h
        </p>
        <p className="mt-3 text-[17px] text-[#4a6680]">Det är 8,8 år dygnet runt.</p>
        <p className="mt-10 text-[30px] font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-5xl">
          Your time is precious.
          <br />
          <span className="text-[#1e9be6]">Your work should be too.</span>
        </p>
      </div>
    </section>
  );
}
