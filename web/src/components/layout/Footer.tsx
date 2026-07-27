import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { CATEGORY_FAMILIES } from "@/lib/category-families";

const EXPLORE_LINKS = [
  { label: "All Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Request a Quote", href: "/contact" },
  { label: "Product Search", href: "/products?q=" },
];

const COMPANY_LINKS = [
  { label: "About Saluvia", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Reviews", href: "/reviews" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

const CONTACT_DETAILS = [
  {
    icon: MapPin,
    label: "Address",
    value: "Address line placeholder, City, Country",
    href: null,
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+00 000 000 0000",
    href: "tel:+000000000000",
  },
  {
    icon: Mail,
    label: "Email",
    value: "sales@saluvia.example",
    href: "mailto:sales@saluvia.example",
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border bg-brand-deep text-ink-inverse">
      <div className="mx-auto w-full max-w-(--container) px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep"
              aria-label="Saluvia — home"
            >
              <span
                aria-hidden
                className="grid h-9 w-9 place-items-center rounded-md bg-accent text-ink-inverse shadow-sm"
              >
                <span className="font-display text-lg font-bold leading-none">S</span>
              </span>
              <span className="font-display text-xl font-bold tracking-tight">
                Saluvia
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-inverse/70">
              Precision electrosurgical instruments for hospitals, clinics, and
              distributors — bipolar and monopolar forceps, electrodes, pencils,
              and cables in reusable and single-use lines.
            </p>

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
          Saluvia products are intended for use by qualified healthcare
          professionals and authorized B2B partners. Product availability,
          specifications, and regulatory clearances vary by region. Nothing on
          this site constitutes medical advice or a claim of clinical outcome.
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-ink-inverse/10 pt-6 text-xs text-ink-inverse/55 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Saluvia. All rights reserved.</p>
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
