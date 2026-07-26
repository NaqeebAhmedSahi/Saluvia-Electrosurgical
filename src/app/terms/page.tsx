import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";
import { SITE_EMAILS, SITE_OFFICE, SITE_PHONE } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms governing professional use of the Saluvia Industries website and electrosurgical instrument catalog.",
};

export default function TermsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="These terms govern access to the Saluvia Industries website and catalog for professional B2B evaluation and inquiry."
      />
      <section className="section-space">
        <div className="container-site max-w-3xl space-y-8 text-sm leading-relaxed text-ink-soft">
          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Professional use
            </h2>
            <p>
              Catalog content is provided for professional buyers evaluating
              electrosurgical instruments. Instruments shown are intended for
              qualified healthcare professionals and authorized distribution
              partners. This site does not provide medical advice or patient
              care guidance.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Product information
            </h2>
            <p>
              Specifications, availability, and regulatory status may vary by
              market and configuration. Buyers should confirm details with
              Saluvia Industries before purchase, tender, or clinical adoption
              decisions. Images and descriptions are for identification and may
              not reflect every variant.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Inquiries and quotes
            </h2>
            <p>
              Submitting an inquiry does not create a binding purchase
              obligation. Quotes, samples, and commercial terms are handled
              through Saluvia Industries’ B2B sales process and any written
              agreement that follows.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Intellectual property
            </h2>
            <p>
              Site content, branding, and catalog materials are owned by Saluvia
              Industries or its licensors. You may not copy, scrape, or
              redistribute catalog data for competing commercial purposes without
              written permission.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Limitation of liability
            </h2>
            <p>
              To the extent permitted by law, Saluvia Industries is not liable
              for decisions made solely on the basis of website content. Use of
              instruments remains subject to applicable clinical protocols,
              training, and regulatory requirements in your market.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Contact
            </h2>
            <p>
              Questions about these terms may be directed to{" "}
              <a
                href={`mailto:${SITE_EMAILS.general}`}
                className="font-medium text-ink underline-offset-4 hover:underline"
              >
                {SITE_EMAILS.general}
              </a>
              {" "}
              or{" "}
              <a
                href={`tel:${SITE_PHONE.tel}`}
                className="font-medium text-ink underline-offset-4 hover:underline"
              >
                {SITE_PHONE.display}
              </a>
              . Saluvia Industries — {SITE_OFFICE.addressSingleLine}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
