import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export type QualityPillar = {
  title: string;
  description: string;
};

export type QualityProps = {
  pillars?: QualityPillar[];
};

const DEFAULT_PILLARS: QualityPillar[] = [
  {
    title: "Non-stick coatings",
    description:
      "Non-stick and ultra non-stick options help reduce tissue adhesion during electrosurgical use, supporting cleaner tip performance.",
  },
  {
    title: "Reusable & single-use",
    description:
      "Parallel instrument lines for hospitals and clinics that standardize on reprocessing — or prefer sterile single-use protocols.",
  },
  {
    title: "Code-first traceability",
    description:
      "Stable product codes across the catalog make quoting, reordering, and inventory matching straightforward for procurement teams.",
  },
  {
    title: "Sterilization-ready design",
    description:
      "Reusable instruments are designed with reprocessing workflows in mind, including compatible trays and practical handling details.",
  },
];

export function Quality({ pillars = DEFAULT_PILLARS }: QualityProps) {
  if (!pillars.length) return null;

  return (
    <section
      id="quality"
      aria-labelledby="quality-heading"
      className="section-space relative overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ background: "var(--gradient-mist)" }}
        aria-hidden="true"
      />

      <div className="container-site relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Why Saluvia
          </p>
          <h2
            id="quality-heading"
            className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl"
          >
            Quality that supports procurement
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Four practical considerations for B2B teams evaluating,
            specifying, and reordering electrosurgical instruments.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-x-12 lg:gap-y-14">
          {pillars.map((pillar, index) => (
            <StaggerItem key={pillar.title} className="relative pl-5">
              <span
                className="absolute left-0 top-1 h-full w-px bg-border-strong"
                aria-hidden="true"
              />
              <span
                className="absolute -left-1.5 top-1.5 size-3 rounded-full border-2 border-accent bg-bg-elevated"
                aria-hidden="true"
              />
              <p className="text-xs font-semibold tabular-nums text-ink-muted">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-ink">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {pillar.description}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
