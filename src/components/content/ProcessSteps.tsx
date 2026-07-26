"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";

export type ProcessStep = {
  order: number;
  title: string;
  description: string;
};

export function ProcessSteps({
  eyebrow,
  title,
  intro,
  steps,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  steps: ProcessStep[];
}) {
  return (
    <section className="section-space bg-bg-elevated">
      <div className="container-site">
        <Reveal>
          <SectionHeading eyebrow={eyebrow} title={title} description={intro} />
        </Reveal>
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {steps.map((step) => (
            <StaggerItem key={step.order}>
              <article className="relative h-full border-t-2 border-accent pt-5">
                <span className="font-display text-sm font-semibold tabular-nums text-accent">
                  {String(step.order).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-ink sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {step.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
