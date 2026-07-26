"use client";

import type { LucideIcon } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";

export type CapabilityItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function CapabilitiesGrid({
  eyebrow = "Capabilities",
  title = "Manufacturing capabilities",
  description,
  items,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  items: CapabilityItem[];
}) {
  return (
    <section className="section-space bg-bg-elevated">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <article className="h-full border-t-2 border-accent pt-5">
                  <span className="mb-4 flex size-11 items-center justify-center rounded-lg border border-border/70 bg-accent-muted text-brand">
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
