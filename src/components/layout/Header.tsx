"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import { CartLink } from "@/components/cart/CartLink";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const q = query.trim();
    setMenuOpen(false);
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-bg-elevated/90 shadow-sm backdrop-blur-md"
          : "border-transparent bg-bg-elevated/70 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex h-(--header-h) w-full max-w-(--container) items-center gap-4 px-4 sm:px-6 lg:px-8">
        <BrandLogo variant="header" priority />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-200",
                  active
                    ? "text-brand"
                    : "text-ink-soft hover:text-brand",
                )}
              >
                {link.label}
                {active ? (
                  <motion.span
                    layoutId={reduceMotion ? undefined : "nav-underline"}
                    className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <form
          onSubmit={submitSearch}
          role="search"
          className="ml-auto hidden max-w-xs flex-1 items-center md:flex"
        >
          <label htmlFor="header-search" className="sr-only">
            Search by product or code
          </label>
          <div className="group flex w-full items-center gap-2 rounded-md border border-border bg-bg px-3 py-2 transition-colors focus-within:border-accent focus-within:bg-bg-elevated">
            <Search className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
            <input
              id="header-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by product or code…"
              className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-2">
          <CartLink />
          <Link
            href="/contact"
            className="hidden items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold tracking-wide text-ink-inverse shadow-md transition-all duration-300 ease-out hover:bg-accent-bright hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:inline-flex"
          >
            Request Quote
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-bg-elevated text-ink transition-colors hover:border-accent hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:hidden"
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            key="mobile-menu"
            id="mobile-menu"
            className="lg:hidden"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-border bg-bg-elevated px-4 pb-6 pt-4 shadow-md sm:px-6">
              <form onSubmit={submitSearch} role="search" className="md:hidden">
                <label htmlFor="mobile-search" className="sr-only">
                  Search by product or code
                </label>
                <div className="flex w-full items-center gap-2 rounded-md border border-border bg-bg px-3 py-2.5 focus-within:border-accent">
                  <Search className="h-4 w-4 shrink-0 text-ink-muted" aria-hidden />
                  <input
                    id="mobile-search"
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search by product or code…"
                    className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
                  />
                </div>
              </form>

              <nav className="mt-2 flex flex-col" aria-label="Mobile">
                {NAV_LINKS.map((link) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-md px-3 py-3 text-base font-semibold transition-colors",
                        active
                          ? "bg-accent-muted/60 text-brand"
                          : "text-ink-soft hover:bg-bg-muted hover:text-brand",
                      )}
                    >
                      {link.label}
                      <ArrowRight className="h-4 w-4 opacity-60" aria-hidden />
                    </Link>
                  );
                })}
              </nav>

              <Link
                href="/contact"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold tracking-wide text-ink-inverse shadow-md transition-colors hover:bg-accent-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Request Quote
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

export default Header;
