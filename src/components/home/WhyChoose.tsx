"use client";

import {
  Reveal,
  Stagger,
  StaggerItem,
} from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type WhyChooseItem = {
  title: string;
  description: string;
};

export type WhyChooseProps = {
  eyebrow?: string;
  title?: string;
  support?: string;
  items?: WhyChooseItem[];
  className?: string;
};

const DEFAULT_ITEMS: WhyChooseItem[] = [
  {
    title: "Precision Manufacturing",
    description:
      "Every instrument is engineered for optimal balance, precise tip alignment, electrical performance, and ergonomic handling to support demanding surgical procedures.",
  },
  {
    title: "Certified Quality Management",
    description:
      "Manufactured under internationally recognized quality systems including ISO 13485, ISO 9001, CE Mark Extension Letter, comprehensive in-process and final quality inspection, and full manufacturing traceability. Every production batch undergoes strict inspection before shipment.",
  },
  {
    title: "Reliable Lead Time",
    description:
      "Efficient manufacturing planning allows us to maintain dependable delivery schedules. Standard Production Lead Time approximately 6 Weeks. Urgent projects and OEM production schedules can be discussed based on product type and order volume.",
  },
  {
    title: "OEM & Global Partnership",
    description:
      "We support Medical Device Brands, Healthcare Distributors, Hospital Procurement Teams, Government Tenders, Private Label Programs, International OEM Manufacturing. Flexible manufacturing capabilities help partners build long-term supply chains with confidence.",
  },
];

export function WhyChoose({
  eyebrow = "Partnership",
  title = "Why Choose Saluvia Industries",
  support = "Precision manufacturing, certified quality systems, dependable lead times, and OEM partnership built for global healthcare buyers.",
  items = DEFAULT_ITEMS,
  className,
}: WhyChooseProps) {
  if (!items.length) return null;

  return (
    <section
      id="why-choose"
      aria-labelledby="why-choose-heading"
      className={cn("section-space", className)}
    >
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h2
            id="why-choose-heading"
            className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {support}
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
          {items.map((item, index) => (
            <StaggerItem key={item.title} className="relative pl-5">
              <span
                className="absolute left-0 top-1 h-full w-px bg-border-strong"
                aria-hidden="true"
              />
              <span
                className="absolute -left-1.5 top-1.5 size-3 rounded-full border-2 border-accent bg-bg-elevated"
                aria-hidden="true"
              />
              <p className="text-xs font-semibold tabular-nums text-ink-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {item.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
