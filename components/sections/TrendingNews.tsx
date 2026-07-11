import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";
import NewsCard from "@/components/ui/NewsCard";
import { MOCK_NEWS } from "@/lib/mock-data";

export default function TrendingNews() {
  const featured = MOCK_NEWS.find((a) => a.featured) ?? MOCK_NEWS[0];
  const others = MOCK_NEWS.filter((a) => a.id !== featured.id).slice(0, 4);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="section-title">Trending News</h2>
              <p className="text-xs text-muted mt-0.5">
                Latest updates from across sports
              </p>
            </div>
          </div>
          <Link href="/news" className="btn-ghost text-sm">
            All news
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Featured big card */}
          <div className="lg:col-span-3">
            <NewsCard article={featured} variant="featured" className="h-full" />
          </div>

          {/* Side cards */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {others.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
