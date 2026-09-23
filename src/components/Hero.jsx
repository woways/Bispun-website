import { site } from "../data/site";
import Icon from "./Icon";

function ProductPreview() {
  return (
    <div className="relative mx-auto w-full max-w-[780px] lg:mx-0">
      <div className="absolute -inset-6 rounded-[36px] bg-brand-100/60 blur-3xl" />

      <div className="relative overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.16)]">
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/90 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />

          <div className="ml-3 h-6 flex-1 rounded-lg border border-slate-200 bg-white" />

          <span className="rounded-md bg-brand-50 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-brand-700">
            Product UI
          </span>
        </div>

        <img
          src="/product-real/dashboard.png"
          alt="Bispun CRM dashboard interface"
          className="block h-auto w-full"
          loading="eager"
        />
      </div>
    </div>
  );
}

export default function Hero() {
  const { hero } = site;

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <style>{`
        @media (min-width: 1024px) {
          .hero-product-position {
            padding-top: clamp(3.75rem, 8vh, 5.75rem);
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-brand-50 via-white to-white" />
      <div className="pointer-events-none absolute -left-32 top-8 h-72 w-72 rounded-full bg-brand-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-brand-100/70 blur-3xl" />

      <div className="container-x relative py-12 sm:py-14 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-12 xl:gap-16">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {hero.badge}
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[56px] xl:text-[60px]">
              {hero.title}{" "}
              <span className="bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
                {hero.titleHighlight}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg lg:mx-0">
              {hero.subtitle}
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <a
                href={hero.primaryCta.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 sm:w-auto"
              >
                {hero.primaryCta.label}
                <Icon name="ArrowRight" size={16} />
              </a>

              <a
                href={hero.secondaryCta.href}
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700 sm:w-auto"
              >
                {hero.secondaryCta.label}
              </a>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 lg:mx-0">
              {hero.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-slate-200/80 bg-white/70 px-3 py-3 text-center shadow-sm lg:text-left"
                >
                  <div className="text-sm font-extrabold text-slate-900 sm:text-base">
                    {s.value}
                  </div>

                  <div className="mt-1 text-[10px] font-medium leading-4 text-slate-500 sm:text-[11px]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-product-position flex min-w-0 justify-center lg:justify-end">
            <ProductPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
