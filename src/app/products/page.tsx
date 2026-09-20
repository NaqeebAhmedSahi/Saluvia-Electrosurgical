import type { Metadata } from "next";
import { Suspense } from "react";
import {
  allCategories,
  allProducts,
  clampText,
  quoteHref,
} from "@/components/catalog/catalog-utils";
import { catalogCanonical } from "@/lib/catalog-seo";
import {
  toCatalogListCategory,
  toCatalogListProducts,
} from "@/lib/catalog-list-payload";
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs";
import { JsonLd } from "@/components/catalog/JsonLd";
import { PageHeader } from "@/components/catalog/PageHeader";
import { ProductsCatalogClient } from "@/components/catalog/ProductsCatalogClient";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-static";

const PRODUCTS_DESCRIPTION = clampText(
  "Browse the Saluvia electrosurgical instruments catalog — forceps, electrodes, cables, and specialty surgical products with product codes for B2B quoting.",
);

export const metadata: Metadata = {
  title: "Electrosurgical Instruments Catalog",
  description: PRODUCTS_DESCRIPTION,
  robots: { index: true, follow: true },
  alternates: {
    canonical: catalogCanonical("/products"),
  },
};

export default function ProductsPage() {
  const categories = allCategories().map(toCatalogListCategory);
  const products = toCatalogListProducts(allProducts());

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

        <Suspense>
          <ProductsCatalogClient products={products} categories={categories} />
        </Suspense>
      </div>
      <JsonLd data={schema} />
    </div>
  );
}
