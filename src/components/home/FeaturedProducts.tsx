import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/catalog/ProductCard";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export type FeaturedProductsProps = {
  products: Product[];
  eyebrow?: string;
  title?: string;
  support?: string;
};

export function FeaturedProducts({
  products,
  eyebrow = "Featured instruments",
  title = "Featured Electrosurgical Instruments",
  support = "A curated selection from the Saluvia Industries catalog — browse by code, category, and configuration.",
}: FeaturedProductsProps) {
  if (!products.length) return null;

  return (
    <section
      id="featured"
      aria-labelledby="featured-heading"
      className="section-space"
    >
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h2
            id="featured-heading"
            className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {support}
          </p>
        </Reveal>

        <Stagger className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product, index) => (
            <StaggerItem key={product.code}>
              <ProductCard product={product} priority={index < 4} />
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-12 flex justify-center" delay={0.12}>
          <Button href="/products" variant="outline">
            View all products
            <span aria-hidden="true">→</span>
          </Button>
        </Reveal>

      </div>
    </section>
  );
}
