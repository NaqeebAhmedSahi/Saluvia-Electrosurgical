"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function CtaBand({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  className,
}: {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
}) {
  return (
    <section className={cn("section-space", className)}>
      <Reveal className="container-site">
        <div className="relative overflow-hidden rounded-xl bg-brand px-8 py-12 text-ink-inverse shadow-lg sm:px-12 sm:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, color-mix(in srgb, var(--accent) 45%, transparent) 100%)",
            }}
          />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-inverse/85">
              {description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={primaryHref} variant="primary">
                {primaryLabel}
              </Button>
              {secondaryHref && secondaryLabel ? (
                <Button
                  href={secondaryHref}
                  variant="outline"
                  className="border-ink-inverse/30 bg-transparent text-ink-inverse hover:border-accent-bright hover:bg-brand-soft hover:text-ink-inverse"
                >
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
