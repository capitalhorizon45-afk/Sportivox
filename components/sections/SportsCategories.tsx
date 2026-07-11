import Link from "next/link";
import { Grid3X3, ArrowRight } from "lucide-react";
import SportCard from "@/components/ui/SportCard";
import { MOCK_SPORTS } from "@/lib/mock-data";

export default function SportsCategories() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="section-header">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Grid3X3 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="section-title">Explore Sports</h2>
              <p className="text-xs text-muted mt-0.5">
                4 sports covered worldwide
              </p>
            </div>
          </div>
          <Link href="/sports" className="btn-ghost text-sm">
            All sports
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_SPORTS.map((sport) => (
            <SportCard key={sport.id} sport={sport} />
          ))}
        </div>
      </div>
    </section>
  );
}
