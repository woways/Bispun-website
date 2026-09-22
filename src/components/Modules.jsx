import { site } from "../data/site";
import Icon from "./Icon";

export default function Modules() {
  return (
    <section id="modules" className="bg-slate-50 py-20 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <div className="text-sm font-bold uppercase tracking-widest text-brand-600">Core platform</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            The workflows your team uses every day, connected.
          </h2>
          <p className="mt-4 leading-7 text-slate-600">
            Each module solves a specific operational problem while keeping the information connected for management.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.modules.map((m) => (
            <div
              key={m.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-sm shadow-brand-600/15 transition group-hover:scale-105">
                  <Icon name={m.icon} size={18} />
                </span>
                <h3 className="text-[16px] font-bold text-slate-950">{m.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
