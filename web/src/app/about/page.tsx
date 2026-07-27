import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { ValuesGrid } from "@/components/content/ValuesGrid";
import { WhySaluvia } from "@/components/content/WhySaluvia";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { MarketsSection } from "@/components/content/MarketsSection";
import { CtaBand } from "@/components/content/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: {
    absolute: "About Saluvia | Electrosurgical Instruments",
  },
  description:
    "Learn about Saluvia’s focus on electrosurgical instruments for hospitals, clinics, and distributors — manufacturing discipline, quality process, and B2B support.",
  openGraph: {
    title: "About Saluvia | Electrosurgical Instruments",
    description:
      "Company story, mission, manufacturing quality steps, and markets served for Saluvia electrosurgical instruments.",
  },
};

const STORY_PARAGRAPHS = [
  "Saluvia serves professional buyers who need clear product identification, reliable specifications, and a catalog structured for electrosurgical procurement — not consumer e-commerce.",
  "Our focus is a deep instrument line spanning bipolar and monopolar forceps, electrodes, pencils, cables, and specialty instruments used across surgical departments and distribution partners.",
  "We emphasize manufacturing discipline and documentation readiness so hospitals, clinics, OEMs, and distributors can evaluate instruments by code, coating, and configuration with confidence.",
];

const VALUES = [
  {
    title: "Precision",
    description:
      "Instrument geometry, tip options, and coatings specified clearly so procurement and clinical teams can compare like-for-like.",
  },
  {
    title: "Clarity",
    description:
      "Stable product codes, transparent variants, and catalog structure designed for B2B search and quote workflows.",
  },
  {
    title: "Accountability",
    description:
      "Quality steps from materials through packaging, with documentation available to qualified buyers upon request.",
  },
  {
    title: "Partnership",
    description:
      "Support for hospitals, clinics, distributors, and OEM programs through inquiry-led sales — not public cart pricing.",
  },
];

const DIFFERENTIATORS = [
  {
    title: "SKU depth",
    description:
      "Hundreds of electrosurgical SKUs organized by category for fast code-level discovery.",
  },
  {
    title: "Coating options",
    description:
      "Non-stick and related coating lines presented with clear variant attributes.",
  },
  {
    title: "European-style lines",
    description:
      "Instrument families aligned to common OR preferences and procurement patterns.",
  },
  {
    title: "B2B support",
    description:
      "Quote, sample, distributor, and technical inquiry paths with product-code capture.",
  },
];

const MANUFACTURING_STEPS = [
  {
    order: 1,
    title: "Materials",
    description:
      "Medical-grade metals and components selected for electrosurgical instrument performance.",
  },
  {
    order: 2,
    title: "Machining",
    description:
      "Precision forming and finishing of tips, shafts, and working surfaces to specification.",
  },
  {
    order: 3,
    title: "Coating",
    description:
      "Where applicable, controlled coating application for non-stick and related instrument lines.",
  },
  {
    order: 4,
    title: "Quality control",
    description:
      "Dimensional and functional checks against defined acceptance criteria before release.",
  },
  {
    order: 5,
    title: "Packaging",
    description:
      "Protective packaging prepared for distribution, sterilization workflows, and traceable SKUs.",
  },
];

const MARKETS = {
  regions: [
    "Domestic markets (to be confirmed)",
    "Export / international (to be confirmed)",
    "OEM private-label partners",
  ],
  segments: [
    "Hospitals & health systems",
    "Specialty clinics & ASCs",
    "Medical distributors",
    "OEM / private label",
  ],
  specialties: [
    { name: "Bipolar forceps", categorySlug: "bipolar-forceps" },
    { name: "European bipolar forceps", categorySlug: "european-bipolar-forceps" },
    { name: "Electrosurgical pencils", categorySlug: "electrosurgical-pencils" },
    { name: "Bipolar electrodes", categorySlug: "bipolar-electrodes" },
    {
      name: "Gynecology instruments",
      categorySlug: "electrosurgical-instruments-for-gynecology",
    },
    { name: "Arthroscopic electrodes", categorySlug: "arthroscopic-electrodes" },
  ],
};

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About"
        title="About Saluvia"
        description="B2B electrosurgical and medical instruments for hospitals, clinics, distributors, and OEM buyers — catalog clarity, manufacturing discipline, and inquiry-led support."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" variant="primary">
            Request a quote
          </Button>
          <Button
            href="/categories"
            variant="outline"
            className="border-ink-inverse/35 bg-transparent text-ink-inverse hover:border-accent-bright hover:bg-brand-soft hover:text-ink-inverse"
          >
            Browse catalog
          </Button>
        </div>
      </PageHero>

      <section className="section-space">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Company story"
              title="Instruments built for professional buyers"
            />
          </Reveal>
          <Reveal delay={0.08} className="space-y-5">
            {STORY_PARAGRAPHS.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-base leading-relaxed text-ink-soft sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <ValuesGrid
        eyebrow="Mission & values"
        title="What guides our catalog and support"
        mission="Deliver electrosurgical instruments with clear identification, consistent quality process, and B2B partnerships that respect clinical and procurement realities."
        values={VALUES}
      />

      <WhySaluvia items={DIFFERENTIATORS} />

      <ProcessSteps
        eyebrow="Manufacturing & quality"
        title="From materials to packaged SKU"
        intro="A disciplined sequence supports consistency across forceps, electrodes, and specialty instruments. Formal certification claims are published only after Saluvia confirms them."
        steps={MANUFACTURING_STEPS}
      />

      <section className="border-y border-border bg-bg-tint/50 py-10">
        <div className="container-site">
          <Reveal>
            <p className="max-w-3xl text-sm leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">Compliance note: </span>
              Regulatory and quality documentation is shared with qualified
              buyers on request. This page does not list ISO, CE, FDA, or other
              certification marks until Saluvia verifies status for publication.
            </p>
          </Reveal>
        </div>
      </section>

      <MarketsSection
        eyebrow="Markets served"
        title="Regions, segments, and specialties"
        description="Saluvia supports clinical and distribution partners across electrosurgical categories. Region details remain placeholders until commercial coverage is confirmed."
        regions={MARKETS.regions}
        segments={MARKETS.segments}
        specialties={MARKETS.specialties}
      />

      <CtaBand
        title="Ready to discuss supply?"
        description="Request a quote with product codes, or browse categories to build your inquiry list."
        primaryHref="/contact"
        primaryLabel="Request quote"
        secondaryHref="/categories"
        secondaryLabel="Browse catalog"
      />
    </div>
  );
}
