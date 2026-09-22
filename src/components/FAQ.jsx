import { useState } from "react";
import { site } from "../data/site";
import Icon from "./Icon";

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-slate-50 py-20 sm:py-24">
      <div className="container-x max-w-4xl">
        <div className="text-center">
          <div className="text-sm font-bold uppercase tracking-widest text-brand-600">FAQ</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">The questions buyers usually ask first.</h2>
        </div>

        <div className="mt-10 grid gap-3">
          {site.faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-bold text-slate-950">{item.q}</span>
                  <Icon name="ArrowRight" size={16} className={`shrink-0 text-brand-600 transition-transform ${isOpen ? "rotate-90" : ""}`} />
                </button>
                {isOpen && <div className="border-t border-slate-100 px-5 py-4 text-sm leading-7 text-slate-600">{item.a}</div>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
