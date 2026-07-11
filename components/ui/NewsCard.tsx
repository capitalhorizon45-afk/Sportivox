import Link from "next/link";
import Image from "next/image";
import { Clock, User } from "lucide-react";
import { cn, formatRelativeTime, truncate } from "@/lib/utils";
import type { NewsArticle } from "@/lib/types";

interface NewsCardProps {
  article: NewsArticle;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  football: "text-primary bg-primary-dim",
  cricket: "text-secondary bg-secondary-dim",
  basketball: "text-orange-400 bg-orange-400/10",
  tennis: "text-purple-400 bg-purple-400/10",
  general: "text-muted bg-surface-alt",
};

export default function NewsCard({
  article,
  variant = "default",
  className,
}: NewsCardProps) {
  const categoryStyle =
    CATEGORY_COLORS[article.category] ?? CATEGORY_COLORS.general;

  if (variant === "featured") {
    return (
      <Link
        href={`/news/${article.slug}`}
        className={cn(
          "group relative block rounded-2xl overflow-hidden card-hover",
          className
        )}
        style={{ aspectRatio: "16/9" }}
      >
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <span
            className={cn(
              "inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full capitalize mb-2",
              categoryStyle
            )}
          >
            {article.category}
          </span>
          <h2 className="text-white font-bold text-lg sm:text-xl leading-snug group-hover:text-primary transition-colors">
            {article.title}
          </h2>
          <div className="flex items-center gap-3 mt-2 text-xs text-white/60">
            {article.author && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {article.author}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatRelativeTime(article.publishedAt)}
            </span>
            {article.readTime && (
              <span>{article.readTime} min read</span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/news/${article.slug}`}
        className={cn(
          "group flex items-center gap-3 p-3 rounded-xl bg-surface border border-border hover:border-border/80 card-hover",
          className
        )}
      >
        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            unoptimized
            className="object-cover"
            sizes="64px"
          />
        </div>
        <div className="flex-1 min-w-0">
          <span
            className={cn(
              "text-[10px] font-semibold px-1.5 py-0.5 rounded capitalize",
              categoryStyle
            )}
          >
            {article.category}
          </span>
          <p className="text-sm font-semibold text-white mt-0.5 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
            {article.title}
          </p>
          <span className="text-xs text-muted mt-0.5 block">
            {formatRelativeTime(article.publishedAt)}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/news/${article.slug}`}
      className={cn(
        "group block bg-surface rounded-2xl border border-border overflow-hidden card-hover",
        className
      )}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              "text-xs font-semibold px-2.5 py-1 rounded-full capitalize",
              categoryStyle
            )}
          >
            {article.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-base leading-snug group-hover:text-primary transition-colors mb-1.5">
          {truncate(article.title, 70)}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-3 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-muted">
          <div className="flex items-center gap-2">
            {article.author && (
              <span className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {article.author}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3" />
            <span>{formatRelativeTime(article.publishedAt)}</span>
            {article.readTime && <span>· {article.readTime} min</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
