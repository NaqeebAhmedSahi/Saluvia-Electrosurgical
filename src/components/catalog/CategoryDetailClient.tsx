"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import {
  buildHref,
  firstParam,
  matchesQuery,
  paginate,
  parsePage,
  parseSort,
  searchParamsFromReadonly,
  sortProducts,
} from "@/lib/catalog-query";
import type {
  CatalogListCategory,
  CatalogListProduct,
} from "@/lib/catalog-list-payload";

type CategoryDetailClientProps = {
  category: CatalogListCategory;
  products: CatalogListProduct[];
  siblings: CatalogListCategory[];
};

export function CategoryDetailClient({
  category,
  products: categoryProducts,
  siblings,
}: CategoryDetailClientProps) {
  const searchParams = useSearchParams();
  const query = useMemo(
    () => searchParamsFromReadonly(searchParams),
    [searchParams],
  );

  const q = firstParam(query, "q") ?? "";
  const sort = parseSort(firstParam(query, "sort"));
  const page = parsePage(firstParam(query, "page"));
  const slug = category.slug;

  const paged = useMemo(() => {
    let products = categoryProducts as Parameters<typeof sortProducts>[0];
    if (q) products = products.filter((product) => matchesQuery(product, q));
    products = sortProducts(products, sort, q || undefined);
    return paginate(products, page);
  }, [categoryProducts, q, sort, page]);

  return (
    <>
      <Reveal>
        <form
          className="flex flex-col gap-3 rounded-lg border border-border bg-bg-elevated p-4 shadow-sm sm:flex-row sm:items-center"
          action={`/categories/${slug}`}
          method="get"
        >
          <label className="sr-only" htmlFor="category-search">
            Search in {category.name}
          </label>
          <input
            id="category-search"
            name="q"
            defaultValue={q}
            placeholder="Search by product or code…"
            className="w-full flex-1 rounded-md border border-border bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted"
          />
          <select
            name="sort"
            defaultValue={sort}
            className="rounded-md border border-border bg-bg px-3 py-2.5 text-sm text-ink"
            aria-label="Sort products"
          >
            <option value="relevance">Relevance</option>
            <option value="az">Name (A–Z)</option>
            <option value="code">Product code</option>
          </select>
          <Button type="submit" variant="secondary">
            Apply
          </Button>
        </form>
      </Reveal>

      {paged.items.length ? (
        <Stagger
          key={`category-${slug}-page-${paged.page}`}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {paged.items.map((product, index) => (
            <StaggerItem key={product.code}>
              <ProductCard product={product} priority={index < 4} />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <Reveal className="rounded-lg border border-dashed border-border bg-bg-elevated p-10 text-center">
          <p className="font-display text-lg font-semibold text-ink">
            No products matched
          </p>
          <p className="mt-2 text-sm text-ink-soft">
            Try a different search term or clear filters.
          </p>
          <div className="mt-6">
            <Button href={`/categories/${slug}`} variant="outline">
              Reset search
            </Button>
          </div>
        </Reveal>
      )}

      {paged.pageCount > 1 ? (
        <div className="flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: paged.pageCount }, (_, i) => i + 1).map(
            (pageNumber) => (
              <Link
                key={pageNumber}
                href={buildHref(`/categories/${slug}`, {
                  q: q || undefined,
                  sort: sort === "relevance" ? undefined : sort,
                  page: pageNumber === 1 ? undefined : pageNumber,
                })}
                prefetch={false}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
                  pageNumber === paged.page
                    ? "bg-brand text-ink-inverse"
                    : "border border-border bg-bg-elevated text-ink hover:border-accent"
                }`}
              >
                {pageNumber}
              </Link>
            ),
          )}
        </div>
      ) : null}

      {siblings.length ? (
        <Reveal className="space-y-4">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Related categories
          </h2>
          <div className="flex flex-wrap gap-2">
            {siblings.map((item) => (
              <Link
                key={item.slug}
                href={`/categories/${item.slug}`}
                prefetch={false}
                className="rounded-md border border-border bg-bg-elevated px-3 py-2 text-sm text-ink-soft transition hover:border-accent hover:text-brand"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </Reveal>
      ) : null}
    </>
  );
}
