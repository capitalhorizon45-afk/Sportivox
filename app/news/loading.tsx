import { NewsCardSkeleton } from "@/components/ui/LoadingSkeleton";

export default function NewsLoading() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 space-y-2">
          <div className="h-8 w-40 bg-surface-alt rounded-xl animate-pulse" />
          <div className="h-4 w-56 bg-surface-alt rounded animate-pulse" />
        </div>
        {/* Featured skeleton */}
        <div className="w-full bg-surface-alt rounded-2xl animate-pulse mb-8" style={{ aspectRatio: "16/9" }} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
