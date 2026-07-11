import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, User, Calendar } from "lucide-react";
import { MOCK_NEWS } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/utils";
import NewsCard from "@/components/ui/NewsCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = MOCK_NEWS.find((a) => a.slug === slug);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export async function generateStaticParams() {
  return MOCK_NEWS.map((article) => ({ slug: article.slug }));
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = MOCK_NEWS.find((a) => a.slug === slug);
  if (!article) notFound();

  const related = MOCK_NEWS.filter(
    (a) => a.id !== article.id && a.category === article.category
  ).slice(0, 3);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/news"
          className="inline-flex items-center gap-2 text-muted hover:text-white text-sm mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to News
        </Link>

        {/* Article Header */}
        <div className="mb-6">
          <span className="badge-primary capitalize mb-3 inline-block">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
            {article.title}
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-5">
            {article.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            {article.author && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(article.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {formatRelativeTime(article.publishedAt)}
            </span>
            {article.readTime && (
              <span>{article.readTime} min read</span>
            )}
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8" style={{ aspectRatio: "16/9" }}>
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            unoptimized
            className="object-cover"
            priority
          />
        </div>

        {/* Article Content (placeholder) */}
        <div className="prose prose-invert max-w-none space-y-4 text-muted leading-relaxed">
          <p>{article.excerpt}</p>
          <p>
            This is a demonstration article. In a production environment, this
            would contain the full article content fetched from a CMS or news
            API. The GoalPulse platform is designed to be easily extended with
            any content source.
          </p>
          <p>
            The layout supports rich text, images, pull quotes, and multimedia
            embeds — all styled consistently with the GoalPulse design system.
          </p>
        </div>

        {/* Related Articles */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-white mb-5">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((a) => (
                <NewsCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
