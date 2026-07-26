import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { MissionVision } from "@/components/content/MissionVision";
import { ProcessSteps } from "@/components/content/ProcessSteps";
import { CertBadges } from "@/components/content/CertBadges";
import {
  CapabilitiesGrid,
  type CapabilityItem,
} from "@/components/content/CapabilitiesGrid";
import { MarketsSection } from "@/components/content/MarketsSection";
import { WhySaluvia } from "@/components/content/WhySaluvia";
import { ProductPortfolio } from "@/components/content/ProductPortfolio";
import { CtaBand } from "@/components/content/CtaBand";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: {
    absolute: "About Saluvia Industries | Precision Electrosurgical Manufacturing",
  },
  description:
    "Saluvia Industries manufactures precision electrosurgical instruments under ISO 13485 and ISO 9001 quality systems — serving hospitals, distributors, and OEM partners worldwide.",
  openGraph: {
    title: "About Saluvia Industries | Precision Electrosurgical Manufacturing",
    description:
      "Precision manufacturing, certified quality, and global partnerships for electrosurgical instruments from Saluvia Industries.",
  },
};

const OVERVIEW_PARAGRAPHS = [
  "Saluvia Industries is a manufacturer of precision electrosurgical instruments serving hospitals, healthcare providers, medical distributors, and OEM partners worldwide.",
  "With years of manufacturing expertise, we specialize in producing reusable and single-use electrosurgical instruments that combine precision engineering, dependable performance, and internationally recognized quality standards.",
  "From bipolar forceps and electrosurgical electrodes to cables, pencils, and specialty surgical instruments, every product is manufactured with meticulous attention to quality, consistency, and clinical reliability.",
  "Our commitment to continuous improvement, advanced manufacturing processes, and customer-focused service has established Saluvia Industries as a trusted manufacturing partner for companies seeking reliable medical device solutions.",
];

const MANUFACTURING_STEPS = [
  {
    order: 1,
    title: "Material Selection",
    description:
      "Medical-grade materials selected for strength, conductivity, and clinical reliability.",
  },
  {
    order: 2,
    title: "CNC Machining",
    description:
      "Precision forming of tips, shafts, and working surfaces to exact specifications.",
  },
  {
    order: 3,
    title: "Heat Treatment",
    description:
      "Controlled thermal processes that stabilize instrument integrity and performance.",
  },
  {
    order: 4,
    title: "Precision Finishing",
    description:
      "Tool grinding, surface polishing, and finishing for ergonomic handling.",
  },
  {
    order: 5,
    title: "Assembly",
    description:
      "Skilled assembly of reusable and single-use instrument configurations.",
  },
  {
    order: 6,
    title: "Quality Inspection",
    description:
      "Dimensional checks and electrical performance verification before release.",
  },
  {
    order: 7,
    title: "Packaging",
    description:
      "Secure packaging with product traceability for global distribution.",
  },
];

const CERTIFICATIONS = [
  {
    code: "ISO 13485",
    label: "Medical devices QMS",
    detail:
      "Quality management system certified for the design and manufacture of medical devices.",
  },
  {
    code: "ISO 9001",
    label: "Quality management",
    detail:
      "Organization-wide quality processes supporting consistent manufacturing and continuous improvement.",
  },
  {
    code: "CE Mark",
    label: "Extension letter",
    detail:
      "CE Mark Extension Letter supporting market access pathways for applicable instrument lines.",
  },
];

const QUALITY_FRAMEWORK = [
  "Incoming material inspection",
  "In-process quality control",
  "Final inspection before shipment",
  "Complete manufacturing traceability",
];

const CAPABILITIES: CapabilityItem[] = [
  {
    title: "OEM Manufacturing",
    description:
      "Full production support for OEM programs, from quotation through long-term supply planning.",
    icon: "factory",
  },
  {
    title: "Private Label",
    description:
      "Private branding and customized packaging for distributors and medical device brands.",
    icon: "tag",
  },
  {
    title: "Custom Design",
    description:
      "Product customization aligned to clinical preferences, configurations, and brand requirements.",
    icon: "pen-tool",
  },
  {
    title: "Laser Marking",
    description:
      "Permanent laser marking for identification, branding, and lot-level product clarity.",
    icon: "scan-line",
  },
  {
    title: "Global Export",
    description:
      "Export-ready manufacturing from Pakistan / Sialkot for international healthcare markets.",
    icon: "globe",
  },
  {
    title: "Technical Documentation",
    description:
      "Regulatory documentation support and technical files for qualified buyers on request.",
    icon: "file-text",
  },
];

const DIFFERENTIATORS = [
  {
    title: "Precision Engineering",
    description:
      "Designed for dependable clinical performance, ergonomic handling, and long service life.",
  },
  {
    title: "Certified Quality",
    description:
      "Manufactured under ISO 13485 and ISO 9001 certified quality management systems.",
  },
  {
    title: "Reliable Delivery",
    description:
      "Standard production lead time of approximately 6 weeks.",
  },
  {
    title: "Long-Term Partnerships",
    description:
      "Dedicated support from quotation through production, quality documentation, and shipment.",
  },
];

const MARKETS = {
  regions: [
    "International healthcare markets served through distributors, OEM partnerships, and private label programs",
    "Manufactured in Pakistan / Sialkot for worldwide export",
  ],
  segments: [
    "Hospitals",
    "Healthcare Networks",
    "Medical Distributors",
    "Government Procurement",
    "Importers",
    "Medical Device Brands",
    "OEM Manufacturers",
  ],
};

