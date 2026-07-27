import {
  CATEGORY_FAMILIES,
  getCategories,
  getCategoryThumb,
  getFeaturedProducts,
} from "@/lib/catalog";
import { Hero } from "@/components/home/Hero";
import { Overview } from "@/components/home/Overview";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { Solutions } from "@/components/home/Solutions";
import { Quality } from "@/components/home/Quality";
import { QuoteBand } from "@/components/home/QuoteBand";

const HERO_SLIDES = [
  {
    src: "/hero/slide-01.png",
    alt: "Bipolar forceps on a surgical tray — Saluvia electrosurgical instruments",
  },
  {
    src: "/hero/slide-02.png",
    alt: "Electrosurgical instrument set prepared in a modern operating room",
  },
  {
    src: "/hero/slide-03.png",
    alt: "Electrosurgical pencil with blade and electrode tips",
  },
  {
    src: "/hero/slide-04.png",
    alt: "Electrosurgical pencils with blade and needle electrodes",
  },
  {
    src: "/hero/slide-05.png",
    alt: "Precision electrosurgical instruments in a modular organizer",
  },
] as const;

export default function HomePage() {
  const categories = getCategories();
  const featured = getFeaturedProducts(8);

  const families = CATEGORY_FAMILIES.map((family) => {
    const primary =
      categories.find((c) => family.slugs.includes(c.slug)) ??
      categories.find((c) => c.slug === family.slugs[0]);
    const productCount = family.slugs.reduce((sum, slug) => {
      const match = categories.find((c) => c.slug === slug);
      return sum + (match?.total_products ?? 0);
    }, 0);
    const imageSlug = family.slugs.find((slug) => getCategoryThumb(slug));
    return {
      title: family.title,
      description: family.description,
      category: primary ?? {
        name: family.title,
        slug: family.slugs[0],
        total_products: productCount,
      },
      productCount,
      image: imageSlug ? getCategoryThumb(imageSlug) : null,
    };
  }).filter((f) => f.category);

  return (
    <>
      <Hero
        brand="Saluvia"
        headline="Precision electrosurgical instruments for modern surgery"
        support="Browse bipolar forceps, electrodes, cables, and specialty instruments built for hospitals, clinics, and distributors."
        slides={[...HERO_SLIDES]}
        productCount={categories.reduce((n, c) => n + c.total_products, 0)}
        categoryCount={categories.length}
      />
      <Overview />
      <FeaturedProducts products={featured} />
      <CategoryShowcase families={families} />
      <Solutions />
      <Quality />
      <QuoteBand />
    </>
  );
}
