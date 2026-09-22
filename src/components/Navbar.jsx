import { useState } from "react";
import { site } from "../data/site";
import Icon from "./Icon";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { brand, nav, actions } = site;
  const onHome = window.location.pathname === "/";
  const homeLink = (href) => (onHome ? href : `/${href}`);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <nav className="container-x flex h-16 items-center justify-between gap-6">
        <a href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-extrabold text-white shadow-sm shadow-brand-600/20">
            BI
          </span>
          <span className="text-lg font-extrabold tracking-tight text-slate-950">
            {brand.name}<span className="text-brand-600">.</span>
          </span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={homeLink(n.href)}
              className="text-[13px] font-semibold text-slate-600 transition hover:text-brand-700"
            >
              {n.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={actions.signup.href}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-[13px] font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700"
          >
            {actions.signup.label}
          </a>
          <a
            href={homeLink(actions.demo.href)}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 text-[13px] font-semibold text-white shadow-sm shadow-brand-600/20 transition hover:bg-brand-700"
          >
            {actions.demo.label}
            <Icon name="ArrowRight" size={14} />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 md:hidden"
          aria-label="Menu"
        >
          <Icon name={open ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {nav.map((n) => (
              <a
                key={n.href}
                href={homeLink(n.href)}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {n.label}
              </a>
            ))}
            <div className="mt-2 grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
              <a
                href={actions.signup.href}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700"
              >
                {actions.signup.label}
              </a>
              <a
                href={homeLink(actions.demo.href)}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white"
              >
                {actions.demo.label}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
