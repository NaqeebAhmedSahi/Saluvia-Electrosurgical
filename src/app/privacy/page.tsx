import type { Metadata } from "next";
import { PageHero } from "@/components/content/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy placeholder for Saluvia.",
};

export default function PrivacyPage() {
  return (
    <div>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="This page is a placeholder. Final privacy policy text will be published before production indexing."
      />
      <section className="section-space">
        <div className="container-site max-w-3xl space-y-4 text-sm leading-relaxed text-ink-soft">
          <p>
            Saluvia will publish its complete privacy policy here, covering how
            inquiry form data, analytics, and cookies are handled for B2B
            visitors.
          </p>
          <p>
            Until then, do not submit sensitive personal data beyond what is
            required for a professional sales inquiry.
          </p>
        </div>
      </section>
    </div>
  );
}
