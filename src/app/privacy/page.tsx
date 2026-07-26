import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";
import { SITE_EMAILS, SITE_OFFICE, SITE_PHONE } from "@/lib/site-contact";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Saluvia Industries collects and uses business contact information, inquiry form data, and cookies on this B2B website.",
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="This policy describes how Saluvia Industries handles information submitted through our B2B website and inquiry channels."
      />
      <section className="section-space">
        <div className="container-site max-w-3xl space-y-8 text-sm leading-relaxed text-ink-soft">
          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Scope
            </h2>
            <p>
              This website is intended for professional buyers, clinical
              procurement teams, distributors, and OEM partners evaluating
              Saluvia Industries electrosurgical instruments. It is not directed
              at consumers or patients seeking medical advice.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Information we collect
            </h2>
            <p>
              When you submit a quote or contact form, we may collect business
              contact details such as name, organization, role, email address,
              phone number, shipping or facility location, product codes of
              interest, and message content you choose to provide.
            </p>
            <p>
              We may also collect standard technical data from site visits,
              including browser type, device information, approximate location
              derived from IP address, and pages viewed, to operate and improve
              the site.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              How we use information
            </h2>
            <p>
              Inquiry data is used to respond to sales, sample, distributor, and
              technical requests; route messages to the appropriate Saluvia
              Industries desk; maintain B2B relationship records; and meet
              applicable legal or contractual obligations. We do not sell
              personal information.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Cookies and analytics
            </h2>
            <p>
              We may use cookies or similar technologies that are necessary for
              site functionality, as well as optional analytics cookies that help
              us understand how professional visitors use the catalog and
              inquiry pages. You can control cookies through your browser
              settings.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Sharing
            </h2>
            <p>
              We may share inquiry details with service providers who support
              email delivery, hosting, or CRM operations under appropriate
              confidentiality arrangements, and with authorized distribution
              partners when your request relates to a covered territory.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Retention and security
            </h2>
            <p>
              Business inquiry records are retained as needed for sales follow-up
              and legitimate business purposes. We apply reasonable administrative
              and technical safeguards appropriate to the sensitivity of B2B
              contact data.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="font-display text-lg font-semibold text-ink">
              Contact
            </h2>
            <p>
              For privacy-related questions about this site, contact{" "}
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
              . Saluvia Industries ({SITE_OFFICE.addressSingleLine}) may update
              this policy periodically; the version posted on this page is the
              current statement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
