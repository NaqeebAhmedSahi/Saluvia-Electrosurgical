import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { variantSummary } from "@/lib/product-utils";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  className,
  priority = false,
}: {
  product: Product;
  className?: string;
  priority?: boolean;
}) {
  const summary = variantSummary(product);
  const shortDescription =
    product.short_description &&
    product.short_description.toLowerCase() !== product.title.toLowerCase()
      ? product.short_description
      : null;

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg-elevated shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-md focus-within:ring-2 focus-within:ring-ring",
        className,
      )}
    >
      {/* Stretched link under interactive controls (z-0 vs actions z-10) */}
      <Link
        href={`/products/${encodeURIComponent(product.code)}`}
        aria-label={`${product.title} — ${product.code}`}
        className="absolute inset-0 z-0 focus-visible:outline-none"
      />

      {/* pointer-events-none so clicks reach the stretched Link underneath */}
      <div className="pointer-events-none relative isolate z-0 aspect-square shrink-0 overflow-hidden bg-white">
        <Image
          src={
            product.images.full ||
            product.images.medium ||
            product.images.thumb
          }
          alt={`${product.title} — ${product.code}`}
          fill
          sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <span className="absolute left-3 top-3 z-10 max-w-[calc(100%-1.5rem)] truncate rounded-sm border border-border bg-bg-elevated px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand shadow-sm">
          {product.category_name}
        </span>
      </div>

      <div className="pointer-events-none relative z-0 flex min-h-0 flex-1 flex-col p-4 sm:p-5">
        <span className="mb-2 w-fit rounded-sm bg-accent-muted px-2 py-0.5 text-[11px] font-bold tracking-[0.08em] text-brand">
          {product.code}
        </span>

        {/* Fixed title slot — 2 lines everywhere */}
        <h3 className="font-display line-clamp-2 min-h-11 text-base font-semibold leading-snug text-ink transition-colors group-hover:text-brand">
          {product.title}
        </h3>

        {/* Fixed description slot — keeps cards level when some lack copy */}
        <p className="mt-2 line-clamp-1 min-h-5 text-xs leading-relaxed text-ink-muted">
          {shortDescription ?? "\u00A0"}
        </p>

        {/* Fixed summary slot with consistent top rule */}
        <p className="mt-3 line-clamp-2 min-h-13 border-t border-border pt-3 text-xs leading-relaxed text-ink-soft">
          {summary ?? "\u00A0"}
        </p>

        {/* Above stretched link; only Add to cart re-enables pointer events */}
        <div className="relative z-10 mt-auto flex items-center justify-between gap-3 pt-4">
          <span className="whitespace-nowrap text-xs font-semibold text-brand">
            View specs
            <span
              aria-hidden="true"
              className="ml-1 inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </span>
          <AddToCartButton
            product={product}
            size="sm"
            className="pointer-events-auto shrink-0"
          />
        </div>
      </div>
    </article>
  );
}
