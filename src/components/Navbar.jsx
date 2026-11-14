import { useState } from "react";
import { site } from "../data/site";
import { authHref } from "../lib/url";
import Icon from "./Icon";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { brand, nav, actions } = site;
  const onHome = window.location.pathname === "/";
  const homeLink = (href) => (onHome ? href : `/${href}`);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
      <nav className="container-x flex h-16 items-center justify-between gap-6">
        <a href="/" className="flex shrink-0 items-center" aria-label={`${brand.name} home`}>
          <img
            src="/brand/bispun-logo.png"
            alt={brand.name}
            className="h-10 w-auto object-contain sm:h-11"
          />
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
            href={authHref(actions.signup.href)}
            className="inline-flex h-9 items-center rounded-lg px-2 text-[13px] font-semibold text-brand-700 underline-offset-4 transition hover:text-brand-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            {actions.signup.label}
          </a>
          <a
            href={authHref(actions.login.href)}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-slate-300 bg-white px-4 text-[13px] font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            {actions.login.label}
          </a>
          <a
            href={homeLink(actions.demo.href)}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-brand-600 px-4 text-[13px] font-semibold text-white shadow-sm shadow-brand-600/20 transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            {actions.demo.label}
            <Icon name="ArrowRight" size={14} aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <Icon name={open ? "X" : "Menu"} size={22} aria-hidden="true" />
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 bg-white md:hidden">
          <div className="container-x flex flex-col gap-1 py-3">
            {nav.map((n) => (
              <a
                key={n.href}
                href={homeLink(n.href)}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                {n.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-slate-100 pt-3">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href={authHref(actions.login.href)}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                >
                  {actions.login.label}
                </a>
                <a
                  href={homeLink(actions.demo.href)}
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                >
                  {actions.demo.label}
                </a>
              </div>
              <a
                href={authHref(actions.signup.href)}
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-brand-700 underline-offset-4 hover:bg-brand-50 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
              >
                New to Bispun? Create an account
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
