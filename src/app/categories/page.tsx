import type { Metadata } from "next";
import { Suspense } from "react";
import {
  allCategories,
  categoryThumb,
  clampText,
} from "@/components/catalog/catalog-utils";
import { catalogCanonical } from "@/lib/catalog-seo";
import { toCatalogListCategory } from "@/lib/catalog-list-payload";
import { SITE_URL } from "@/lib/site";
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs";
import { CategoriesCatalogClient } from "@/components/catalog/CategoriesCatalogClient";
import { PageHeader } from "@/components/catalog/PageHeader";
import { JsonLd } from "@/components/catalog/JsonLd";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-static";

const CATEGORIES_DESCRIPTION = clampText(
  "Browse Saluvia electrosurgical product categories — bipolar forceps, electrodes, cables, gynecology instruments, and specialty surgical lines.",
);

export const metadata: Metadata = {
  title: "Electrosurgical Product Categories",
  description: CATEGORIES_DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: {
    canonical: catalogCanonical("/categories"),
  },
};

export default function CategoriesPage() {
  const categories = allCategories().map(toCatalogListCategory);
  const thumbs = Object.fromEntries(
    categories.map((category) => [category.slug, categoryThumb(category.slug)]),
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Electrosurgical Product Categories",
    description: CATEGORIES_DESCRIPTION,
    url: `${SITE_URL}/categories`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categories.length,
      itemListElement: categories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: category.name,
        url: `${SITE_URL}/categories/${category.slug}`,
      })),
    },
  };

  return (
    <div className="section-space">
      <div className="container-site space-y-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories" },
          ]}
        />
        <PageHeader
          eyebrow="Catalog"
          title="Product categories"
          description="Explore Saluvia’s electrosurgical instrument families. Select a category to view product codes, tip and size options, and imagery."
          actions={
            <Button href="/products" variant="outline">
              Browse full catalog
            </Button>
          }
        />

        <Suspense>
          <CategoriesCatalogClient categories={categories} thumbs={thumbs} />
        </Suspense>
      </div>
      <JsonLd data={schema} />
    </div>
  );
}
