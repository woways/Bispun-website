import { site } from "../data/site";
import Icon from "./Icon";

export default function Journey() {
  return (
    <section id="workflow" className="overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
          <div>
            <div className="text-sm font-bold uppercase tracking-widest text-brand-300">Lead-to-revenue visibility</div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Follow the opportunity until it becomes business.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Most CRMs stop at storing a lead. Bispun connects the operational stages that matter after the enquiry so management can see where opportunities are moving, slowing down or converting.
          </p>
        </div>

        <div className="mt-12 grid gap-3 lg:grid-cols-5">
          {site.journey.map((item, index) => (
            <div key={item.step} className="relative rounded-2xl border border-white/10 bg-white/[0.055] p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-inset ring-brand-300/15">
                  <Icon name={item.icon} size={19} />
                </span>
                <span className="text-[10px] font-bold tracking-[0.18em] text-slate-500">{item.step}</span>
              </div>
              <h3 className="mt-5 text-base font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-[13px] leading-6 text-slate-400">{item.text}</p>
              {index < site.journey.length - 1 && (
                <span className="absolute -right-2 top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-white/15 bg-slate-950 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
