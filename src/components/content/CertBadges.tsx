"use client";

import { Check, ShieldCheck } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";

export type Certification = {
  code: string;
  label: string;
  detail: string;
};

export function CertBadges({
  eyebrow = "Quality & certifications",
  title = "Certified quality management",
  description,
  certifications,
  framework,
  note,
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  certifications: Certification[];
  framework: string[];
  note?: string;
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

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-3">
          {certifications.map((cert) => (
            <StaggerItem key={cert.code}>
              <article className="relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg-elevated px-6 py-7 shadow-sm">
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand to-accent"
                />
                <div className="flex size-14 items-center justify-center rounded-lg border border-accent/30 bg-accent-muted text-brand">
                  <ShieldCheck
                    className="size-7"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </div>
                <p className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">
                  {cert.code}
                </p>
                <p className="mt-1 text-sm font-semibold text-brand">
                  {cert.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                  {cert.detail}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.08} className="mt-12">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
            Quality framework
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {framework.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft sm:text-base"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent-muted text-accent">
                  <Check className="size-3" strokeWidth={2.5} aria-hidden />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        {note ? (
          <Reveal delay={0.1} className="mt-10 max-w-3xl">
            <p className="text-sm leading-relaxed text-ink-muted">{note}</p>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
