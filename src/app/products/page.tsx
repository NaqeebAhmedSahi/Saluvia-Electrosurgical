import type { Metadata } from "next";
import Link from "next/link";
import {
  allCategories,
  allProducts,
  applyFacets,
  buildFacets,
  buildHref,
  clampText,
  countActiveFacets,
  facetQueryParams,
  firstParam,
  listParam,
  matchesQuery,
  paginate,
  parsePage,
  parseSort,
  quoteHref,
  readFacetSelections,
  sortProducts,
  toggleValue,
  type SearchParamsInput,
} from "@/components/catalog/catalog-utils";
import {
  catalogCanonical,
  catalogListRobots,
  isFilteredCatalogQuery,
} from "@/lib/catalog-seo";
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs";
import { JsonLd } from "@/components/catalog/JsonLd";
import { PageHeader } from "@/components/catalog/PageHeader";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

type PageProps = {
  searchParams: Promise<SearchParamsInput>;
};

const PRODUCTS_DESCRIPTION = clampText(
  "Browse the Saluvia electrosurgical instruments catalog — forceps, electrodes, cables, and specialty surgical products with product codes for B2B quoting.",
);

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const query = await searchParams;
  const filtered = isFilteredCatalogQuery(query);

  return {
    title: "Electrosurgical Instruments Catalog",
    description: PRODUCTS_DESCRIPTION,
    robots: catalogListRobots(filtered),
    alternates: {
      canonical: catalogCanonical("/products"),
    },
  };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const query = await searchParams;
  const q = firstParam(query, "q") ?? "";
  const sort = parseSort(firstParam(query, "sort"));
  const page = parsePage(firstParam(query, "page"));
  const selectedCategories = listParam(query, "category");

  const categories = allCategories();
  let products = allProducts();

  if (selectedCategories.length) {
    products = products.filter((product) =>
      selectedCategories.includes(product.category_slug),
    );
  }
  if (q) products = products.filter((product) => matchesQuery(product, q));

  const facetSelections = readFacetSelections(query, [
    ...new Set(
      products.flatMap((product) => Object.keys(product.variants ?? {})),
    ),
  ]);
  products = applyFacets(products, facetSelections);
  products = sortProducts(products, sort, q || undefined);
  const facets = buildFacets(
    allProducts().filter((product) => {
      if (
        selectedCategories.length &&
        !selectedCategories.includes(product.category_slug)
      ) {
        return false;
      }
      if (q && !matchesQuery(product, q)) return false;
      return true;
    }),
    facetSelections,
  );
  const paged = paginate(products, page);
  const activeFacetCount = countActiveFacets(facetSelections);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Electrosurgical Instruments Catalog",
    description: PRODUCTS_DESCRIPTION,
  };

  return (
    <div className="section-space">
      <div className="container-site space-y-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products" },
          ]}
        />

        <PageHeader
          eyebrow="Catalog"
          title="Product catalog"
          description="Search by product code or name, filter by category and tip/size options, then request a quote with your selected references."
          actions={
            <Button href={quoteHref()} variant="primary">
              Request quote
            </Button>
          }
        />

        <div className="grid gap-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Reveal className="rounded-lg border border-border bg-bg-elevated p-4 shadow-sm">
              <form action="/products" method="get" className="space-y-4">
                <div>
                  <label
                    htmlFor="catalog-search"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted"
                  >
                    Search
                  </label>
                  <input
                    id="catalog-search"
                    name="q"
                    defaultValue={q}
                    placeholder="Search by product or code…"
                    className="w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm text-ink placeholder:text-ink-muted"
                  />
                </div>
                <div>
                  <label
                    htmlFor="catalog-sort"
                    className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted"
                  >
                    Sort
                  </label>
                  <select
                    id="catalog-sort"
                    name="sort"
                    defaultValue={sort}
                    className="w-full rounded-md border border-border bg-bg px-3 py-2.5 text-sm text-ink"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="az">Name (A–Z)</option>
                    <option value="code">Product code</option>
                    <option value="category">Category</option>
                  </select>
                </div>
                {selectedCategories.map((slug) => (
                  <input key={slug} type="hidden" name="category" value={slug} />
                ))}
                {Object.entries(facetSelections).flatMap(([key, values]) =>
                  values.map((value) => (
                    <input
                      key={`${key}-${value}`}
                      type="hidden"
                      name={`f-${key.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      value={value}
                    />
                  )),
                )}
                <Button type="submit" variant="secondary" className="w-full">
                  Update results
                </Button>
              </form>
            </Reveal>

            <Reveal delay={0.05} className="rounded-lg border border-border bg-bg-elevated p-4 shadow-sm">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                Categories
              </h2>
              <ul className="mt-3 max-h-72 space-y-1 overflow-auto pr-1">
                {categories.map((category) => {
                  const active = selectedCategories.includes(category.slug);
                  const next = toggleValue(selectedCategories, category.slug);
                  return (
                    <li key={category.slug}>
                      <Link
                        href={buildHref("/products", {
                          q: q || undefined,
                          sort: sort === "relevance" ? undefined : sort,
                          category: next,
                          ...facetQueryParams(facetSelections),
                        })}
                        rel="nofollow"
                        className={`flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm transition ${
                          active
                            ? "bg-accent-muted font-semibold text-brand"
                            : "text-ink-soft hover:bg-bg-muted hover:text-brand"
                        }`}
                      >
                        <span className="line-clamp-1">{category.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </Reveal>

            {facets.slice(0, 3).map((facet) => (
              <Reveal
                key={facet.key}
                className="rounded-lg border border-border bg-bg-elevated p-4 shadow-sm"
              >
                <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  {facet.key}
                </h2>
                <ul className="mt-3 space-y-1">
                  {facet.values.map((entry) => {
                    const current = facetSelections[facet.key] ?? [];
                    const nextValues = toggleValue(current, entry.value);
                    const nextSelections = {
                      ...facetSelections,
                      [facet.key]: nextValues,
                    };
                    return (
                      <li key={entry.value}>
                        <Link
                          href={buildHref("/products", {
                            q: q || undefined,
                            sort: sort === "relevance" ? undefined : sort,
                            category: selectedCategories,
                            ...facetQueryParams(nextSelections),
                          })}
                          rel="nofollow"
                          className={`flex items-center justify-between gap-2 rounded-md px-2 py-1.5 text-sm transition ${
                            entry.selected
                              ? "bg-accent-muted font-semibold text-brand"
                              : "text-ink-soft hover:bg-bg-muted hover:text-brand"
                          }`}
                        >
                          <span>{entry.value}</span>
                          <span className="text-xs text-ink-muted">
                            {entry.count}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}

            {(selectedCategories.length || activeFacetCount || q) ? (
              <Button href="/products" variant="ghost" className="w-full">
                Clear all filters
              </Button>
            ) : null}
          </aside>

          <div className="space-y-6">
            {paged.items.length ? (
              <Stagger
                key={`products-page-${paged.page}`}
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
              >
                {paged.items.map((product, index) => (
                  <StaggerItem key={product.code}>
                    <ProductCard product={product} priority={index < 6} />
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <Reveal className="rounded-lg border border-dashed border-border bg-bg-elevated p-10 text-center">
                <p className="font-display text-lg font-semibold text-ink">
                  No matching products
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  Adjust filters or browse categories instead.
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Button href="/products" variant="outline">
                    Reset
                  </Button>
                  <Button href="/categories" variant="primary">
                    Categories
                  </Button>
                </div>
              </Reveal>
            )}

            {paged.pageCount > 1 ? (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {Array.from({ length: paged.pageCount }, (_, i) => i + 1)
                  .slice(0, 12)
                  .map((pageNumber) => (
                    <Link
                      key={pageNumber}
                      href={buildHref("/products", {
                        q: q || undefined,
                        sort: sort === "relevance" ? undefined : sort,
                        category: selectedCategories,
                        page: pageNumber === 1 ? undefined : pageNumber,
                        ...facetQueryParams(facetSelections),
                      })}
                      rel="nofollow"
                      className={`rounded-md px-3 py-1.5 text-sm font-semibold ${
                        pageNumber === paged.page
                          ? "bg-brand text-ink-inverse"
                          : "border border-border bg-bg-elevated text-ink hover:border-accent"
                      }`}
                    >
                      {pageNumber}
                    </Link>
                  ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <JsonLd data={schema} />
    </div>
  );
}
