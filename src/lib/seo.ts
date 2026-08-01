import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

const DEFAULT_TITLE =
  "Saluvia Industries | Electrosurgical Instruments Manufacturer — OEM & Global Supply";
const DEFAULT_DESCRIPTION =
  "Saluvia Industries manufactures precision electrosurgical instruments in Pakistan — bipolar forceps, electrodes, pencils, cables, and specialty surgical tools for hospitals, distributors, and OEM partners. ISO 13485 & ISO 9001 certified.";

/**
 * Shared site metadata tuned for Google Search + social previews.
 * Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION in Vercel after Search Console setup.
 */
export function buildRootMetadata(): Metadata {
  const verification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: DEFAULT_TITLE,
      template: "%s | Saluvia Industries",
    },
    description: DEFAULT_DESCRIPTION,
    applicationName: "Saluvia Industries",
    keywords: [
      "Saluvia Industries",
      "electrosurgical instruments",
      "bipolar forceps manufacturer",
      "electrosurgical electrodes",
      "OEM medical devices",
      "private label surgical instruments",
      "ISO 13485",
      "Sialkot Pakistan",
      "electrosurgical cables",
      "electrosurgical pencils",
    ],
    authors: [{ name: "Saluvia Industries", url: SITE_URL }],
    creator: "Saluvia Industries",
    publisher: "Saluvia Industries",
    category: "Medical Devices",
    alternates: {
      canonical: SITE_URL,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [{ url: "/fav.jpeg", type: "image/jpeg" }],
      apple: [{ url: "/fav.jpeg", type: "image/jpeg" }],
      shortcut: "/fav.jpeg",
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: SITE_URL,
      siteName: "Saluvia Industries",
      title:
        "Saluvia Industries | Precision Electrosurgical Instrument Manufacturer",
      description:
        "B2B manufacturer of electrosurgical instruments for hospitals, medical distributors, and OEM partners worldwide. ISO-certified quality from Sialkot, Pakistan.",
      images: [
        {
          url: "/logo-removebg-preview.png",
          width: 775,
          height: 281,
          alt: "Saluvia Industries — Electrosurgical Instruments",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title:
        "Saluvia Industries | Electrosurgical Instruments Manufacturer",
      description:
        "ISO 13485 & ISO 9001 certified electrosurgical instruments for hospitals, distributors, and OEM partners worldwide.",
      images: ["/logo-removebg-preview.png"],
    },
    ...(verification
      ? { verification: { google: verification } }
      : {}),
  };
}
