"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";

export type MissionVisionItem = {
  title: string;
  description: string;
};

export function MissionVision({
  eyebrow = "Purpose",
  title = "Our mission & vision",
  description,
  vision,
  mission,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  vision: MissionVisionItem;
  mission: MissionVisionItem;
}) {
  const items = [vision, mission];

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

        <Stagger className="mt-12 grid gap-10 md:grid-cols-2 md:gap-14">
          {items.map((item) => (
            <StaggerItem key={item.title}>
              <article className="h-full border-t-2 border-accent pt-6">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
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
