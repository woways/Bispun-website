import Icon from "./Icon";

export default function Mockup({ src, alt = "", label = "Product preview", className = "" }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 ${className}`}>
      <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
        <span className="ml-3 h-4 flex-1 rounded bg-white ring-1 ring-slate-100" />
      </div>

      {src ? (
        <img src={src} alt={alt} className="block aspect-video w-full object-cover object-top" loading="lazy" />
      ) : (
        <div className="aspect-[16/10] w-full bg-[#f7f8fb] p-4">
          <div className="flex h-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="w-[24%] bg-slate-950 p-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-[9px] font-black text-white">BI</div>
              <div className="mt-5 space-y-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className={`h-2.5 rounded ${i === 0 ? "bg-brand-500" : "bg-slate-800"}`} />
                ))}
              </div>
            </div>
            <div className="flex-1 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-2.5 w-20 rounded bg-slate-200" />
                  <div className="mt-2 h-3.5 w-32 rounded bg-slate-800" />
                </div>
                <div className="h-7 w-16 rounded-lg bg-brand-50" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="rounded-lg border border-slate-100 p-2">
                    <div className="h-2 w-10 rounded bg-slate-200" />
                    <div className="mt-2 h-4 w-12 rounded bg-slate-800" />
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-lg border border-slate-100 p-3">
                <div className="mb-3 flex items-center gap-2 text-[9px] font-bold text-slate-500">
                  <Icon name="BarChart3" size={11} className="text-brand-600" /> {label}
                </div>
                <div className="flex h-16 items-end gap-1.5">
                  {[34, 52, 44, 68, 58, 82, 72].map((h, i) => (
                    <span key={i} className="flex-1 rounded-t bg-brand-100" style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
