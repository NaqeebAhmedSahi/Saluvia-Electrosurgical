"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";

export type PortfolioItem = {
  name: string;
  href: string;
};

export function ProductPortfolio({
  eyebrow = "Portfolio",
  title = "Product portfolio",
  description,
  items,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: PortfolioItem[];
}) {
  return (
    <section className="section-space bg-bg-tint/40">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        <Stagger className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <StaggerItem key={item.name}>
              <Link
                href={item.href}
                className="group flex items-center justify-between gap-3 border-b border-border py-3 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-brand"
              >
                <span>{item.name}</span>
                <span
                  aria-hidden
                  className="text-accent transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
