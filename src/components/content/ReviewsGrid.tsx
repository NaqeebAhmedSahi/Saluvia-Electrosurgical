"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type Testimonial = {
  id: string;
  quote: string;
  quoteLong?: string;
  role: string;
  segment: string;
  specialty?: string;
  featured?: boolean;
  approved: boolean;
};

export function ReviewsEmptyState({
  title = "No published perspectives yet",
  description = "When professional feedback is available, it will appear here with anonymous role-based attribution. Saluvia does not display unverified named endorsements.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <Reveal className="rounded-xl border border-dashed border-border-strong bg-bg-elevated px-6 py-14 text-center shadow-sm sm:px-10">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        Reviews
      </p>
      <h2 className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
        {description}
      </p>
      <div className="mt-8 flex justify-center">
        <Button href="/contact" variant="primary">
          Share professional feedback
        </Button>
      </div>
    </Reveal>
  );
}

export function TestimonialCard({
  testimonial,
  featured = false,
  illustrative = false,
}: {
  testimonial: Testimonial;
  featured?: boolean;
  illustrative?: boolean;
}) {
  const body = featured && testimonial.quoteLong
    ? testimonial.quoteLong
    : testimonial.quote;

  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg border border-border bg-bg-elevated p-6 shadow-sm",
        featured && "md:p-8",
        illustrative && "border-dashed bg-bg-tint/40",
      )}
    >
      {illustrative ? (
        <span className="mb-4 w-fit rounded-sm bg-bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
          Sample format
        </span>
      ) : null}
      <blockquote
        className={cn(
          "flex-1 text-ink-soft leading-relaxed",
          featured ? "text-base sm:text-lg" : "text-sm",
          illustrative && "italic text-ink-muted",
        )}
      >
        “{body}”
      </blockquote>
      <footer className="mt-6 border-t border-border pt-4">
        <p className="text-sm font-semibold text-ink">{testimonial.role}</p>
        <p className="mt-0.5 text-xs text-ink-muted">
          {testimonial.segment}
          {testimonial.specialty ? ` · ${testimonial.specialty}` : ""}
        </p>
      </footer>
    </article>
  );
}

export function ReviewsGrid({
  testimonials,
  illustrativeExamples = [],
  disclaimer,
}: {
  testimonials: Testimonial[];
  illustrativeExamples?: Testimonial[];
  disclaimer: string;
}) {
  const approved = testimonials.filter((t) => t.approved);
  const featured = approved.filter((t) => t.featured);
  const rest = approved.filter((t) => !t.featured);
  const showEmpty = approved.length === 0;

  return (
    <section className="section-space">
      <div className="container-site">
        {showEmpty ? (
          <>
            <ReviewsEmptyState />
            {illustrativeExamples.length > 0 ? (
              <div className="mt-16">
                <Reveal>
                  <SectionHeading
                    eyebrow="Format reference"
                    title="How published feedback is framed"
                    description="Anonymous, role-based attribution focused on catalog and procurement workflows."
                  />
                </Reveal>
                <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
                  {illustrativeExamples.map((item) => (
                    <StaggerItem key={item.id}>
                      <TestimonialCard testimonial={item} illustrative />
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            ) : null}
          </>
        ) : (
          <>
            {featured.length > 0 ? (
              <div className="mb-16">
                <Reveal>
                  <SectionHeading
                    eyebrow="Featured"
                    title="Selected professional perspectives"
                  />
                </Reveal>
                <Stagger className="mt-10 grid gap-6 lg:grid-cols-2">
                  {featured.map((item) => (
                    <StaggerItem key={item.id}>
                      <TestimonialCard testimonial={item} featured />
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            ) : null}
            <Reveal>
              <SectionHeading
                eyebrow="All reviews"
                title="From clinical and procurement teams"
              />
            </Reveal>
            <Stagger className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((item) => (
                <StaggerItem key={item.id}>
                  <TestimonialCard testimonial={item} />
                </StaggerItem>
              ))}
            </Stagger>
          </>
        )}

        <Reveal delay={0.1} className="mt-14">
          <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-ink-muted">
            {disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
