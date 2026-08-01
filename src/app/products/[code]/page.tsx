import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allProducts,
  findProduct,
  productMetaDescription,
  productSpecs,
  quoteHref,
  relatedFor,
  SITE_URL,
} from "@/components/catalog/catalog-utils";
import { catalogCanonical } from "@/lib/catalog-seo";
import { Breadcrumbs } from "@/components/catalog/Breadcrumbs";
import { JsonLd } from "@/components/catalog/JsonLd";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { variantSummary } from "@/lib/product-utils";

type PageProps = {
  params: Promise<{ code: string }>;
};

export async function generateStaticParams() {
  return allProducts().map((product) => ({
    code: product.code,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const product = findProduct(decodeURIComponent(code));
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.title} (${product.code}) | ${product.category_name}`,
    description: productMetaDescription(product),
    alternates: {
      canonical: catalogCanonical(
        `/products/${encodeURIComponent(product.code)}`,
      ),
    },
    openGraph: {
      title: `${product.title} (${product.code})`,
      description: productMetaDescription(product),
      images: [{ url: product.images.full || product.images.medium }],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { code } = await params;
  const product = findProduct(decodeURIComponent(code));
  if (!product) notFound();

  const related = relatedFor(product, 4);
  const specs = productSpecs(product);
  const summary = variantSummary(product);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    sku: product.code,
    mpn: product.code,
    description: productMetaDescription(product),
    image: [`${SITE_URL}${product.images.full || product.images.medium}`],
    brand: {
      "@type": "Brand",
      name: "Saluvia",
    },
    category: product.category_name,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${encodeURIComponent(product.code)}`,
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      price: "0",
      description: "Price on request — B2B inquiry",
    },
  };

  return (
    <div className="section-space-end">
      <div className="container-site space-y-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            {
              label: product.category_name,
              href: `/categories/${product.category_slug}`,
            },
            { label: product.title },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
          <Reveal className="relative overflow-hidden rounded-xl border border-border bg-bg-elevated shadow-md">
            <div className="relative aspect-square bg-white">
              <Image
                src={product.images.full || product.images.medium}
                alt={`${product.title} — ${product.code}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="space-y-6">
            <div>
              <Link
                href={`/categories/${product.category_slug}`}
                className="text-xs font-semibold uppercase tracking-[0.16em] text-accent hover:text-brand"
              >
                {product.category_name}
              </Link>
              <h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-brand-deep sm:text-4xl">
                {product.title}
              </h1>
              <p className="mt-3 inline-flex rounded-md bg-accent-muted px-3 py-1.5 text-sm font-bold tracking-[0.08em] text-brand">
                {product.code}
              </p>
            </div>

            {product.short_description ? (
              <p className="text-base leading-relaxed text-ink-soft">
                {product.short_description}
              </p>
            ) : null}

            {specs.length ? (
              <div className="overflow-hidden rounded-lg border border-border bg-bg-elevated">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {specs.map(([key, value]) => (
                      <tr
                        key={key}
                        className="border-b border-border last:border-b-0"
                      >
                        <th className="w-1/3 bg-bg-muted/60 px-4 py-3 font-semibold text-ink">
                          {key}
                        </th>
                        <td className="px-4 py-3 text-ink-soft">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : summary ? (
              <p className="rounded-lg border border-border bg-bg px-4 py-3 text-sm text-ink-soft">
                {summary}
              </p>
            ) : null}

            {product.note ? (
              <div className="rounded-lg border border-warning/30 bg-warning/10 px-4 py-3 text-sm text-ink">
                <p className="font-semibold text-warning">Note</p>
                <p className="mt-1 text-ink-soft">{product.note}</p>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3 pt-2">
              <AddToCartButton product={product} />
              <Button
                href={quoteHref({
                  code: product.code,
                  title: product.title,
                  category: product.category_name,
                })}
                variant="primary"
              >
                Request quote
              </Button>
              <Button
                href={`/categories/${product.category_slug}`}
                variant="outline"
              >
                More in category
              </Button>
            </div>
          </Reveal>
        </div>

        {related.length ? (
          <section className="space-y-6">
            <Reveal>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Related products
              </h2>
              <p className="mt-2 text-sm text-ink-soft">
                Nearby references from the same instrument family.
              </p>
            </Reveal>
            <Stagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <StaggerItem key={item.code}>
                  <ProductCard product={item} />
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        ) : null}
      </div>
      <JsonLd data={schema} />
    </div>
  );
}
