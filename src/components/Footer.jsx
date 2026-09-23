import { site } from "../data/site";

export default function Footer() {
  const { brand, footer } = site;

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-extrabold text-white">
                BI
              </span>
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                {brand.name}
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm text-slate-500">
              {brand.tagline}. Run your business from one clear workspace.
            </p>
            <div className="mt-4 space-y-1 text-sm text-slate-500">
              <a className="block transition hover:text-brand-700" href="mailto:info@bispun.com">
                info@bispun.com
              </a>
              <a className="block transition hover:text-brand-700" href="tel:+919390188553">
                +91 93901 88553
              </a>
            </div>
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.title}>
              <div className="text-sm font-bold text-slate-900">{col.title}</div>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-slate-500 transition hover:text-brand-700"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-slate-200 pt-6 sm:flex-row">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <p className="mt-3 text-[10px] text-slate-400">
  Illustrations by{" "}
  <a
    href="https://storyset.com/"
    target="_blank"
    rel="noreferrer"
    className="font-medium text-slate-500 hover:text-slate-700"
  >
    Storyset
  </a>
  .
</p>
        </div>
      </div>
    </footer>
  );
}
