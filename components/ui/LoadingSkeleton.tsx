import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn("shimmer-bg rounded-lg animate-pulse", className)}
    />
  );
}

export function MatchCardSkeleton() {
  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden">
      <div className="px-4 py-2.5 border-b border-border/50 flex items-center justify-between">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
      <div className="p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 flex-1">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="h-4 w-20" />
        </div>
        <div className="flex items-center gap-2 min-w-[80px] justify-center">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
        <div className="flex items-center gap-2.5 flex-1 flex-row-reverse">
          <Skeleton className="w-8 h-8 rounded-lg" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
    </div>
  );
}

export function NewsCardSkeleton() {
  return (
    <div className="bg-surface rounded-2xl border border-border overflow-hidden">
      <Skeleton className="aspect-[16/9] rounded-none" />
      <div className="p-4 space-y-2.5">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-3 w-1/2 mt-3" />
      </div>
    </div>
  );
}

export function SportCardSkeleton() {
  return (
    <div className="bg-surface rounded-2xl border border-border p-5">
      <Skeleton className="w-12 h-12 rounded-2xl mb-4" />
      <Skeleton className="h-5 w-24 mb-2" />
      <Skeleton className="h-3 w-full mb-1" />
      <Skeleton className="h-3 w-3/4 mb-4" />
      <div className="flex gap-4">
        <div className="space-y-1">
          <Skeleton className="h-6 w-8" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-6 w-8" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

export function StandingsRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="w-6 h-6 rounded" />
      <Skeleton className="h-4 flex-1 max-w-[120px]" />
      <div className="ml-auto flex gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-6" />
        ))}
      </div>
    </div>
  );
}

export function PageHeaderSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-72" />
    </div>
  );
}

export default Skeleton;
