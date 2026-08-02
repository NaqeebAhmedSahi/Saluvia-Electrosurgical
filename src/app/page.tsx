import type { Metadata } from "next";
import {
  CATEGORY_FAMILIES,
  getCategories,
  getCategoryThumb,
  getFeaturedProducts,
} from "@/lib/catalog";
import { Hero } from "@/components/home/Hero";
import { Overview } from "@/components/home/Overview";
import { WhyChoose } from "@/components/home/WhyChoose";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { Solutions } from "@/components/home/Solutions";
import { Quality } from "@/components/home/Quality";
import { QuoteBand } from "@/components/home/QuoteBand";
import { SITE_EMAILS, SITE_PHONE } from "@/lib/site-contact";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute:
      "Saluvia Industries | Electrosurgical Instruments Manufacturer — OEM & Global Supply",
  },
  description:
    "Precision electrosurgical instruments manufactured in Pakistan for hospitals, OEM partners, and medical distributors worldwide. Bipolar forceps, electrodes, pencils, and cables — ISO 13485 & ISO 9001 certified.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Saluvia Industries | Electrosurgical Instruments Manufacturer",
    description:
      "ISO-certified electrosurgical instrument manufacturer for hospitals, distributors, and OEM partners worldwide.",
    url: SITE_URL,
  },
};

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
    const familyProductCount = family.slugs.reduce((sum, slug) => {
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
        total_products: familyProductCount,
      },
      image: imageSlug ? getCategoryThumb(imageSlug) : null,
    };
  }).filter((f) => f.category);

  return (
    <>
      <Hero
        brand="Saluvia"
        brandSupport="Industries"
        headline="Precision Engineered Electrosurgical Instruments for Modern Surgery"
        support="Manufactured in Pakistan for hospitals, OEM partners, medical distributors, and healthcare brands worldwide."
        slides={[...HERO_SLIDES]}
        catalogHref="/products"
        quoteHref="/contact"
      />
      <Overview />
      <WhyChoose />
      <FeaturedProducts products={featured} />
      <CategoryShowcase families={families} />
      <Solutions />
      <Quality />
      <QuoteBand
        phone={SITE_PHONE.display}
        email={SITE_EMAILS.sales}
        secondaryHref="/products"
        secondaryLabel="Download Catalog"
      />
    </>
  );
}
