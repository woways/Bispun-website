import { site } from "../data/site";

export default function LogoCloud() {
  return (
    <section className="border-b border-slate-100 bg-white py-10">
      <div className="container-x">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
          Used by teams that care about growth
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {site.logos.map((name) => (
            <span
              key={name}
              className="text-lg font-extrabold tracking-tight text-slate-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
