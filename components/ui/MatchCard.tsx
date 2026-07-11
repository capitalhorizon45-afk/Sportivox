import { cn, formatMatchTime, formatMatchDate, getStatusLabel, isLive } from "@/lib/utils";
import type { Match } from "@/lib/types";
import { MapPin } from "lucide-react";

interface MatchCardProps {
  match: Match;
  compact?: boolean;
  className?: string;
}

function TeamCrest({
  name,
  crest,
  align = "left",
}: {
  name: string;
  crest?: string;
  align?: "left" | "right";
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className={cn(
        "flex items-center gap-2.5",
        align === "right" && "flex-row-reverse"
      )}
    >
      {crest ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={crest}
          alt={name}
          className="w-8 h-8 object-contain"
          loading="lazy"
        />
      ) : (
        <div className="w-8 h-8 rounded-lg bg-surface-alt border border-border flex items-center justify-center text-[10px] font-bold text-muted">
          {initials}
        </div>
      )}
      <span className="text-sm font-semibold text-white leading-tight">
        {name}
      </span>
    </div>
  );
}

export default function MatchCard({ match, compact = false, className }: MatchCardProps) {
  const live = isLive(match.status);
  const finished = match.status === "FINISHED";
  const statusLabel = getStatusLabel(match.status, match.minute);

  return (
    <div
      className={cn(
        "bg-surface rounded-2xl border border-border card-hover overflow-hidden",
        live && "border-secondary/30 glow-secondary",
        className
      )}
    >
      {/* Header */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-border/50">
        <div className="flex items-center gap-2">
          {match.competition.emblem && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={match.competition.emblem}
              alt={match.competition.name}
              className="w-4 h-4 object-contain"
              loading="lazy"
            />
          )}
          <span className="text-xs text-muted font-medium truncate max-w-[140px]">
            {match.competition.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {live ? (
            <span className="badge-live">
              <span className="live-dot" />
              {statusLabel}
            </span>
          ) : (
            <span
              className={cn(
                "text-xs font-semibold px-2 py-0.5 rounded-full",
                finished
                  ? "text-muted bg-surface-alt"
                  : "text-primary bg-primary-dim"
              )}
            >
              {finished
                ? "FT"
                : `${formatMatchDate(match.utcDate)} ${formatMatchTime(match.utcDate)}`}
            </span>
          )}
        </div>
      </div>

      {/* Score Area */}
      <div className={cn("px-4", compact ? "py-3" : "py-4")}>
        <div className="flex items-center justify-between gap-3">
          {/* Home Team */}
          <div className="flex-1">
            <TeamCrest
              name={match.homeTeam.shortName ?? match.homeTeam.name}
              crest={match.homeTeam.crest}
            />
          </div>

          {/* Score */}
          <div className="flex items-center gap-2 min-w-[80px] justify-center">
            {match.score.home !== null && match.score.away !== null ? (
              <>
                <span
                  className={cn(
                    "text-2xl font-bold tabular-nums",
                    live ? "text-white" : finished ? "text-white" : "text-muted"
                  )}
                >
                  {match.score.home}
                </span>
                <span className="text-muted font-medium">–</span>
                <span
                  className={cn(
                    "text-2xl font-bold tabular-nums",
                    live ? "text-white" : finished ? "text-white" : "text-muted"
                  )}
                >
                  {match.score.away}
                </span>
              </>
            ) : (
              <span className="text-sm font-bold text-primary">
                {formatMatchTime(match.utcDate)}
              </span>
            )}
          </div>

          {/* Away Team */}
          <div className="flex-1 flex justify-end">
            <TeamCrest
              name={match.awayTeam.shortName ?? match.awayTeam.name}
              crest={match.awayTeam.crest}
              align="right"
            />
          </div>
        </div>

        {/* Venue */}
        {!compact && match.venue && (
          <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted">
            <MapPin className="w-3 h-3" />
            <span>{match.venue}</span>
          </div>
        )}
      </div>
    </div>
  );
}
