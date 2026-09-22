import { site } from "../data/site";
import Icon from "./Icon";

export default function CTA() {
  const { brand, actions } = site;

  return (
    <section id="book-demo" className="bg-white py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[28px] bg-slate-950 px-6 py-14 text-center text-white sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand-600/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-300">Bring the business into one system</div>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Ready to replace scattered tools with one business control center?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              See how {brand.name} can organize your lead-to-revenue workflow, improve management visibility and give your team clearer ownership.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={actions.demo.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-500 sm:w-auto"
              >
                {actions.demo.label}<Icon name="ArrowRight" size={16} />
              </a>
              <a
                href={actions.signup.href}
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                {actions.signup.label}
              </a>
            </div>
            <p className="mt-4 text-[11px] text-slate-500">Choose a plan or book a guided demo to see how Bispun fits your workflow.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
