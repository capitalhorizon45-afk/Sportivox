import { StandingsRowSkeleton } from "@/components/ui/LoadingSkeleton";

export default function StandingsLoading() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <div className="h-8 w-36 bg-surface-alt rounded-xl animate-pulse" />
          <div className="h-4 w-44 bg-surface-alt rounded animate-pulse" />
        </div>
        <div className="bg-surface rounded-2xl border border-border overflow-hidden">
          {Array.from({ length: 10 }).map((_, i) => (
            <StandingsRowSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
