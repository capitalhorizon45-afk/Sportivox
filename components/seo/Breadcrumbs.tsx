import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import { breadcrumbSchema } from "@/lib/seo";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Visible breadcrumb trail + matching BreadcrumbList JSON-LD. `items`
 * excludes Home — it's always prepended. The final item should omit
 * `href` (it renders as the non-linked current page).
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const schema = breadcrumbSchema([
    { name: "Home", url: "/" },
    ...items.map((item) => ({ name: item.label, url: item.href ?? "" })),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs">
          <li className="flex items-center gap-1.5">
            <Link
              href="/"
              aria-label="Home"
              className="flex items-center text-muted hover:text-primary transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-1.5 min-w-0">
                <ChevronRight
                  className="w-3 h-3 text-border flex-shrink-0"
                  aria-hidden="true"
                />
                {!isLast && item.href ? (
                  <Link
                    href={item.href}
                    className="text-muted hover:text-primary transition-colors truncate"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-white font-medium truncate"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
