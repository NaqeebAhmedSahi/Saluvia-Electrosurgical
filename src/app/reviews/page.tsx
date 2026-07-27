import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";
import { ReviewsGrid, type Testimonial } from "@/components/content/ReviewsGrid";
import { CtaBand } from "@/components/content/CtaBand";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: {
    absolute: "Customer Testimonials | Saluvia",
  },
  description:
    "Professional testimonials for Saluvia electrosurgical instruments. Verified feedback will appear here; launch state uses anonymous role-based formatting only.",
  openGraph: {
    title: "Customer Testimonials | Saluvia",
    description:
      "Launch-ready testimonials architecture for Saluvia — no unverified named endorsements.",
  },
};

/** Approved testimonials feed — empty until Saluvia publishes verified entries. */
const TESTIMONIALS: Testimonial[] = [];

/**
 * Anonymous role-based format examples only.
 * Not attributed to real customers; clearly labeled in the UI.
 */
const ILLUSTRATIVE_EXAMPLES: Testimonial[] = [
  {
    id: "example-procurement",
    quote:
      "[Example] Clear product codes and category structure would help our sourcing team build quote lists faster.",
    role: "Procurement lead",
    segment: "Hospital system",
    specialty: "General surgery",
    approved: false,
  },
  {
    id: "example-distributor",
    quote:
      "[Example] A stable SKU catalog with coating variants would simplify distributor training and replenishment.",
    role: "Territory manager",
    segment: "Medical distributor",
    specialty: "Electrosurgery",
    approved: false,
  },
  {
    id: "example-clinical",
    quote:
      "[Example] Tip and size variants presented consistently would reduce back-and-forth during instrument selection.",
    role: "OR materials coordinator",
    segment: "Specialty clinic",
    specialty: "Gynecology",
    approved: false,
  },
];

const DISCLAIMER =
  "Individual professional experiences only. Saluvia does not publish patient outcome claims. Named customer endorsements appear only when approved and attributed with permission. Illustrative examples on this page are anonymous role-based format previews — not real testimonials.";

export default function ReviewsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Reviews"
        title="Professional perspectives"
        description="A dedicated space for verified feedback from clinical and procurement partners. Until approved testimonials are published, this page remains in launch state."
      >
        <Button href="/contact" variant="primary">
          Contact Saluvia
        </Button>
      </PageHero>

      <ReviewsGrid
        testimonials={TESTIMONIALS}
        illustrativeExamples={ILLUSTRATIVE_EXAMPLES}
        disclaimer={DISCLAIMER}
      />

      <CtaBand
        title="Discuss instruments with our team"
        description="Request a quote with product codes, or ask about distributor and OEM programs."
        primaryHref="/contact"
        primaryLabel="Request quote"
        secondaryHref="/products"
        secondaryLabel="View catalog"
      />
    </div>
  );
}
