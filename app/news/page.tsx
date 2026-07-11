import type { Metadata } from "next";
import { Newspaper } from "lucide-react";
import NewsCard from "@/components/ui/NewsCard";
import { MOCK_NEWS } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "News",
  description: "Latest sports news, match reports, and analysis from Football, Cricket, Basketball, and Tennis.",
};

const CATEGORY_FILTERS = [
  { label: "All", value: "all" },
  { label: "⚽ Football", value: "football" },
  { label: "🏏 Cricket", value: "cricket" },
  { label: "🏀 Basketball", value: "basketball" },
  { label: "🎾 Tennis", value: "tennis" },
];

export default function NewsPage() {
  const featured = MOCK_NEWS.find((a) => a.featured) ?? MOCK_NEWS[0];
  const rest = MOCK_NEWS.filter((a) => a.id !== featured.id);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Newspaper className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">Sports News</h1>
              <p className="text-muted text-sm">
                Latest stories from across the sporting world
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {CATEGORY_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                value === "all"
                  ? "bg-primary text-background"
                  : "bg-surface border border-border text-muted hover:text-white hover:border-primary/30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        <div className="mb-8">
          <NewsCard article={featured} variant="featured" />
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
