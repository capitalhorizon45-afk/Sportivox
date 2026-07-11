import { MatchCardSkeleton } from "@/components/ui/LoadingSkeleton";

export default function LiveLoading() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <div className="h-8 w-40 bg-surface-alt rounded-xl animate-pulse" />
          <div className="h-4 w-32 bg-surface-alt rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <MatchCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
