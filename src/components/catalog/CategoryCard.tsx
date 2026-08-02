import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryCard({
  category,
  thumb,
  className,
}: {
  category: Category;
  thumb?: string | null;
  className?: string;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg-elevated shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-white">
        {thumb ? (
          <Image
            src={thumb}
            alt={`${category.name} product range`}
            fill
            sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-ink-muted">
            Saluvia
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 min-h-11 font-semibold leading-snug text-ink group-hover:text-brand">
            {category.name}
          </h3>
          <span className="mt-1 shrink-0 text-accent transition-transform group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
