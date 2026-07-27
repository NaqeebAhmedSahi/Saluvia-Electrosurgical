import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use placeholder for Saluvia.",
};

export default function TermsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="This page is a placeholder. Final terms will be published before production launch."
      />
      <section className="section-space">
        <div className="container-site max-w-3xl space-y-4 text-sm leading-relaxed text-ink-soft">
          <p>
            Catalog content is provided for professional buyers evaluating
            electrosurgical instruments. Product availability, specifications,
            and regulatory status may vary by market and should be confirmed
            with Saluvia before purchase decisions.
          </p>
          <p>
            Instruments shown are intended for qualified healthcare
            professionals and authorized distribution partners.
          </p>
        </div>
      </section>
    </div>
  );
}
