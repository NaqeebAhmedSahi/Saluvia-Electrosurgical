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
    src: "/hero/03_bayonet_bipolar_forceps.png",
    alt: "Precision bayonet bipolar forceps — Saluvia electrosurgical instruments",
    headline: "Precision Engineered Electrosurgical Instruments",
    support:
      "Trusted manufacturing partner for hospitals, OEM partners, medical distributors, and healthcare brands worldwide.",
    catalogHref: "/products",
    catalogLabel: "Explore Catalog",
    quoteHref: "/contact",
    quoteLabel: "Request a Quote",
    certifications: [
      "ISO 13485 Certified",
      "ISO 9001 Certified",
      "CE Mark Extension Letter",
      "OEM & Private Label Manufacturing",
    ],
  },
  {
    src: "/hero/02_straight_bipolar_forceps.png",
    alt: "Precision straight bipolar forceps for controlled electrosurgical performance",
    headline: "Precision Bipolar Forceps for Controlled Performance",
    support:
      "Designed for accurate tissue coagulation with superior handling, reliability, and minimal thermal spread.",
    catalogHref: "/categories/bipolar-forceps",
    catalogLabel: "Explore Products",
    quoteHref: "/contact",
    quoteLabel: "Request a Quote",
  },
  {
    src: "/hero/01_european_bipolar_forceps.png",
    alt: "European-style bipolar forceps with premium precision",
    headline: "European-Style Bipolar Forceps with Premium Precision",
    support:
      "Crafted to meet international standards, delivering exceptional balance, accuracy, and surgical confidence.",
    catalogHref: "/categories/european-bipolar-forceps",
    catalogLabel: "Explore Products",
    quoteHref: "/contact",
    quoteLabel: "Request a Quote",
  },
  {
    src: "/hero/04_electrosurgical_electrodes.png",
    alt: "Electrosurgical electrodes in multiple shapes and configurations",
    headline: "Electrosurgical Electrodes for Every Surgical Need",
    support:
      "Available in multiple shapes and configurations for precise cutting, coagulation, and dependable performance.",
    catalogHref: "/categories/bipolar-electrodes",
    catalogLabel: "Explore Products",
    quoteHref: "/contact",
    quoteLabel: "Request a Quote",
  },
  {
    src: "/hero/05_electrosurgical_pencil.png",
    alt: "Ergonomic electrosurgical pencil for accurate energy delivery",
    headline: "Ergonomic Electrosurgical Pencils for Maximum Control",
    support:
      "Lightweight, comfortable, and dependable for accurate energy delivery across a wide range of procedures.",
    catalogHref: "/categories/electrosurgical-pencils",
    catalogLabel: "Explore Products",
    quoteHref: "/contact",
    quoteLabel: "Request a Quote",
  },
  {
    src: "/hero/06_bipolar_cables_connectors.png",
    alt: "Durable bipolar cables and connectors for reliable operating room connectivity",
    headline: "Durable Electrosurgical Cables for Reliable Connectivity",
    support:
      "Engineered for secure connections, stable power transmission, and dependable operating room performance.",
    catalogHref: "/categories/bipolar-cables",
    catalogLabel: "Explore Products",
    quoteHref: "/contact",
    quoteLabel: "Request a Quote",
  },
];

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
        slides={HERO_SLIDES}
      />
      <Overview />
      <WhyChoose />
      <FeaturedProducts products={featured} />
      <CategoryShowcase families={families} />
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
