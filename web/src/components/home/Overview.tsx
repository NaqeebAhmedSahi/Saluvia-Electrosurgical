"use client";

import { Button } from "@/components/ui/Button";
import {
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type OverviewPillar = {
  title: string;
  description: string;
};

export type OverviewProps = {
  eyebrow?: string;
  title?: string;
  lead?: string;
  body?: string;
  aboutHref?: string;
  aboutLabel?: string;
  pillars?: OverviewPillar[];
  className?: string;
};

const DEFAULT_PILLARS: OverviewPillar[] = [
  {
    title: "Precision engineering",
    description:
      "Instrument geometry and tip control tuned for consistent electrosurgical performance across specialties.",
  },
  {
    title: "Manufacturing quality",
    description:
      "Reusable and single-use lines built for reliable handling, cleanability, and OR workflow fit.",
  },
  {
    title: "B2B partnership",
    description:
      "Code-first cataloging and quote-led procurement for hospitals, clinics, distributors, and OEM buyers.",
  },
];

export function Overview({
  eyebrow = "Company",
  title = "Built for clinical precision and B2B clarity",
  lead = "Saluvia supplies electrosurgical instruments for teams that specify by performance, compatibility, and product code—not by guesswork.",
  body = "From bipolar forceps and electrodes to cables and specialty sets, our catalog is organized for procurement speed: clear SKUs, consistent imagery, and direct paths from browse to quote.",
  aboutHref = "/about",
  aboutLabel = "Learn more",
  pillars = DEFAULT_PILLARS,
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

      <div className="container-site relative grid gap-12 lg:grid-cols-12 lg:gap-16">
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
            {lead}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
            {body}
          </p>
          <div className="mt-8">
            <Button
              href={aboutHref}
              variant="secondary"
              className="bg-brand text-white hover:bg-brand-soft hover:text-white"
            >
              {aboutLabel}
            </Button>
          </div>
        </Reveal>

        <Stagger className="grid gap-6 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-1 lg:gap-5">
          {pillars.map((pillar, i) => (
            <StaggerItem key={pillar.title}>
              <article className="relative border-l border-accent/40 pl-5 lg:pl-6">
                <span
                  aria-hidden
                  className="absolute -left-px top-0 h-8 w-px bg-accent"
                />
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {pillar.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
