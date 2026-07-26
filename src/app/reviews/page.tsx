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
    "Professional perspectives from procurement, distribution, and OR materials teams on working with Saluvia’s electrosurgical catalog.",
  openGraph: {
    title: "Customer Testimonials | Saluvia",
    description:
      "Anonymous, role-based professional feedback on Saluvia catalog clarity and B2B support — no clinical outcome claims.",
  },
};

/**
 * Anonymous, role-based professional perspectives.
 * Replace or extend when named, permissioned testimonials are available.
 */
const TESTIMONIALS: Testimonial[] = [
  {
    id: "procurement-hospital",
    quote:
      "Clear product codes and category structure help our sourcing team build quote lists faster and keep OR restock requests aligned to SKU.",
    role: "Procurement lead",
    segment: "Hospital system",
    specialty: "General surgery",
    approved: true,
  },
  {
    id: "distributor-territory",
    quote:
      "A stable SKU catalog with coating variants makes distributor training and replenishment planning more straightforward for our territory team.",
    role: "Territory manager",
    segment: "Medical distributor",
    specialty: "Electrosurgery",
    approved: true,
  },
  {
    id: "or-materials-clinic",
    quote:
      "Tip and size variants presented consistently reduce back-and-forth when clinical teams request instruments for scheduled cases.",
    role: "OR materials coordinator",
    segment: "Specialty clinic",
    specialty: "Gynecology",
    approved: true,
  },
];

const DISCLAIMER =
  "Individual professional experiences only. Saluvia does not publish patient outcome claims. Perspectives on this page use anonymous role-based attribution and describe catalog and procurement workflows — not clinical results.";

export default function ReviewsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Reviews"
        title="Professional perspectives"
        description="Feedback from clinical and procurement partners on catalog clarity, SKU structure, and B2B inquiry support."
      >
        <Button href="/contact" variant="primary">
          Contact Saluvia
        </Button>
      </PageHero>

      <ReviewsGrid testimonials={TESTIMONIALS} disclaimer={DISCLAIMER} />

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
