import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/content/PageHero";
import { ContactForm } from "@/components/content/ContactForm";
import { ContactChannels } from "@/components/content/ContactChannels";
import { ContactQuickLinks } from "@/components/content/ContactQuickLinks";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Saluvia | B2B Sales & Product Inquiries",
  },
  description:
    "Contact Saluvia for B2B quotes, samples, distributor partnerships, and technical product inquiries. Include product codes for faster routing.",
  openGraph: {
    title: "Contact Saluvia | B2B Sales & Product Inquiries",
    description:
      "Professional inquiry form and sales channel placeholders for hospitals, clinics, distributors, and OEM buyers.",
  },
};

const CHANNELS = [
  {
    type: "direct",
    label: "Direct sales",
    email: "sales@placeholder.saluvia",
    phone: "+00 000 000 0000 (placeholder)",
    note: "Primary desk for hospital and clinic quote requests.",
  },
  {
    type: "distributor",
    label: "Distributor partnerships",
    email: "partners@placeholder.saluvia",
    phone: "+00 000 000 0001 (placeholder)",
    note: "Territory and catalog access for authorized distributors.",
  },
  {
    type: "export-oem",
    label: "Export / OEM",
    email: "oem@placeholder.saluvia",
    phone: "+00 000 000 0002 (placeholder)",
    note: "Private-label and international program inquiries.",
  },
];

const OFFICE = {
  addressLines: ["Street address TBD", "Suite / building TBD"],
  city: "City TBD",
  country: "Country TBD",
  phone: "+00 000 000 0000 (placeholder)",
  email: "hello@placeholder.saluvia",
  businessHours: "Business hours TBD — weekday coverage placeholder",
};

function FormFallback() {
  return (
    <div className="h-[32rem] animate-pulse rounded-xl border border-border bg-bg-elevated shadow-md" />
  );
}

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title="Contact Saluvia"
        description="B2B inquiries only — quotes, samples, distributor programs, and technical questions for electrosurgical instruments. Include product codes when available."
      />

      <section className="section-space">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <Reveal>
            <Suspense fallback={<FormFallback />}>
              <ContactForm />
            </Suspense>
          </Reveal>
          <ContactChannels channels={CHANNELS} office={OFFICE} />
        </div>
      </section>

      <ContactQuickLinks />
    </div>
  );
}
