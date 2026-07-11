import Link from "next/link";
import { Zap, Radio, ArrowRight, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#00C8FF 1px, transparent 1px), linear-gradient(90deg, #00C8FF 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating score cards */}
      <div className="hidden xl:block absolute top-32 right-16 animate-fade-in" style={{ animationDelay: "0.8s" }}>
        <div className="glass rounded-2xl p-4 w-52 shadow-2xl border border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge-live text-[10px]">
              <span className="live-dot w-1.5 h-1.5" /> LIVE · 67&apos;
            </span>
            <span className="text-xs text-muted">Premier League</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center text-sm font-bold text-white">A</div>
              <span className="text-xs text-muted">Arsenal</span>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white tabular-nums">2 – 1</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-sm font-bold text-white">C</div>
              <span className="text-xs text-muted">Chelsea</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden xl:block absolute bottom-48 right-28 animate-fade-in" style={{ animationDelay: "1.1s" }}>
        <div className="glass rounded-2xl p-4 w-48 shadow-2xl border border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="badge-live text-[10px]">
              <span className="live-dot w-1.5 h-1.5" /> LIVE · 34&apos;
            </span>
            <span className="text-xs text-muted">La Liga</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white">RMA</div>
              <span className="text-xs text-muted">Madrid</span>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white tabular-nums">1 – 1</div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center text-xs font-bold text-white">BAR</div>
              <span className="text-xs text-muted">Barca</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats pill top-left */}
      <div className="hidden lg:flex absolute top-36 left-8 xl:left-16 items-center gap-2 glass rounded-full px-4 py-2 border border-border animate-fade-in" style={{ animationDelay: "1.3s" }}>
        <TrendingUp className="w-3.5 h-3.5 text-secondary" />
        <span className="text-xs font-medium text-white">27 live matches today</span>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 animate-slide-up">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 badge-primary mb-6">
            <Radio className="w-3.5 h-3.5 animate-pulse-slow" />
            <span>Real-time sports scores &amp; news</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            <span className="text-white">Your pulse on</span>
            <br />
            <span className="text-gradient-primary">live sports</span>
          </h1>

          {/* Sub */}
          <p className="text-lg sm:text-xl text-muted leading-relaxed mb-8 max-w-xl">
            Live scores, fixtures, standings, and breaking news for
            Football, Cricket, Basketball and Tennis — all in one place.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/live" className="btn-primary text-base px-6 py-3">
              <Zap className="w-4 h-4" />
              Watch Live
            </Link>
            <Link href="/news" className="btn-ghost text-base px-6 py-3">
              Latest News
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Sport pills */}
          <div className="flex flex-wrap gap-2.5 mt-10">
            {[
              { icon: "⚽", label: "Football", color: "#00C8FF" },
              { icon: "🏏", label: "Cricket", color: "#22C55E" },
              { icon: "🏀", label: "Basketball", color: "#F97316" },
              { icon: "🎾", label: "Tennis", color: "#A855F7" },
            ].map(({ icon, label, color }) => (
              <Link
                key={label}
                href={`/sports?sport=${label.toLowerCase()}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-border hover:border-current transition-all duration-200 text-sm font-medium group"
                style={{ "--hover-color": color } as React.CSSProperties}
              >
                <span>{icon}</span>
                <span
                  className="text-muted group-hover:text-white transition-colors"
                  style={{ color: undefined }}
                >
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
