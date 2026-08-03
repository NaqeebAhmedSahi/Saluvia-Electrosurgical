import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type QualityPillar = {
  title: string;
  description: string;
};

export type QualityProps = {
  eyebrow?: string;
  title?: string;
  support?: string;
  pillars?: QualityPillar[];
  clinicalTitle?: string;
  clinicalSupport?: string;
  clinicalFeatures?: string[];
  processTitle?: string;
  processSupport?: string;
  processSteps?: string[];
  className?: string;
};

const DEFAULT_PILLARS: QualityPillar[] = [
  {
    title: "International Quality Standards",
    description:
      "Manufactured under certified ISO quality management systems.",
  },
  {
    title: "Consistent Product Performance",
    description:
      "Rigorous inspections help ensure repeatable manufacturing quality across every production batch.",
  },
  {
    title: "Complete Traceability",
    description:
      "Product codes and production records support efficient procurement, inventory management, and after-sales support.",
  },
  {
    title: "Long-Term Supply Reliability",
    description:
      "Stable manufacturing capacity and dependable production planning enable consistent global supply.",
  },
];

const DEFAULT_CLINICAL_FEATURES = [
  "Accurate tip geometry",
  "Superior electrical conductivity",
  "Excellent instrument balance",
  "Comfortable ergonomic handling",
  "Corrosion-resistant stainless steel",
  "Reliable insulation systems",
  "Smooth surface finishing",
  "Long-term durability",
];

const DEFAULT_PROCESS_STEPS = [
  "Raw Material Verification",
  "Precision CNC Machining",
  "Heat Treatment",
  "Surface Finishing & Polishing",
  "Assembly",
  "Electrical Performance Verification",
  "Functional Testing",
  "Final Quality Inspection",
  "Secure Packaging",
];

export function Quality({
  eyebrow = "Quality you can depend on",
  title = "Quality You Can Depend On",
  support = "Certified systems, consistent batch performance, and supply reliability for hospitals, distributors, and OEM partners.",
  pillars = DEFAULT_PILLARS,
  clinicalTitle = "Designed for Clinical Performance",
  clinicalSupport = "Careful attention to the details that support demanding surgical procedures.",
  clinicalFeatures = DEFAULT_CLINICAL_FEATURES,
  processTitle = "Manufacturing Excellence",
  processSupport = "A controlled production path from verified materials to secure packaging.",
  processSteps = DEFAULT_PROCESS_STEPS,
  className,
}: QualityProps) {
  if (!pillars.length) return null;

  return (
    <section
      id="quality"
      aria-labelledby="quality-heading"
      className={cn("section-space relative overflow-hidden", className)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: "var(--gradient-mist)" }}
        aria-hidden="true"
      />

      <div className="container-site relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            {eyebrow}
          </p>
          <h2
            id="quality-heading"
            className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {support}
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
          {pillars.map((pillar) => (
            <StaggerItem key={pillar.title} className="relative pl-5">
              <span
                className="absolute left-0 top-1 h-full w-px bg-border-strong"
                aria-hidden="true"
              />
              <span
                className="absolute -left-1.5 top-1.5 size-3 rounded-full border-2 border-accent bg-bg-elevated"
                aria-hidden="true"
              />
              <h3 className="text-xl font-semibold text-ink">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {pillar.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        {clinicalFeatures.length > 0 ? (
          <Reveal className="mt-20 border-t border-border pt-16">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                {clinicalTitle}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {clinicalSupport}
              </p>
            </div>
            <ul className="mt-10 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
              {clinicalFeatures.map((feature) => (
                <li
                  key={feature}
                  className="border-l border-accent/35 pl-4 text-sm leading-relaxed text-ink-soft"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        {processSteps.length > 0 ? (
          <Reveal className="mt-20 border-t border-border pt-16">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                {processTitle}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {processSupport}
              </p>
            </div>
            <ol className="mt-10 flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-sm text-ink-soft">
              {processSteps.map((step, index) => (
                <li key={step} className="flex items-center gap-2">
                  <span className="font-medium text-ink">{step}</span>
                  {index < processSteps.length - 1 ? (
                    <span className="text-accent" aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
