import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import {
  allCategories,
  buildHref,
  categoryIntro,
  categoryMetaDescription,
  findCategory,
  productsInCategory,
  quoteHref,
} from "@/components/catalog/catalog-utils";
import { catalogCanonical } from "@/lib/catalog-seo";
import {
  toCatalogListCategory,
  toCatalogListProducts,
} from "@/lib/catalog-list-payload";
import { SITE_URL } from "@/lib/site";
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs";
import { CategoryDetailClient } from "@/components/catalog/CategoryDetailClient";
import { JsonLd } from "@/components/catalog/JsonLd";
import { PageHeader } from "@/components/catalog/PageHeader";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allCategories().map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) return { title: "Category not found" };
  const count =
    productsInCategory(slug).length || category.total_products;

  return {
    title: category.name,
    description: categoryMetaDescription(category, count),
    robots: { index: true, follow: true },
    alternates: {
      canonical: catalogCanonical(`/categories/${slug}`),
    },
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = findCategory(slug);
  if (!category) notFound();

  const products = productsInCategory(slug);

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
    description: categoryMetaDescription(category, products.length),
    url: `${SITE_URL}/categories/${slug}`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: `${product.title} (${product.code})`,
        url: `${SITE_URL}/products/${encodeURIComponent(product.code)}`,
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
          description={categoryIntro(category, products)}
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

        <Suspense>
          <CategoryDetailClient
            category={toCatalogListCategory(category)}
            products={toCatalogListProducts(products)}
            siblings={siblings.map(toCatalogListCategory)}
          />
        </Suspense>
      </div>
      <JsonLd data={schema} />
    </div>
  );
}
