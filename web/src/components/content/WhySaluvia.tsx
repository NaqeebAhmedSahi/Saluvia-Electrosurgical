"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";

export type Differentiator = {
  title: string;
  description: string;
};

export function WhySaluvia({
  items,
}: {
  items: Differentiator[];
}) {
  return (
    <section className="section-space bg-brand text-ink-inverse">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="Why Saluvia"
            title="Built for professional procurement"
            description="Depth of catalog, coating options, and B2B support aligned to hospital, clinic, and distributor workflows."
            invert
          />
        </Reveal>
        <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <article className="h-full border-t border-accent/50 pt-5">
                <h3 className="font-display text-lg font-semibold text-ink-inverse">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-inverse/75">
                  {item.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
