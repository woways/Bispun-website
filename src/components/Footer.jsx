import { site } from "../data/site";

export default function Footer() {
  const { brand, footer } = site;
  const onHome = window.location.pathname === "/";
  const resolveLink = (href) => (href.startsWith("#") && !onHome ? `/${href}` : href);

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-extrabold text-white">BI</span>
              <span className="text-lg font-extrabold tracking-tight text-slate-950">{brand.name}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">One business control center for leads, admissions, teams, revenue and management visibility.</p>
            <a href={`mailto:${brand.email}`} className="mt-4 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">{brand.email}</a>
          </div>

          {footer.columns.map((col) => (
            <div key={col.title}>
              <div className="text-sm font-bold text-slate-950">{col.title}</div>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={resolveLink(l.href)} className="text-sm text-slate-500 transition hover:text-brand-700">{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-slate-500">
            <a href="/privacy" className="transition hover:text-brand-700">Privacy Policy</a>
            <a href="/terms" className="transition hover:text-brand-700">Terms & Conditions</a>
            <a href="/contact" className="transition hover:text-brand-700">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
