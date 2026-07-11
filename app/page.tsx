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
