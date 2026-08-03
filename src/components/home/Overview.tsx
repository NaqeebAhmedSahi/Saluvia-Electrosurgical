"use client";

import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type OverviewProps = {
  eyebrow?: string;
  title?: string;
  body?: string;
  imageSrc?: string;
  imageAlt?: string;
  aboutHref?: string;
  aboutLabel?: string;
  quoteHref?: string;
  quoteLabel?: string;
  className?: string;
};

export function Overview({
  eyebrow = "Manufacturing",
  title = "Trusted Manufacturing Partner for Electrosurgery",
  body = "Saluvia Industries manufactures precision-engineered reusable and single-use electrosurgical instruments for hospitals, distributors, and OEM partners worldwide. Combining certified quality systems with advanced manufacturing, we deliver reliable products designed for consistent surgical performance.",
  imageSrc = "/hero/03_homepage_manufacturing_showcase.png",
  imageAlt = "Precision electrosurgical manufacturing showcase — Saluvia Industries",
  aboutHref = "/about",
  aboutLabel = "Explore Our Manufacturing",
  quoteHref = "/contact",
  quoteLabel = "Request a Quote",
  className,
}: OverviewProps) {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className={cn(
        "section-space relative overflow-hidden bg-bg-tint",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-brand/10 blur-3xl"
      />

      <div className="container-site relative grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h2
            id="overview-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink text-balance sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
            {body}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button
              href={aboutHref}
              variant="primary"
              className="bg-brand text-white hover:bg-brand-soft hover:text-white"
            >
              {aboutLabel}
              <span aria-hidden="true">→</span>
            </Button>
            <Button href={quoteHref} variant="outline">
              {quoteLabel}
            </Button>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg ring-1 ring-border/60">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
