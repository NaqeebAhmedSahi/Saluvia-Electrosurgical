import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allCategories,
  buildHref,
  categoryIntro,
  categoryMetaDescription,
  categoryThumb,
  findCategory,
  firstParam,
  matchesQuery,
  paginate,
  parsePage,
  parseSort,
  productsInCategory,
  quoteHref,
  sortProducts,
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
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParamsInput>;
};

export async function generateStaticParams() {
  return allCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const category = findCategory(slug);
  if (!category) return { title: "Category not found" };
  const count = productsInCategory(slug).length || category.total_products;
  const filtered = isFilteredCatalogQuery(query);

  return {
    title: category.name,
    description: categoryMetaDescription(category, count),
    robots: catalogListRobots(filtered),
    alternates: {
      canonical: catalogCanonical(`/categories/${slug}`),
    },
  };
}

export default async function CategoryDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const query = await searchParams;
  const category = findCategory(slug);
  if (!category) notFound();

  const q = firstParam(query, "q") ?? "";
  const sort = parseSort(firstParam(query, "sort"));
  const page = parsePage(firstParam(query, "page"));

  let products = productsInCategory(slug);
  if (q) products = products.filter((product) => matchesQuery(product, q));
  products = sortProducts(products, sort, q || undefined);
  const paged = paginate(products, page);

  const siblings = allCategories()
    .filter((item) => item.slug !== slug)
    .filter((item) => {
      const root = slug.split("-").slice(0, 2).join("-");
      return item.slug.includes(root) || root.includes(item.slug.split("-")[0]);
    })
    .slice(0, 6);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: categoryMetaDescription(category, paged.total),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: paged.total,
      itemListElement: paged.items.map((product, index) => ({
        "@type": "ListItem",
        position: (paged.page - 1) * 24 + index + 1,
        name: `${product.title} (${product.code})`,
        url: `/products/${encodeURIComponent(product.code)}`,
      })),
    },
  };

  return (
    <div className="section-space">
      <div className="container-site space-y-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: category.name },
          ]}
        />

        <PageHeader
          eyebrow="Category"
          title={category.name}
          description={categoryIntro(category, productsInCategory(slug))}
          stats={[
            { label: "Products", value: String(paged.total) },
            {
              label: "Showing",
              value:
                paged.total === 0
                  ? "0"
                  : `${paged.from}–${paged.to}`,
            },
          ]}
          actions={
            <>
              <Button
                href={quoteHref({ category: category.name })}
                variant="primary"
              >
                Request quote
              </Button>
              <Button
                href={buildHref("/products", { category: slug })}
                variant="outline"
              >
                View in full catalog
              </Button>
            </>
          }
        />

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
                  className="rounded-md border border-border bg-bg-elevated px-3 py-2 text-sm text-ink-soft transition hover:border-accent hover:text-brand"
                >
                  {item.name}
                  <span className="ml-2 text-ink-muted">
                    ({item.total_products})
                  </span>
                </Link>
              ))}
            </div>
          </Reveal>
        ) : null}

        {!categoryThumb(slug) ? null : null}
      </div>
      <JsonLd data={schema} />
    </div>
  );
}
