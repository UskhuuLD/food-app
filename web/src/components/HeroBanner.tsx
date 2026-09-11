export function HeroBanner() {
  return (
    <div className="relative mx-4 mt-1 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-orange-400 px-5 py-6 shadow-card">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-6 -top-10 h-40 w-40 rounded-full bg-white/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-10 right-10 h-24 w-24 rounded-full bg-black/10"
      />
      <p className="text-xs font-semibold uppercase tracking-wider text-white/80">
        Өнөөдрийн санал
      </p>
      <h1 className="mt-1 max-w-[70%] text-2xl font-extrabold leading-tight text-white">
        TODAY'S OFFER!
      </h1>
      <p className="mt-2 max-w-[75%] text-sm text-white/85">
        Дуртай хоолоо сонгоод захиалаарай — хүргэлт хурдан!
      </p>
      <div className="absolute -right-2 bottom-3 flex h-16 w-16 rotate-6 items-center justify-center rounded-full bg-white text-2xl shadow-lg">
        🍕
      </div>
    </div>
  );
}
