"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";

export type FaqItem = {
  question: string;
  answer: string;
};

export function ContactFaq({
  items,
}: {
  items: readonly FaqItem[] | FaqItem[];
}) {
  return (
    <section className="section-space">
      <div className="container-site">
        <Reveal>
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently asked questions"
            description="Quick answers about OEM programs, quotations, documentation, and lead times."
          />
        </Reveal>
        <Stagger className="mx-auto mt-12 max-w-3xl divide-y divide-border border-t border-border">
          {items.map((item) => (
            <StaggerItem key={item.question}>
              <article className="py-6">
                <h3 className="font-display text-lg font-semibold text-ink">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft sm:text-base">
                  {item.answer}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
