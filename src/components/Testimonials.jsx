import { site } from "../data/site";
import Icon from "./Icon";

export default function Testimonials() {
  return (
    <section className="bg-slate-50 py-20 sm:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-sm font-bold uppercase tracking-widest text-brand-600">
            Loved by teams
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            What people say
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {site.testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Icon key={i} name="Star" size={16} fill="currentColor" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {t.name.split(" ").map((p) => p[0]).join("")}
                </span>
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