const PORTFOLIO = [
  { name: "Bipolar Forceps", href: "/categories/bipolar-forceps" },
  {
    name: "European Bipolar Forceps",
    href: "/categories/european-bipolar-forceps",
  },
  {
    name: "Single-Use Bipolar Forceps",
    href: "/categories/bipolar-forceps-single-use",
  },
  { name: "Bipolar Electrodes", href: "/categories/bipolar-electrodes" },
  {
    name: "Arthroscopic Electrodes",
    href: "/categories/arthroscopic-electrodes",
  },
  {
    name: "Electrosurgical Pencils",
    href: "/categories/electrosurgical-pencils",
  },
  { name: "Bipolar & Monopolar Cables", href: "/categories/bipolar-cables" },
  {
    name: "Gynecology Instruments",
    href: "/categories/electrosurgical-instruments-for-gynecology",
  },
  { name: "Electrosurgical Accessories", href: "/products" },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Saluvia Industries"
        title="Manufacturing Precision for Modern Surgery"
        description="Precision electrosurgical instruments engineered for hospitals, distributors, and OEM partners — combining manufacturing discipline, certified quality, and dependable global supply."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" variant="primary">
            Request a Quote
          </Button>
          <Button
            href="/products"
            variant="outline"
            className="border-ink-inverse/35 bg-transparent text-ink-inverse hover:border-accent-bright hover:bg-brand-soft hover:text-ink-inverse"
          >
            Browse Products
          </Button>
        </div>
      </PageHero>

      <section className="section-space">
        <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Company overview"
              title="Precision Manufacturing. Trusted Quality. Global Partnerships."
            />
          </Reveal>
          <Reveal delay={0.08} className="space-y-5">
            {OVERVIEW_PARAGRAPHS.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                className="text-base leading-relaxed text-ink-soft sm:text-lg"
              >
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      <MissionVision
        eyebrow="Mission & vision"
        title="Guided by quality and partnership"
        vision={{
          title: "Vision",
          description:
            "To become a globally recognized manufacturer of innovative electrosurgical instruments by delivering exceptional quality, advanced manufacturing, and dependable partnerships that support healthcare professionals worldwide.",
        }}
        mission={{
          title: "Mission",
          description:
            "To manufacture precision electrosurgical instruments that meet international quality standards while providing hospitals, distributors, and OEM partners with reliable products, responsive service, and long-term manufacturing support.",
        }}
      />

      <ProcessSteps
        eyebrow="Manufacturing excellence"
        title="From material to packaged instrument"
        intro="Skilled craftsmanship and modern production technologies work together across every stage — including tool grinding and finishing, surface polishing, electrical performance verification, product traceability, and secure packaging."
        steps={MANUFACTURING_STEPS}
      />

      <CertBadges
        eyebrow="Quality & certifications"
        title="Internationally recognized quality standards"
        description="Our manufacturing operates under certified quality management systems designed for medical device consistency, safety, and traceability."
        certifications={CERTIFICATIONS}
        framework={QUALITY_FRAMEWORK}
        note="Quality and regulatory documentation is available to qualified buyers upon request."
      />

      <CapabilitiesGrid
        eyebrow="Manufacturing capabilities"
        title="Built for custom and long-term supply"
        description="Custom manufacturing, private branding, product customization, laser marking, customized packaging, regulatory documentation support, and long-term production planning."
        items={CAPABILITIES}
      />

      <MarketsSection
        eyebrow="Global markets"
        title="Serving healthcare partners worldwide"
        description="Saluvia Industries supports clinical and commercial partners across international healthcare markets through distributors, OEM partnerships, and private label programs."
        regions={MARKETS.regions}
        segments={MARKETS.segments}
        regionsLabel="Reach & origin"
        segmentsLabel="Markets served"
      />

      <WhySaluvia
        eyebrow="Why choose Saluvia"
        title="A manufacturing partner you can plan around"
        description="Precision engineering, certified quality systems, dependable lead times, and dedicated support from quote to shipment."
        items={DIFFERENTIATORS}
      />

      <ProductPortfolio
        eyebrow="Product portfolio"
        title="Electrosurgical instruments for professional buyers"
        description="A focused catalog spanning forceps, electrodes, pencils, cables, and specialty instruments."
        items={PORTFOLIO}
      />

      <section className="section-space pb-0">
        <div className="container-site max-w-3xl">
          <Reveal>
            <SectionHeading
              eyebrow="Our commitment"
              title="Quality you can count on"
              description="At Saluvia Industries, we are committed to manufacturing electrosurgical instruments that healthcare professionals can trust. Through certified quality systems, disciplined production, and responsive partnership, we support hospitals, distributors, and OEM brands with reliable supply and long-term manufacturing excellence."
            />
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Let's Build Your Next Surgical Solution."
        description="Whether you are sourcing electrosurgical instruments for your hospital, expanding your distribution portfolio, or developing your own medical device brand, Saluvia Industries is ready to support your business with precision manufacturing and dependable global supply."
        primaryHref="/contact"
        primaryLabel="Request a Quote"
        secondaryHref="/products"
        secondaryLabel="Browse Products"
        tertiaryHref="/contact"
        tertiaryLabel="Contact Our Team"
      />
    </div>
  );
}
