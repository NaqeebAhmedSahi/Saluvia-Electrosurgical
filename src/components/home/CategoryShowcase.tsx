import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export type CategoryFamilyItem = {
  title: string;
  description: string;
  category: Category;
  productCount?: number;
  image?: string | null;
};

export type CategoryShowcaseProps = {
  families: CategoryFamilyItem[];
  eyebrow?: string;
  title?: string;
  support?: string;
};

export function CategoryShowcase({
  families,
  eyebrow = "Featured product families",
  title = "Featured Product Families",
  support = "Explore major instrument lines — bipolar forceps, electrodes, pencils, cables, and gynecology instruments — then drill into detailed categories.",
}: CategoryShowcaseProps) {
  if (!families.length) return null;

  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="section-space bg-bg-elevated/60"
    >
      <div className="container-site">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
            <h2
              id="categories-heading"
              className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              {support}
            </p>
          </Reveal>
          <Reveal delay={0.08} className="shrink-0">
            <Button href="/categories" variant="ghost">
              All categories
              <span aria-hidden="true">→</span>
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {families.map((family) => (
            <StaggerItem key={family.category.slug + family.title}>
              <Link
                href={`/categories/${family.category.slug}`}
                className={cn(
                  "group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-bg-elevated",
                  "shadow-sm transition-all duration-300 ease-out",
                  "hover:-translate-y-1 hover:border-accent/40 hover:shadow-md",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                )}
              >
                <div className="relative aspect-square overflow-hidden bg-white">
                  {family.image ? (
                    <Image
                      src={family.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  ) : (
                    <div
                      className="flex h-full items-center justify-center font-display text-lg text-ink-muted"
                      aria-hidden="true"
                    >
                      Saluvia
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="line-clamp-2 min-h-14 text-lg font-semibold leading-snug text-ink transition-colors group-hover:text-brand">
                      {family.title}
                    </h3>
                    <span
                      className="mt-1 shrink-0 text-accent transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>
                  <p className="mt-2 line-clamp-3 min-h-15 text-sm leading-relaxed text-ink-soft">
                    {family.description}
                  </p>
                  <p className="mt-auto border-t border-border pt-3 text-xs font-medium text-ink-muted">
                    {family.productCount ?? family.category.total_products}{" "}
                    {(family.productCount ?? family.category.total_products) ===
                    1
                      ? "product"
                      : "products"}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
