import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useRecentFlows } from "../../hooks/useRecentFlows";

function buildFlowUrl(flow) {
  const params = new URLSearchParams();

  Object.entries(flow?.filters_json || {}).forEach(([key, value]) => {
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      value === false
    ) {
      return;
    }

    if (key === "featured") {
      if (value === true) {
        params.set(key, "true");
      }
      return;
    }

    params.set(key, String(value));
  });

  const queryString = params.toString();
  return queryString ? `/recommendations?${queryString}` : "/recommendations";
}

function DemoChip({ label, value, tone = "violet", active = false }) {
  const toneClasses = {
    violet: active
      ? "border-violet-300/40 bg-violet-500/20 text-violet-50 shadow-[0_0_20px_rgba(139,92,246,0.25)]"
      : "border-violet-400/20 bg-violet-500/10 text-violet-100",
    emerald: active
      ? "border-emerald-300/40 bg-emerald-500/20 text-emerald-50 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
      : "border-emerald-400/20 bg-emerald-500/10 text-emerald-100",
    sky: active
      ? "border-sky-300/40 bg-sky-500/20 text-sky-50 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
      : "border-sky-400/20 bg-sky-500/10 text-sky-100",
    amber: active
      ? "border-amber-300/40 bg-amber-500/20 text-amber-50 shadow-[0_0_20px_rgba(245,158,11,0.2)]"
      : "border-amber-400/20 bg-amber-500/10 text-amber-100",
  };

  return (
    <div
      className={[
        "rounded-full border px-3 py-2 text-xs font-medium transition-all duration-500",
        toneClasses[tone],
      ].join(" ")}
    >
      {label}: {value}
    </div>
  );
}

