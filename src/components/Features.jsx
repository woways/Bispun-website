import { site } from "../data/site";
import Icon from "./Icon";

export default function Features() {
  return (
    <section id="why-bispun" className="bg-white py-20 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-sm font-bold uppercase tracking-widest text-brand-600">Why choose Bispun</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Built around business outcomes, not just data entry.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Bispun is designed to give management more control, reduce missed opportunities and help teams move work forward with less manual coordination.
          </p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {site.features.map((f, index) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,.03)] transition hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_14px_34px_rgba(15,23,42,.07)]"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                  <Icon name={f.icon} size={20} />
                </span>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">0{index + 1}</div>
                  <h3 className="mt-1 text-[17px] font-bold text-slate-950">{f.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{f.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
