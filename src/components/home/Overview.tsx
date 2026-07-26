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
  body?: string | string[];
  aboutHref?: string;
  aboutLabel?: string;
  pillars?: OverviewPillar[];
  className?: string;
};

const DEFAULT_PILLARS: OverviewPillar[] = [
  {
    title: "Over 570 Electrosurgical Products",
    description:
      "A broad catalog spanning bipolar forceps, electrodes, pencils, cables, and specialty instruments.",
  },
  {
    title: "46 Product Categories",
    description:
      "Organized families for hospitals, distributors, and OEM buyers who specify by code and configuration.",
  },
  {
    title: "OEM & Private Label Solutions",
    description:
      "Customized manufacturing programs for medical device brands and private label partners worldwide.",
  },
  {
    title: "Global Export Experience",
    description:
      "Reliable production and supply for international markets, tenders, and multi-region distribution.",
  },
];

export function Overview({
  eyebrow = "Manufacturing",
  title = "Trusted Manufacturing Partner for Electrosurgery",
  lead = "From bipolar forceps and electrosurgical electrodes to cables, pencils, and specialty instruments, Saluvia Industries delivers precision-engineered solutions manufactured under internationally recognized quality systems with dependable production and consistent product performance.",
  body = [
    "At Saluvia Industries, we specialize in the design and manufacture of reusable and single-use electrosurgical instruments engineered for reliability, precision, and long-term clinical performance.",
    "Our manufacturing combines skilled craftsmanship with modern CNC machining, precision grinding, polishing, inspection, and rigorous quality control to produce instruments that meet the expectations of hospitals, distributors, and OEM brands across international markets.",
    "Whether you require standard catalog products or customized OEM solutions, our team provides responsive service, technical support, and consistent manufacturing quality.",
  ],
  aboutHref = "/about",
  aboutLabel = "About Saluvia",
  pillars = DEFAULT_PILLARS,
  className,
}: OverviewProps) {
  const bodyParagraphs = Array.isArray(body) ? body : [body];

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
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink-muted sm:text-base">
            {bodyParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8">
            <Button
              href={aboutHref}
              variant="secondary"
              className="bg-brand text-white hover:bg-brand-soft hover:text-white"
            >
              {aboutLabel}
              <span aria-hidden="true">→</span>
            </Button>
          </div>
        </Reveal>

        <Stagger className="grid gap-6 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-1 lg:gap-5">
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