function DemoSignalBar({
  label,
  value,
  widthClass = "w-3/4",
  isTransitioning,
}) {
  return (
    <div className="transition-all duration-700">
      <div className="mb-1.5 flex items-center justify-between text-xs text-zinc-400">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-2 rounded-full bg-gradient-to-r from-violet-400 via-sky-400 to-emerald-400 transition-all duration-500 ease-out delay-75 ${widthClass}`}
          style={{
            transformOrigin: "left",
            transform: isTransitioning ? "scaleX(0.6)" : "scaleX(1)",
            opacity: isTransitioning ? 0.6 : 1,
          }}
        />
      </div>
    </div>
  );
}

function DemoModeToggle({ mode, onChange }) {
  return (
    <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-1">
      <button
        type="button"
        onClick={() => onChange("sharp")}
        onMouseEnter={() => onChange("sharp")}
        onFocus={() => onChange("sharp")}
        className={[
          "rounded-full px-3 py-1.5 text-xs font-medium transition",
          mode === "sharp"
            ? "bg-violet-500 text-white"
            : "text-zinc-300 hover:text-white",
        ].join(" ")}
      >
        Sharpen
      </button>

      <button
        type="button"
        onClick={() => onChange("explore")}
        onMouseEnter={() => onChange("explore")}
        onFocus={() => onChange("explore")}
        className={[
          "rounded-full px-3 py-1.5 text-xs font-medium transition",
          mode === "explore"
            ? "bg-violet-500 text-white"
            : "text-zinc-300 hover:text-white",
        ].join(" ")}
      >
        Explore
      </button>
    </div>
  );
}

function AnimatedScore({ value, isTransitioning }) {
  const numericValue = Number(value) || 0;
  const [displayValue, setDisplayValue] = useState(numericValue);

  useEffect(() => {
    let frameId;
    let start = null;
    const startValue = displayValue;
    const endValue = numericValue;
    const duration = 450;

    function animate(timestamp) {
      if (!start) start = timestamp;

      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const next = startValue + (endValue - startValue) * eased;
      setDisplayValue(next);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    }

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [numericValue, displayValue]);

  return (
    <div
      className={[
        "mt-1 text-2xl font-semibold text-white transition-all duration-300",
        isTransitioning ? "scale-95 opacity-70" : "scale-100 opacity-100",
      ].join(" ")}
    >
      {displayValue.toFixed(1)}
    </div>
  );
}

function LiveDemoPanel() {
  const [activeChip, setActiveChip] = useState(0);
  const [mode, setMode] = useState("sharp");
  const [displayMode, setDisplayMode] = useState("sharp");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const chips = [
    { label: "State", value: "Deep Focus", tone: "violet" },
    {
      label: "Effect",
      value: displayMode === "sharp" ? "Focused" : "Creative",
      tone: "emerald",
    },
    {
      label: "Terpene",
      value: displayMode === "sharp" ? "Pinene" : "Limonene",
      tone: "sky",
    },
    { label: "Time", value: "Night", tone: "amber" },
  ];

  const demoContent = useMemo(() => {
    if (displayMode === "explore") {
      return {
        copilot:
          "Explore mode opens the session up. Limonene and a more creative pairing broaden the recommendation field.",
        matchName: "Super Lemon Haze",
        matchDescription:
          "Ranked for idea generation, uplifted momentum, and a more expansive creative session.",
        finalScore: "14.2",
        signals: [
          { label: "State Match", value: "7.0", widthClass: "w-[76%]" },
          { label: "Effect Fit", value: "2.8", widthClass: "w-[48%]" },
          { label: "Terpene Fit", value: "2.4", widthClass: "w-[42%]" },
          { label: "Time Match", value: "2.0", widthClass: "w-[36%]" },
        ],
        badge: "Explore Mode",
        badgeClass: "border-sky-400/20 bg-sky-500/10 text-sky-200",
        demoUrl:
          "/recommendations?state=deep-focus&effect=creative&terpene=limonene&time_of_day=night&mode=explore",
      };
    }

    return {
      copilot:
        "This setup is highly defined. Pinene and night timing help sharpen focus-forward ranking.",
      matchName: "Durban Poison",
      matchDescription:
        "Ranked strongly for high-clarity sessions, coding focus, and momentum without heavy slowdown.",
      finalScore: "18.4",
      signals: [
        { label: "State Match", value: "8.0", widthClass: "w-[88%]" },
        { label: "Effect Fit", value: "4.0", widthClass: "w-[68%]" },
        { label: "Terpene Fit", value: "3.4", widthClass: "w-[58%]" },
        { label: "Time Match", value: "3.0", widthClass: "w-[52%]" },
      ],
      badge: "Sharpen Mode",
      badgeClass: "border-emerald-400/20 bg-emerald-500/10 text-emerald-200",
      demoUrl:
        "/recommendations?state=deep-focus&effect=focused&terpene=pinene&time_of_day=night&mode=sharp",
    };
  }, [displayMode]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveChip((prev) => (prev + 1) % chips.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [chips.length]);

  function handleModeChange(nextMode) {
    if (nextMode === mode || isTransitioning) return;

    setMode(nextMode);
    setIsTransitioning(true);

    window.setTimeout(() => {
      setDisplayMode(nextMode);

      window.setTimeout(() => {
        setIsTransitioning(false);
      }, 220);
    }, 180);
  }

  return (
    <div className="relative mx-auto w-full max-w-[520px] xl:max-w-[560px]">
      <div className="absolute -left-10 top-10 h-28 w-28 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="absolute -right-8 bottom-8 h-28 w-28 rounded-full bg-sky-500/20 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/70 p-4 shadow-[0_20px_80px_-30px_rgba(139,92,246,0.45)] backdrop-blur-xl transition duration-300 hover:scale-[1.01]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.05),transparent)] bg-[length:200%_100%] animate-[shimmer_3.5s_linear_infinite]" />

        <div className="relative mb-5 flex items-start justify-between gap-4">
          <div className="opacity-0 animate-[fadeUp_0.6s_ease-out_forwards]">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-violet-300/80">
              Live Demo
            </p>
            <h3 className="mt-2 text-xl font-semibold tracking-tight text-white">
              AI Session Builder
            </h3>
          </div>

          <div className="flex flex-col items-end gap-3 opacity-0 animate-[fadeUp_0.6s_ease-out_0.15s_forwards]">
            <DemoModeToggle mode={mode} onChange={handleModeChange} />
            <div
              className={[
                "rounded-full border px-3 py-1 text-[11px] font-medium transition-all duration-300",
                demoContent.badgeClass,
                isTransitioning ? "scale-95 opacity-60" : "scale-100 opacity-100",
              ].join(" ")}
            >
              {demoContent.badge}
            </div>
          </div>
        </div>

        <div className="relative grid gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 opacity-0 animate-[fadeUp_0.6s_ease-out_0.2s_forwards]">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                Session Setup
              </p>
              <div className="flex items-center gap-2 text-[11px] text-violet-200">
                <span className="h-2 w-2 rounded-full bg-violet-400 animate-pulse" />
                AI analyzing
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {chips.map((chip, index) => (
                <DemoChip
                  key={chip.label}
                  label={chip.label}
                  value={chip.value}
                  tone={chip.tone}
                  active={activeChip === index}
                />
              ))}
            </div>
          </div>

          <div
            className={[
              "rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-500/[0.10] via-white/[0.03] to-white/[0.02] p-4 opacity-0 animate-[fadeUp_0.6s_ease-out_0.35s_forwards] transition-all duration-300",
              isTransitioning ? "scale-[0.985] opacity-70" : "scale-100 opacity-100",
            ].join(" ")}
          >
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-200/90">
              FlowTerp AI Co-Pilot
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-200">
              {demoContent.copilot}
            </p>
          </div>

          <div
            className={[
              "rounded-3xl border border-white/10 bg-white/[0.03] p-4 opacity-0 animate-[fadeUp_0.6s_ease-out_0.5s_forwards] transition-all duration-300",
              isTransitioning ? "translate-y-1 opacity-70" : "translate-y-0 opacity-100",
            ].join(" ")}
          >
            <div className="mb-4 flex items-start justify-between gap-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                  Top Match
                </p>
                <h4 className="mt-2 text-xl font-semibold text-white">
                  {demoContent.matchName}
                </h4>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {demoContent.matchDescription}
                </p>

                <div className="mt-5 border-t border-white/5 pt-4">
                  <div className="space-y-3">
                    {demoContent.signals.map((signal) => (
                      <DemoSignalBar
                        key={signal.label}
                        label={signal.label}
                        value={signal.value}
                        widthClass={signal.widthClass}
                        isTransitioning={isTransitioning}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 px-4 py-2.5 text-center">
                <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-violet-200">
                  Final Score
                </div>
                <AnimatedScore
                  value={demoContent.finalScore}
                  isTransitioning={isTransitioning}
                />
              </div>
            </div>

            <div className="mt-5">
              <Link
                to={demoContent.demoUrl}
                className="inline-flex rounded-xl border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-sm font-semibold text-violet-200 transition hover:border-violet-400/50 hover:bg-violet-500/20 hover:text-white"
              >
                Try This Demo
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </div>
  );
}

export default function HeroSection() {
  const { flows } = useRecentFlows();
  const latestFlow = flows?.length ? flows[0] : null;

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <img
          src="/images/hero-bg.jpg"
          //src="/images/hero2.jpg"
          alt="FlowTerp background"
          className="h-full w-full object-cover opacity-30"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-zinc-950" />

        <div className="absolute left-1/2 top-1/3 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-3xl animate-pulse" />
        <div className="absolute left-[20%] top-[20%] h-40 w-40 rounded-full bg-sky-500/10 blur-3xl animate-pulse" />
        <div className="absolute right-[18%] bottom-[18%] h-52 w-52 rounded-full bg-emerald-500/10 blur-3xl animate-pulse" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-24 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div className="max-w-2xl xl:max-w-3xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-violet-400">
              FlowTerp Intelligence
            </p>

            <h1 className="text-4xl font-semibold leading-[0.9] tracking-tight text-white md:text-6xl md:leading-[0.92] xl:text-7xl">
              Build the Perfect
              <span className="block text-violet-400">
                Creative Session
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
              FlowTerp analyzes creative states, terpene profiles, and session
              timing to generate ranked strain recommendations optimized for how
              you actually work.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200">
                AI Co-Pilot Guidance
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200">
                Smart Presets
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-zinc-200">
                Personalized Flows
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/recommendations"
                className="rounded-xl bg-violet-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-400 hover:shadow-lg hover:shadow-violet-500/30"
              >
                Start Your Flow
              </Link>

              {latestFlow ? (
                <Link
                  to={buildFlowUrl(latestFlow)}
                  className="rounded-xl border border-violet-400/40 bg-violet-500/10 px-6 py-3 text-sm font-semibold text-violet-200 transition hover:border-violet-400/60 hover:bg-violet-500/20 hover:text-white"
                >
                  Continue Flow
                </Link>
              ) : null}

              <Link
                to="/recommendations?state=deep-focus&effect=focused&terpene=pinene&time_of_day=night&mode=sharp"
                className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/5"
              >
                Try Sharpen Demo
              </Link>

              <Link
                to="/recommendations?state=deep-focus&effect=creative&terpene=limonene&time_of_day=night&mode=explore"
                className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/5"
              >
                Try Explore Demo
              </Link>
            </div>
          </div>

          <div className="lg:pl-2 xl:pl-4 lg:mt-6">
            <LiveDemoPanel />
          </div>
        </div>
      </div>
    </section>
  );
}