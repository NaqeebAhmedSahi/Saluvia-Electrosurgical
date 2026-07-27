"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";

const QUICK_LINKS = [
  {
    href: "/categories",
    title: "Browse categories",
    description: "Explore electrosurgical product families by specialty.",
  },
  {
    href: "/products",
    title: "Full catalog",
    description: "Search by product code, title, or category.",
  },
  {
    href: "/about",
    title: "About Saluvia",
    description: "Manufacturing focus, values, and markets served.",
  },
];

export function ContactQuickLinks() {
  return (
    <section className="section-space border-t border-border bg-bg-elevated">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="Quick links"
            title="Continue exploring"
            description="While you wait for a reply, browse the catalog or review company background."
          />
        </Reveal>
        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3">
          {QUICK_LINKS.map((link) => (
            <StaggerItem key={link.href}>
              <Link
                href={link.href}
                className="group block h-full rounded-lg border border-border bg-bg px-5 py-5 transition-colors hover:border-accent/40"
              >
                <h3 className="font-display text-base font-semibold text-ink group-hover:text-brand">
                  {link.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {link.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-accent transition-transform group-hover:translate-x-0.5">
                  View →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
