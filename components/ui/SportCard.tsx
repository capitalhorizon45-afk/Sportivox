import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Sport } from "@/lib/types";

interface SportCardProps {
  sport: Sport;
  className?: string;
}

export default function SportCard({ sport, className }: SportCardProps) {
  return (
    <Link
      href={`/sports?sport=${sport.category}`}
      className={cn(
        "group relative block bg-surface rounded-2xl border border-border p-5 card-hover overflow-hidden",
        className
      )}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300 -translate-y-8 translate-x-8"
        style={{ background: sport.color }}
      />

      <div className="relative">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
          style={{ background: `${sport.color}20`, border: `1px solid ${sport.color}30` }}
        >
          {sport.icon}
        </div>

        {/* Name */}
        <h3 className="text-white font-bold text-lg mb-1 group-hover:text-primary transition-colors">
          {sport.name}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-4 line-clamp-2">
          {sport.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xl font-bold" style={{ color: sport.color }}>
              {sport.activeLeagues}
            </span>
            <span className="text-xs text-muted">Leagues</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold text-secondary">
                {sport.liveMatches}
              </span>
              {sport.liveMatches > 0 && (
                <span className="live-dot w-2 h-2" />
              )}
            </div>
            <span className="text-xs text-muted">Live Now</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
