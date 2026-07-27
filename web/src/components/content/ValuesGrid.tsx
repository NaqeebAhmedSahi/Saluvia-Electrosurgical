"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";

export type ValueItem = {
  title: string;
  description: string;
};

export function ValuesGrid({
  eyebrow,
  title,
  description,
  mission,
  values,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  mission: string;
  values: ValueItem[];
}) {
  return (
    <section className="section-space">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        </Reveal>

        <Reveal delay={0.08} className="mt-10 max-w-3xl">
          <blockquote className="border-l-4 border-accent pl-6">
            <p className="font-display text-xl font-medium leading-relaxed text-ink sm:text-2xl">
              {mission}
            </p>
          </blockquote>
        </Reveal>

        <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value) => (
            <StaggerItem key={value.title}>
              <article>
                <div
                  aria-hidden
                  className="mb-4 h-1 w-10 rounded-full bg-accent"
                />
                <h3 className="font-display text-lg font-semibold text-ink">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {value.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
