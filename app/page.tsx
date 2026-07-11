import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import FeaturedMatches from "@/components/sections/FeaturedMatches";
import TrendingNews from "@/components/sections/TrendingNews";
import UpcomingFixtures from "@/components/sections/UpcomingFixtures";
import SportsCategories from "@/components/sections/SportsCategories";

export const metadata: Metadata = {
  title: "GoalPulse — Live Sports Scores & News",
  description:
    "Your ultimate sports hub. Live scores, fixtures, standings, and breaking news for Football, Cricket, Basketball, and Tennis.",
};

// Renders per-request instead of at build time: this page depends on live
// third-party sports APIs, so a transient upstream issue should surface as
// a normal request-time error (handled by error.tsx) rather than failing
// the whole production build.
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="divide-y divide-border/40">
        <FeaturedMatches />
        <TrendingNews />
        <UpcomingFixtures />
        <SportsCategories />
      </div>
    </>
  );
}
