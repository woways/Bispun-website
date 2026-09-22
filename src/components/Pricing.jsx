import { site } from "../data/site";
import Icon from "./Icon";

export default function Pricing() {
  const { pricing } = site;

  return (
    <section id="pricing" className="bg-white py-20 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm font-bold uppercase tracking-widest text-brand-600">Pricing</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Choose the right annual plan for your business.</h2>
          <p className="mt-4 text-slate-600">{pricing.note}</p>
          <div className="mt-5 inline-flex rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-bold text-brand-700">Annual billing</div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricing.plans.map((p) => (
            <div
              key={p.name}
              className={`relative flex flex-col overflow-hidden rounded-[22px] border p-7 transition ${
                p.highlighted
                  ? "border-brand-300 bg-slate-950 text-white shadow-[0_18px_50px_rgba(49,46,129,.18)]"
                  : "border-slate-200 bg-white text-slate-950 shadow-sm hover:-translate-y-0.5 hover:shadow-lg"
              }`}
            >
              {p.highlighted && (
                <span className="absolute right-5 top-5 rounded-full bg-brand-600 px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-white">Most popular</span>
              )}
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p className={`mt-2 max-w-[90%] text-sm leading-6 ${p.highlighted ? "text-slate-300" : "text-slate-500"}`}>{p.blurb}</p>
              <div className="mt-6 flex items-end gap-1.5">
                <span className="text-4xl font-extrabold tracking-tight">{p.price}</span>
                <span className={`pb-1 text-sm ${p.highlighted ? "text-slate-400" : "text-slate-500"}`}>{p.period}</span>
              </div>

              <ul className="mt-7 flex-1 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Icon name="Check" size={17} className={`mt-0.5 shrink-0 ${p.highlighted ? "text-brand-300" : "text-brand-600"}`} />
                    <span className={p.highlighted ? "text-slate-200" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={site.actions.signup.href}
                className={`mt-7 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition ${
                  p.highlighted
                    ? "bg-brand-600 text-white hover:bg-brand-500"
                    : "border border-slate-300 text-slate-800 hover:border-brand-400 hover:text-brand-700"
                }`}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
