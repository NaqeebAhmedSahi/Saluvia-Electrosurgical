import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { CATEGORY_FAMILIES } from "@/lib/category-families";
import {
  SITE_EMAILS,
  SITE_OFFICE,
  SITE_PHONE,
} from "@/lib/site-contact";

const EXPLORE_LINKS = [
  { label: "All Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Request a Quote", href: "/contact" },
  { label: "Product Search", href: "/products?q=" },
];

const COMPANY_LINKS = [
  { label: "About Saluvia Industries", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Reviews", href: "/reviews" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

const CAPABILITY_CHIPS = [
  "OEM Manufacturing",
  "Private Label Solutions",
  "Worldwide Distribution",
  "Certified Quality",
  "Professional Surgical Instruments",
] as const;

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    label: "Address",
    value: SITE_OFFICE.addressSingleLine,
    href: null as string | null,
  },
  {
    icon: Phone,
    label: "Phone",
    value: SITE_PHONE.display,
    href: `tel:${SITE_PHONE.tel}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: SITE_EMAILS.general,
    href: `mailto:${SITE_EMAILS.general}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: SITE_OFFICE.businessHours,
    href: null as string | null,
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-brand-deep text-ink-inverse">
      <div className="mx-auto w-full max-w-(--container) px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandLogo variant="footer" />
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent-bright/90">
              Precision Electrosurgical Instrument Manufacturer
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-inverse/70">
              Saluvia Industries manufactures high-quality electrosurgical
              instruments for hospitals, medical distributors, OEM partners, and
              healthcare brands worldwide. Our portfolio includes bipolar
              forceps, electrosurgical electrodes, pencils, cables, and specialty
              surgical instruments under ISO 13485 and ISO 9001 certified quality
              systems. Supported by our CE Mark Extension Letter, we deliver
              precision manufacturing, dependable quality, and consistent global
              supply with a standard production lead time of approximately 6
              weeks.
            </p>

            <ul
              className="mt-5 flex flex-wrap gap-x-2 gap-y-1.5 text-[11px] leading-snug text-ink-inverse/55"
              aria-label="Capabilities"
            >
              {CAPABILITY_CHIPS.map((chip, index) => (
                <li key={chip} className="inline-flex items-center gap-2">
                  {index > 0 ? (
                    <span aria-hidden className="text-ink-inverse/30">
                      ·
                    </span>
                  ) : null}
                  <span>{chip}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-6 space-y-3">
              {CONTACT_DETAILS.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-start gap-3 text-sm">
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright"
                    aria-hidden
                  />
                  {href ? (
                    <a
                      href={href}
                      className="text-ink-inverse/80 transition-colors hover:text-ink-inverse"
                    >
                      <span className="sr-only">{label}: </span>
                      {value}
                    </a>
                  ) : (
                    <span className="text-ink-inverse/80">
                      <span className="sr-only">{label}: </span>
                      {value}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <nav
            className="lg:col-span-2"
            aria-label="Explore"
          >
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-inverse/50">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-inverse/75 transition-colors hover:text-accent-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="Product families">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-inverse/50">
              Product Families
            </h2>
            <ul className="mt-4 space-y-2.5">
              {CATEGORY_FAMILIES.map((family) => (
                <li key={family.title}>
                  <Link
                    href={`/categories/${family.slugs[0]}`}
                    className="text-sm text-ink-inverse/75 transition-colors hover:text-accent-bright"
                  >
                    {family.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="lg:col-span-3" aria-label="Company">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-inverse/50">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-inverse/75 transition-colors hover:text-accent-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-12 rounded-md border border-ink-inverse/10 bg-ink-inverse/5 px-4 py-3 text-xs leading-relaxed text-ink-inverse/60">
          <span className="font-semibold text-ink-inverse/80">
            For professional use only.
          </span>{" "}
          Saluvia Industries products are intended for use by qualified
          healthcare professionals and authorized B2B partners. Product
          availability, specifications, and regulatory clearances vary by
          market. Nothing on this site constitutes medical advice or a claim of
          clinical outcome.
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-ink-inverse/10 pt-6 text-xs text-ink-inverse/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Saluvia Industries. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors hover:text-ink-inverse"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors hover:text-ink-inverse"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="transition-colors hover:text-ink-inverse"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
