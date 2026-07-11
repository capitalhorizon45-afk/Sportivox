import Link from "next/link";
import { Radio, ArrowRight } from "lucide-react";
import MatchCard from "@/components/ui/MatchCard";
import { MatchCardSkeleton } from "@/components/ui/LoadingSkeleton";
import { MOCK_LIVE_MATCHES } from "@/lib/mock-data";

export default function FeaturedMatches() {
  const matches = MOCK_LIVE_MATCHES;

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-secondary/10 border border-secondary/20 flex items-center justify-center">
              <Radio className="w-4 h-4 text-secondary" />
            </div>
            <div>
              <h2 className="section-title">Live Matches</h2>
              <p className="text-xs text-muted mt-0.5">
                {matches.length} match{matches.length !== 1 ? "es" : ""} in play
              </p>
            </div>
          </div>
          <Link href="/live" className="btn-ghost text-sm">
            View all
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {matches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {matches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <MatchCardSkeleton key={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
