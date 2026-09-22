import { site } from "../data/site";

export default function HowItWorks() {
  return (
    <section id="how" className="bg-slate-50 py-20 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm font-bold uppercase tracking-widest text-brand-600">How it works</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Move from scattered work to one operating flow.</h2>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {site.how.map((s) => (
            <div key={s.step} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-sm font-extrabold text-white">{s.step}</span>
              <h3 className="mt-5 text-[17px] font-bold text-slate-950">{s.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
