"use client";

import ErrorState from "@/components/ui/ErrorState";

export default function StandingsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ErrorState
          title="Couldn't load standings"
          message={error.message}
          onRetry={reset}
        />
      </div>
    </div>
  );
}
