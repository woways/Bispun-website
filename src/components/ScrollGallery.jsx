import { useEffect, useRef } from "react";

import { site } from "../data/site";
import Icon from "./Icon";

// Horizontal "coverflow" gallery.
// The strip scrolls sideways (mouse wheel over it, drag, or trackpad). Each
// card bends by how far it is from the centre, so the row forms an arc —
// centre card small & front, edge cards large & angled outward.
//
// Tune these:
const CARD_W = 240;
const CARD_H = 330;
const GAP = 24;

const PALETTE = [
  "from-sky-400 to-blue-600",
  "from-emerald-400 to-teal-600",
  "from-rose-400 to-rose-600",
  "from-indigo-400 to-brand-700",
  "from-amber-400 to-orange-600",
  "from-fuchsia-400 to-purple-700",
];

export default function ScrollGallery() {
  const { gallery } = site;
  const items = gallery.items;

  const scrollerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    let raf = 0;

    function render() {
      const rect = scroller.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      const half = rect.width / 2;

      cardRefs.current.forEach((el) => {
        if (!el) return;
        const cr = el.getBoundingClientRect();
        const cardCenter = cr.left + cr.width / 2;
        const n = (cardCenter - center) / half; // -1 left .. 0 centre .. 1 right
        const a = Math.min(Math.abs(n), 1.6);

        const scale = 0.82 + a * 0.24; // centre small, edges bigger
        const lift = -a * a * 70; // edges rise → arc
        const rotate = -n * 22; // turn to face the centre
        const inner = el.firstChild;
        if (inner) {
          inner.style.transform = `translateY(${lift}px) rotateY(${rotate}deg) scale(${scale})`;
          inner.style.zIndex = String(200 - Math.round(a * 100));
          inner.style.opacity = String(Math.max(0.4, 1 - a * 0.4));
        }
      });
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(render);
    }

    // Let a normal vertical mouse-wheel scroll the strip sideways.
    function onWheel(e) {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        scroller.scrollLeft += e.deltaY;
        e.preventDefault();
      }
    }

    // Start near the middle so the arc is visible immediately.
    scroller.scrollLeft = (scroller.scrollWidth - scroller.clientWidth) / 2;

    render();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    scroller.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      scroller.removeEventListener("scroll", onScroll);
      scroller.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  return (
    <section className="overflow-hidden bg-white py-20 sm:py-24">
      {/* Heading */}
      <div className="container-x text-center">
        <div className="text-sm font-bold uppercase tracking-widest text-brand-600">
          {gallery.eyebrow}
        </div>
        <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {gallery.title}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-600">{gallery.subtitle}</p>
        <a
          href={gallery.ctaHref}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200 transition hover:ring-brand-300"
        >
          {gallery.ctaLabel}
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-white">
            <Icon name="ArrowRight" size={13} />
          </span>
        </a>
      </div>

      {/* Horizontal scroller */}
      <div
        ref={scrollerRef}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
        style={{
          gap: `${GAP}px`,
          perspective: "1400px",
          // side padding so the first & last card can reach the centre
          paddingLeft: "calc(50% - 120px)",
          paddingRight: "calc(50% - 120px)",
          paddingTop: "70px",
          paddingBottom: "20px",
        }}
      >
        {items.map((it, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="flex-shrink-0 snap-center"
            style={{ width: `${CARD_W}px`, height: `${CARD_H}px`, perspective: "1000px" }}
          >
            <div
              className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5 transition-none will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              {it.src ? (
                <img src={it.src} alt={it.label} className="h-full w-full object-cover" />
              ) : (
                <div
                  className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${
                    PALETTE[i % PALETTE.length]
                  }`}
                >
                  <span className="px-4 text-center text-lg font-bold text-white/90">
                    {it.label}
                  </span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4 text-left">
                <div className="text-[11px] font-bold uppercase tracking-widest text-white/80">
                  {it.tag}
                </div>
                <div className="text-sm font-bold text-white">{it.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-xs font-medium text-slate-400">
        Scroll or drag sideways to explore →
      </p>
    </section>
  );
}
