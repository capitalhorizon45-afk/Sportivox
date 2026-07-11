import type { Metadata } from "next";
import { Grid3X3 } from "lucide-react";
import SportCard from "@/components/ui/SportCard";
import MatchCard from "@/components/ui/MatchCard";
import { MOCK_SPORTS, MOCK_LIVE_MATCHES, MOCK_UPCOMING_MATCHES } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Sports",
  description: "Explore all sports covered on GoalPulse — Football, Cricket, Basketball, and Tennis.",
};

export default function SportsPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Grid3X3 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Sports</h1>
              <p className="text-muted text-sm">
                4 sports, worldwide coverage
              </p>
            </div>
          </div>
        </div>

        {/* Sport Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {MOCK_SPORTS.map((sport) => (
            <SportCard key={sport.id} sport={sport} />
          ))}
        </div>

        {/* Football Section */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">⚽</span>
            <h2 className="text-xl font-bold text-white">Football</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {MOCK_LIVE_MATCHES.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>

        {/* Upcoming Section */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-3xl">📅</span>
            <h2 className="text-xl font-bold text-white">Coming Up</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {MOCK_UPCOMING_MATCHES.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
