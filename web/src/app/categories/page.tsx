import type { Metadata } from "next";
import Link from "next/link";
import {
  allCategories,
  categoryThumb,
  clampText,
  totalProductCount,
} from "@/components/catalog/catalog-utils";
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs";
import { CategoryCard } from "@/components/catalog/CategoryCard";
import { PageHeader } from "@/components/catalog/PageHeader";
import { JsonLd } from "@/components/catalog/JsonLd";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Electrosurgical Product Categories",
  description: clampText(
    "Browse Saluvia electrosurgical product categories — bipolar forceps, electrodes, cables, gynecology instruments, and specialty surgical lines.",
  ),
};

export default function CategoriesPage() {
  const categories = allCategories();
  const total = totalProductCount();

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Electrosurgical Product Categories",
    description: metadata.description,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: categories.length,
      itemListElement: categories.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: category.name,
        url: `/categories/${category.slug}`,
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
          stats={[
            { label: "Categories", value: String(categories.length) },
            { label: "References", value: `${total}+` },
          ]}
          actions={
            <Button href="/products" variant="outline">
              Browse full catalog
            </Button>
          }
        />

        <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category) => (
            <StaggerItem key={category.slug}>
              <CategoryCard
                category={category}
                thumb={categoryThumb(category.slug)}
              />
            </StaggerItem>
          ))}
        </Stagger>

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
            <Link href="/contact" className="font-semibold text-brand hover:underline">
              Contact sales
            </Link>
          </p>
        </Reveal>
      </div>
      <JsonLd data={schema} />
    </div>
  );
}
