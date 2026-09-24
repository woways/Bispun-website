import { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import { site } from "../data/site";
import Icon from "./Icon";
import laptopAnimation from "../assets/Laptop.json";

function useCountUp(end, duration = 6500, step = 1) {
  const [value, setValue] = useState(0);
  const started = useRef(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const node = targetRef.current;
    if (!node) return undefined;

    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    const start = () => {
      if (started.current) return;
      started.current = true;

      if (reduceMotion) {
        setValue(end);
        return;
      }

      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        const rawValue = end * eased;
        const steppedValue =
          step > 1 ? Math.round(rawValue / step) * step : Math.round(rawValue);

        setValue(Math.min(steppedValue, end));

        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      };

      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [end, duration, step]);

  return { value, targetRef };
}

function AnimatedMetric({
  end,
  prefix = "",
  suffix = "",
  className = "",
  grouping = true,
  duration = 6500,
  step = 1,
}) {
  const { value, targetRef } = useCountUp(end, duration, step);

  return (
    <span ref={targetRef} className={className}>
      {prefix}
      {grouping ? value.toLocaleString("en-IN") : String(value)}
      {suffix}
    </span>
  );
}

function OrbitSymbol({ type }) {
  if (type === "message") {
    return (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3 1.6-4.8A7 7 0 0 1 3 12V8a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        <path d="M8 10h8M8 14h5" />
      </svg>
    );
  }

  if (type === "calendar") {
    return (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
        <path d="m9 15 2 2 4-4" />
      </svg>
    );
  }

  if (type === "send") {
    return (
      <svg viewBox="0 0 24 24" className="h-[19px] w-[19px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m22 2-7 20-4-9-9-4z" />
        <path d="M22 2 11 13" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 20 6v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function OrbitBubble({ className, symbol, label }) {
  return (
    <div
      className={`hero-orbit-bubble pointer-events-none absolute z-20 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/80 bg-white/95 text-brand-600 shadow-[0_14px_34px_rgba(15,23,42,0.12)] ${className}`}
      aria-label={label}
      title={label}
    >
      <OrbitSymbol type={symbol} />
    </div>
  );
}

function ProductPreview() {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current?.setSpeed) {
      lottieRef.current.setSpeed(0.38);
    }
  }, []);

  return (
    <div className="hero-laptop-wrap relative mx-auto w-full max-w-[820px] lg:mx-0">
      <div className="hero-laptop-motion relative h-full w-full">
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center">
          <Lottie
            lottieRef={lottieRef}
            animationData={laptopAnimation}
            loop
            autoplay
            className="hero-lottie h-auto w-[108%] max-w-none opacity-90"
            rendererSettings={{
              preserveAspectRatio: "xMidYMid meet",
              clearCanvas: true,
            }}
            aria-hidden="true"
          />
        </div>

        <div className="hero-screen relative z-10 mx-auto">
          <div className="absolute -inset-3 rounded-[28px] bg-brand-100/25 blur-2xl" />

          <div className="relative overflow-hidden rounded-[18px] border border-slate-200/90 bg-white shadow-[0_28px_75px_rgba(15,23,42,0.16)]">
            <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50/95 px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-rose-300" />
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              <span className="h-2 w-2 rounded-full bg-emerald-300" />

              <div className="ml-2 h-5 flex-1 rounded-md border border-slate-200 bg-white" />

              <span className="rounded-md bg-brand-50 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-brand-700">
                Live CRM
              </span>
            </div>

            <div className="relative">
              <img
                src="/product-real/dashboard.png"
                alt="Bispun CRM dashboard interface"
                className="block h-auto w-full"
                loading="eager"
              />

              <div className="pointer-events-none absolute inset-0">
                <div className="metric-cover metric-total-leads">
                  <AnimatedMetric end={48} className="metric-value" />
                </div>

                <div className="metric-cover metric-qualified">
                  <AnimatedMetric end={21} className="metric-value" />
                </div>

                <div className="metric-cover metric-new-leads">
                  <AnimatedMetric end={27} className="metric-value" />
                </div>

                <div className="metric-cover metric-admissions">
                  <AnimatedMetric end={12} className="metric-value" />
                </div>

                <div className="metric-cover metric-potential-revenue">
                  <AnimatedMetric
                    end={180000}
                    prefix="₹"
                    grouping={false}
                    duration={9000}
                    step={5000}
                    className="metric-value metric-value-money"
                  />
                </div>

                <div className="metric-cover metric-received-revenue">
                  <AnimatedMetric
                    end={125000}
                    prefix="₹"
                    grouping={false}
                    duration={9000}
                    step={5000}
                    className="metric-value metric-value-money"
                  />
                </div>

                <div className="metric-cover metric-pending-revenue">
                  <AnimatedMetric
                    end={55000}
                    prefix="₹"
                    grouping={false}
                    duration={9000}
                    step={5000}
                    className="metric-value metric-value-money"
                  />
                </div>

                <div className="metric-cover metric-current-profit">
                  <AnimatedMetric
                    end={75000}
                    prefix="₹"
                    grouping={false}
                    duration={9000}
                    step={5000}
                    className="metric-value metric-value-money"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-orbit-ring pointer-events-none absolute left-1/2 top-[51%] z-[1] hidden h-[72%] w-[99%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-brand-200/55 lg:block" />
        <div className="hero-orbit-ring-alt pointer-events-none absolute left-1/2 top-[51%] z-[1] hidden h-[61%] w-[91%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-brand-100/45 lg:block" />

        <OrbitBubble
          className="hero-bubble-message left-[12%] top-[5%] hidden sm:flex"
          symbol="message"
          label="New enquiry"
        />

        <OrbitBubble
          className="hero-bubble-calendar right-[12%] top-[4%] hidden md:flex"
          symbol="calendar"
          label="Demo scheduled"
        />

        <OrbitBubble
          className="hero-bubble-send -left-[2%] top-[48%] hidden lg:flex"
          symbol="send"
          label="Follow-up sent"
        />

        <OrbitBubble
          className="hero-bubble-shield -right-[2%] top-[52%] hidden lg:flex"
          symbol="shield"
          label="Secure workspace"
        />

        <div className="hero-spark hero-spark-1 pointer-events-none absolute left-[27%] top-[15%] z-20 hidden h-2.5 w-2.5 rounded-full bg-brand-400/80 sm:block" />
        <div className="hero-spark hero-spark-2 pointer-events-none absolute right-[27%] top-[14%] z-20 hidden h-2 w-2 rounded-full bg-brand-300/80 sm:block" />
        <div className="hero-spark hero-spark-3 pointer-events-none absolute bottom-[7%] left-[50%] z-20 hidden h-2 w-2 rounded-full bg-brand-500/70 lg:block" />
      </div>
    </div>
  );
}

export default function Hero() {
  const { hero } = site;

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      <style>{`
        .hero-laptop-wrap {
          min-height: 470px;
        }

        .hero-laptop-motion {
          animation: hero-laptop-float 8.5s ease-in-out infinite;
          transform-origin: 50% 55%;
          will-change: transform;
        }

        .hero-screen {
          width: min(88%, 690px);
          transform: translateY(74px);
          animation: hero-screen-enter 1100ms cubic-bezier(.2,.75,.25,1) both;
        }

        .hero-lottie {
          transform: translateY(22px) scale(1.06);
          filter: saturate(.85);
        }

        .metric-cover {
          position: absolute;
          display: flex;
          align-items: center;
          min-width: 10.5%;
          height: 5.1%;
          padding: 0 .15%;
          background: rgba(255,255,255,.99);
          border-radius: 2px;
        }

        .metric-value {
          font-size: clamp(7px, .64vw, 12px);
          line-height: 1;
          font-weight: 800;
          color: rgb(15 23 42);
          letter-spacing: -0.025em;
          white-space: nowrap;
        }

        .metric-value-money {
          font-size: clamp(6.5px, .58vw, 11px);
        }

        .metric-total-leads {
          left: 17.1%;
          top: 25.0%;
        }

        .metric-qualified {
          left: 38.0%;
          top: 25.0%;
        }

        .metric-new-leads {
          left: 58.8%;
          top: 25.0%;
        }

        .metric-admissions {
          left: 79.5%;
          top: 25.0%;
        }

        .metric-potential-revenue {
          left: 17.1%;
          top: 41.1%;
          min-width: 13%;
        }

        .metric-received-revenue {
          left: 38.0%;
          top: 41.1%;
          min-width: 13%;
        }

        .metric-pending-revenue {
          left: 58.8%;
          top: 41.1%;
          min-width: 13%;
        }

        .metric-current-profit {
          left: 79.5%;
          top: 41.1%;
          min-width: 13%;
        }

        .hero-orbit-ring {
          animation: hero-orbit-ring 18s linear infinite;
        }

        .hero-orbit-ring-alt {
          animation: hero-orbit-ring-alt 24s linear infinite reverse;
        }

        .hero-orbit-bubble {
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          will-change: transform;
        }

        .hero-bubble-message {
          animation: hero-bubble-message 7.4s ease-in-out infinite;
        }

        .hero-bubble-calendar {
          animation: hero-bubble-calendar 8.2s ease-in-out infinite;
        }

        .hero-bubble-send {
          animation: hero-bubble-send 8.8s ease-in-out infinite;
        }

        .hero-bubble-shield {
          animation: hero-bubble-shield 7.8s ease-in-out infinite;
        }

        .hero-spark {
          box-shadow: 0 0 0 6px rgba(99,102,241,.06);
          will-change: transform, opacity;
        }

        .hero-spark-1 {
          animation: hero-spark-one 5.8s ease-in-out infinite;
        }

        .hero-spark-2 {
          animation: hero-spark-two 6.6s ease-in-out infinite;
        }

        .hero-spark-3 {
          animation: hero-spark-three 7.2s ease-in-out infinite;
        }

        @keyframes hero-screen-enter {
          from {
            opacity: 0;
            transform: translateY(94px) scale(.97);
          }

          to {
            opacity: 1;
            transform: translateY(74px) scale(1);
          }
        }

        @keyframes hero-laptop-float {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(-0.15deg);
          }

          50% {
            transform: translate3d(0, -11px, 0) rotate(0.25deg);
          }
        }

        @keyframes hero-orbit-ring {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes hero-orbit-ring-alt {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes hero-bubble-message {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-4deg); }
          50% { transform: translate3d(7px, -14px, 0) rotate(4deg); }
        }

        @keyframes hero-bubble-calendar {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(4deg); }
          50% { transform: translate3d(-8px, -12px, 0) rotate(-4deg); }
        }

        @keyframes hero-bubble-send {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-3deg); }
          50% { transform: translate3d(8px, -11px, 0) rotate(5deg); }
        }

        @keyframes hero-bubble-shield {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(3deg); }
          50% { transform: translate3d(-7px, -14px, 0) rotate(-5deg); }
        }

        @keyframes hero-spark-one {
          0%, 100% { transform: translate3d(0, 0, 0) scale(.9); opacity: .45; }
          50% { transform: translate3d(8px, -8px, 0) scale(1.2); opacity: 1; }
        }

        @keyframes hero-spark-two {
          0%, 100% { transform: translate3d(0, 0, 0) scale(.85); opacity: .4; }
          50% { transform: translate3d(-7px, 7px, 0) scale(1.15); opacity: .95; }
        }

        @keyframes hero-spark-three {
          0%, 100% { transform: translate3d(0, 0, 0) scale(.8); opacity: .35; }
          50% { transform: translate3d(0, -9px, 0) scale(1.2); opacity: .9; }
        }

        @media (min-width: 1024px) {
          .hero-copy {
            transform: translateX(-28px);
            width: calc(100% + 28px);
          }

          .hero-product-position {
            padding-top: clamp(1.5rem, 4vh, 3rem);
          }

          .hero-laptop-wrap {
            width: 108%;
          }
        }

        @media (min-width: 1280px) {
          .hero-copy {
            transform: translateX(-52px);
            width: calc(100% + 52px);
          }
        }

        @media (min-width: 1536px) {
          .hero-copy {
            transform: translateX(-72px);
            width: calc(100% + 72px);
          }
        }

        @media (max-width: 1279px) and (min-width: 1024px) {
          .hero-laptop-wrap {
            min-height: 420px;
            width: 102%;
          }

          .hero-screen {
            width: 92%;
            transform: translateY(62px);
          }

          @keyframes hero-screen-enter {
            from {
              opacity: 0;
              transform: translateY(82px) scale(.97);
            }

            to {
              opacity: 1;
              transform: translateY(62px) scale(1);
            }
          }
        }

        @media (max-width: 1023px) {
          .hero-laptop-wrap {
            min-height: 410px;
          }

          .hero-screen {
            width: min(94%, 680px);
            transform: translateY(55px);
          }

          .hero-lottie {
            width: 104%;
            transform: translateY(8px) scale(1.02);
          }

          @keyframes hero-screen-enter {
            from {
              opacity: 0;
              transform: translateY(72px) scale(.97);
            }

            to {
              opacity: 1;
              transform: translateY(55px) scale(1);
            }
          }
        }

        @media (max-width: 639px) {
          .hero-laptop-wrap {
            min-height: 300px;
          }

          .hero-screen {
            width: 96%;
            transform: translateY(36px);
          }

          .hero-lottie {
            opacity: .72;
            transform: translateY(0) scale(.98);
          }

          .metric-value {
            font-size: clamp(6px, 1.7vw, 9px);
          }

          @keyframes hero-screen-enter {
            from {
              opacity: 0;
              transform: translateY(50px) scale(.975);
            }

            to {
              opacity: 1;
              transform: translateY(36px) scale(1);
            }
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-screen,
          .hero-laptop-motion,
          .hero-orbit-ring,
          .hero-orbit-ring-alt,
          .hero-orbit-bubble,
          .hero-spark {
            animation: none !important;
          }
        }
      `}</style>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] bg-gradient-to-b from-brand-50 via-white to-white" />
      <div className="pointer-events-none absolute -left-32 top-8 h-72 w-72 rounded-full bg-brand-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-12 h-80 w-80 rounded-full bg-brand-100/70 blur-3xl" />

      <div className="container-x relative py-12 sm:py-14 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-16 xl:gap-20">
          <div className="hero-copy text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              {hero.badge}
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-[1.04] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-[56px] xl:text-[60px]">
              {hero.title}{" "}
              <span className="bg-gradient-to-r from-brand-700 to-brand-500 bg-clip-text text-transparent">
                {hero.titleHighlight}
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg lg:mx-0">
              {hero.subtitle}
            </p>

            <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <a
                href={hero.primaryCta.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 sm:w-auto"
              >
                {hero.primaryCta.label}
                <Icon name="ArrowRight" size={16} />
              </a>

              <a
                href={hero.secondaryCta.href}
                className="inline-flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700 sm:w-auto"
              >
                {hero.secondaryCta.label}
              </a>
            </div>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3 lg:mx-0">
              {hero.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-slate-200/80 bg-white/70 px-3 py-3 text-center shadow-sm lg:text-left"
                >
                  <div className="text-sm font-extrabold text-slate-900 sm:text-base">
                    {s.value}
                  </div>

                  <div className="mt-1 text-[10px] font-medium leading-4 text-slate-500 sm:text-[11px]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-product-position flex min-w-0 justify-center lg:justify-end lg:translate-x-5 xl:translate-x-8 2xl:translate-x-10">
            <ProductPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
