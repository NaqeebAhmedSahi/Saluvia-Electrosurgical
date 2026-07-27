import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { JsonLd } from "./JsonLd";
import { SITE_URL } from "@/lib/site";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  className,
  withSchema = true,
}: {
  items: Crumb[];
  className?: string;
  withSchema?: boolean;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${SITE_URL}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className={cn("text-xs sm:text-sm", className)}
      >
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-ink-muted">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li
                key={`${item.label}-${index}`}
                className="flex items-center gap-1.5"
              >
                {index > 0 ? (
                  <ChevronRight
                    aria-hidden="true"
                    className="size-3.5 shrink-0 text-border-strong"
                  />
                ) : null}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="rounded-sm transition-colors hover:text-brand"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn(
                      "max-w-[16rem] truncate sm:max-w-none",
                      isLast && "font-medium text-ink",
                    )}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {withSchema ? <JsonLd data={schema} /> : null}
    </>
  );
}
