import { site } from "../data/site";
import Icon from "./Icon";

export default function BusinessProblems() {
  return (
    <section className="border-y border-slate-100 bg-slate-50/70 py-20 sm:py-24">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <div className="text-sm font-bold uppercase tracking-widest text-brand-600">The problem Bispun solves</div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Stop running the business through scattered tools.
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-slate-600">
              The cost of a disconnected process is not just extra work. It is missed follow-ups, unclear ownership, delayed reporting and poor visibility into revenue.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {site.problems.map((item) => (
              <article key={item.problem} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={item.icon} size={19} />
                </span>
                <h3 className="mt-4 text-[17px] font-bold text-slate-950">{item.problem}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.text}</p>
                <div className="mt-4 border-t border-slate-100 pt-4">
                  <div className="flex gap-2 text-sm font-semibold leading-6 text-slate-800">
                    <Icon name="ArrowRight" size={16} className="mt-1 shrink-0 text-brand-600" />
                    <span>{item.outcome}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
