"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";

export type SpecialtyLink = {
  name: string;
  categorySlug: string;
};

export function MarketsSection({
  eyebrow,
  title,
  description,
  regions,
  segments,
  specialties,
  regionsLabel = "Regions",
  segmentsLabel = "Buyer segments",
  specialtiesLabel = "Clinical focus areas",
}: {
  eyebrow?: string;
  title: string;
  description: string;
  regions: string[];
  segments: string[];
  specialties?: SpecialtyLink[];
  regionsLabel?: string;
  segmentsLabel?: string;
  specialtiesLabel?: string;
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

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                {regionsLabel}
              </h3>
              <ul className="mt-4 space-y-3">
                {regions.map((region) => (
                  <li
                    key={region}
                    className="border-l-2 border-accent/60 pl-4 text-sm leading-relaxed text-ink-soft sm:text-base"
                  >
                    {region}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                {segmentsLabel}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {segments.map((segment) => (
                  <li
                    key={segment}
                    className="rounded-md border border-border bg-bg-elevated px-3 py-1.5 text-sm text-ink-soft"
                  >
                    {segment}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {specialties && specialties.length > 0 ? (
          <>
            <Reveal delay={0.1} className="mt-12">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                {specialtiesLabel}
              </h3>
            </Reveal>
            <Stagger className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {specialties.map((item) => (
                <StaggerItem key={item.categorySlug}>
                  <Link
                    href={`/categories/${item.categorySlug}`}
                    className="group flex items-center justify-between gap-3 rounded-md border border-border bg-bg-elevated px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-accent/50 hover:text-brand"
                  >
                    <span>{item.name}</span>
                    <span className="text-accent transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          </>
        ) : null}
      </div>
    </section>
  );
}
