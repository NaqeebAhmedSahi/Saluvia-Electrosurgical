import Link from "next/link";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { FooterAboutText } from "@/components/layout/FooterAboutText";
import { CATEGORY_FAMILIES } from "@/lib/category-families";

const EXPLORE_LINKS = [
  { label: "All Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Request a Quote", href: "/contact" },
  { label: "Product Search", href: "/products?q=" },
];

const COMPANY_LINKS = [
  { label: "About Saluvia Industries", href: "/about" },
  { label: "Contact", href: "/contact" },
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
            <FooterAboutText />
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

        <div className="mt-12 flex flex-col gap-3 border-t border-ink-inverse/10 pt-6 text-xs text-ink-inverse/55 sm:flex-row sm:items-center sm:justify-between">
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
