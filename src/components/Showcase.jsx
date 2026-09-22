import { site } from "../data/site";
import Mockup from "./Mockup";

export default function Showcase() {
  const { showcase } = site;

  return (
    <section id="platform" className="bg-white py-20 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-sm font-bold uppercase tracking-widest text-brand-600">{showcase.eyebrow}</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">{showcase.title}</h2>
          <p className="mt-4 leading-7 text-slate-600">{showcase.subtitle}</p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-x-8 gap-y-10 lg:grid-cols-2">
          {showcase.items.map((m, index) => (
            <article key={m.label} className="group min-w-0">
              <div className="relative">
                <div className="absolute -inset-2 rounded-[24px] bg-brand-50 opacity-0 blur-xl transition group-hover:opacity-100" />
                <Mockup src={m.src} alt={m.alt} label={m.label} className="relative transition duration-300 group-hover:-translate-y-1 group-hover:shadow-2xl" />
              </div>
              <div className="mt-4 flex gap-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-[11px] font-extrabold text-brand-700">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-brand-600">{m.eyebrow}</div>
                  <h3 className="mt-1 text-[17px] font-bold text-slate-950">{m.label}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">{m.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
