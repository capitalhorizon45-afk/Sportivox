import Link from "next/link";
import { Zap, Home, Radio } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Animated number */}
        <div className="relative mb-8">
          <p className="text-[120px] font-black leading-none text-gradient-primary opacity-20 select-none">
            404
          </p>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Zap className="w-9 h-9 text-primary" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
        <p className="text-muted text-sm leading-relaxed mb-8">
          This page went offside. Head back to the main feed to catch the
          live action.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="btn-primary">
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link href="/live" className="btn-ghost">
            <Radio className="w-4 h-4" />
            Live Scores
          </Link>
        </div>
      </div>
    </div>
  );
}
