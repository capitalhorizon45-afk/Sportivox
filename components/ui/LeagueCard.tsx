import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Competition } from "@/lib/types";
import { ChevronRight } from "lucide-react";

interface LeagueCardProps {
  competition: Competition;
  liveCount?: number;
  className?: string;
}

const FLAG_MAP: Record<string, string> = {
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Spain: "🇪🇸",
  Germany: "🇩🇪",
  Italy: "🇮🇹",
  France: "🇫🇷",
  Europe: "🇪🇺",
  World: "🌍",
};

export default function LeagueCard({
  competition,
  liveCount = 0,
  className,
}: LeagueCardProps) {
  const flag = competition.country
    ? FLAG_MAP[competition.country] ?? "🏆"
    : "🏆";

  return (
    <Link
      href={`/standings?league=${competition.code ?? competition.id}`}
      className={cn(
        "group flex items-center gap-3 p-3.5 bg-surface rounded-xl border border-border hover:border-primary/30 card-hover",
        className
      )}
    >
      {/* Emblem */}
      <div className="w-10 h-10 rounded-xl bg-surface-alt border border-border flex items-center justify-center flex-shrink-0 overflow-hidden">
        {competition.emblem ? (
          <Image
            src={competition.emblem}
            alt={competition.name}
            width={32}
            height={32}
            className="object-contain"
          />
        ) : (
          <span className="text-xl">{flag}</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors truncate">
          {competition.name}
        </p>
        <p className="text-xs text-muted">
          {competition.country ?? "International"}
        </p>
      </div>

      {/* Live badge */}
      {liveCount > 0 && (
        <span className="badge-live flex-shrink-0">
          <span className="live-dot" />
          {liveCount}
        </span>
      )}

      <ChevronRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors flex-shrink-0" />
    </Link>
  );
}
