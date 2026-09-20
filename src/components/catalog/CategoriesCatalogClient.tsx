"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { CategoryCard } from "@/components/catalog/CategoryCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { firstParam, searchParamsFromReadonly } from "@/lib/catalog-query";
import type { CatalogListCategory } from "@/lib/catalog-list-payload";

type CategoriesCatalogClientProps = {
  categories: CatalogListCategory[];
  thumbs: Record<string, string | null>;
};

function matchesCategoryQuery(
  name: string,
  slug: string,
  query: string,
): boolean {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return (
    name.toLowerCase().includes(needle) ||
    slug.toLowerCase().replace(/-/g, " ").includes(needle) ||
    slug.toLowerCase().includes(needle)
  );
}

export function CategoriesCatalogClient({
  categories: allCategories,
  thumbs,
}: CategoriesCatalogClientProps) {
  const searchParams = useSearchParams();
  const query = useMemo(
    () => searchParamsFromReadonly(searchParams),
    [searchParams],
  );
  const q = firstParam(query, "q") ?? "";

  const categories = useMemo(
    () =>
      allCategories.filter((category) =>
        matchesCategoryQuery(category.name, category.slug, q),
      ),
    [allCategories, q],
  );

  return (
    <>
      <Reveal className="rounded-lg border border-border bg-bg-elevated p-4 shadow-sm sm:p-5">
        <form
          action="/categories"
          method="get"
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
        >
          <div className="min-w-0 flex-1">
            <label
              htmlFor="category-search"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted"
            >
              Search
            </label>
            <input
              id="category-search"
              name="q"
              defaultValue={q}
              placeholder="Search categories by name…"
              className="w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted"
            />
          </div>
          <div className="flex shrink-0 gap-2">
            <Button type="submit" variant="secondary">
              Filter
            </Button>
            {q ? (
              <Button href="/categories" variant="ghost">
                Clear
              </Button>
            ) : null}
          </div>
        </form>
      </Reveal>

      {categories.length ? (
        <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <StaggerItem key={category.slug}>
              <CategoryCard
                category={category}
                thumb={thumbs[category.slug] ?? null}
              />
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <Reveal className="rounded-xl border border-border bg-bg-elevated px-6 py-12 text-center shadow-sm">
          <h2 className="font-display text-xl font-semibold text-ink">
            No categories match “{q}”
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-soft">
            Try a different name, or browse the full category list.
          </p>
          <div className="mt-6">
            <Button href="/categories" variant="outline">
              Clear search
            </Button>
          </div>
        </Reveal>
      )}

      <Reveal className="rounded-xl border border-border bg-bg-elevated p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-xl font-semibold text-ink">
              Looking for a product code?
            </h2>
            <p className="mt-2 max-w-xl text-sm text-ink-soft">
              Search the full catalog by code or name, then request a quote
              with your preferred references.
            </p>
          </div>
          <Button href="/products" variant="primary">
            Open product catalog
          </Button>
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          Prefer a direct inquiry?{" "}
          <Link
            href="/contact"
            prefetch={false}
            className="font-semibold text-brand hover:underline"
          >
            Contact sales
          </Link>
        </p>
      </Reveal>
    </>
  );
}
