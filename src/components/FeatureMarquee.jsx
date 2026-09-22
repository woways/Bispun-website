import { site } from "../data/site";
import Icon from "./Icon";

// An auto-scrolling strip of feature cards. It scrolls left forever and pauses
// on hover. The list is duplicated once so the loop is seamless.
export default function FeatureMarquee() {
  const items = site.modules; // reuse the modules list; edit it in site.js

  // Duplicate the list so the strip can scroll -50% and loop with no gap.
  const loop = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-slate-100 bg-slate-50 py-14">
      <div className="container-x mb-8 text-center">
        <div className="text-sm font-bold uppercase tracking-widest text-brand-600">
          Everything included
        </div>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Powerful features, one workspace
        </h2>
      </div>

      {/* marquee-wrap enables pause-on-hover; edge fade masks the ends */}
      <div className="marquee-wrap relative">
        {/* soft fade on left & right edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent" />

        <div className="flex w-max animate-marquee gap-5">
          {loop.map((m, i) => (
            <div
              key={i}
              className="flex w-72 flex-shrink-0 flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Icon name={m.icon} size={20} />
              </span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
