import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Award,
  Building2,
  Clock,
  Factory,
  Handshake,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  Sparkles,
  Tag,
  Timer,
  Truck,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import { PageHero } from "@/components/content/PageHero";
import { SectionHeading } from "@/components/content/SectionHeading";
import { ContactForm } from "@/components/content/ContactForm";
import { ContactChannels } from "@/components/content/ContactChannels";
import { ContactFaq } from "@/components/content/ContactFaq";
import { ContactQuickLinks } from "@/components/content/ContactQuickLinks";
import { Button } from "@/components/ui/Button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import {
  SITE_OFFICE,
  SITE_PHONE,
  SITE_SALES_CHANNELS,
} from "@/lib/site-contact";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Saluvia Industries | Quotes, OEM & Partnerships",
  },
  description:
    "Contact Saluvia Industries for electrosurgical instrument quotations, OEM and private-label manufacturing, technical documentation, and distributor partnerships. Based in Sialkot, Pakistan.",
  openGraph: {
    title: "Contact Saluvia Industries | Quotes, OEM & Partnerships",
    description:
      "Reach Saluvia Industries for OEM manufacturing, quotations, and distributor partnerships worldwide.",
  },
};

const OEM_CAPABILITIES = [
  { title: "OEM Manufacturing", icon: Factory },
  { title: "Private Label Production", icon: Tag },
  { title: "Custom Product Development", icon: Wrench },
  { title: "Laser Marking", icon: Sparkles },
  { title: "Custom Packaging", icon: Package },
  { title: "Bulk Manufacturing", icon: Truck },
  { title: "Long-Term Supply Agreements", icon: Handshake },
] as const;

const PARTNERSHIP_TYPES = [
  { title: "Medical Device Distributors", icon: Building2 },
  { title: "Hospitals & Healthcare Networks", icon: Users },
  { title: "Government Procurement Organizations", icon: Award },
  { title: "Medical Importers", icon: Truck },
  { title: "OEM Brands", icon: Factory },
  { title: "Surgical Equipment Suppliers", icon: Package },
] as const;

const WHY_CONTACT = [
  {
    title: "Fast Response",
    description:
      "Prompt handling of inquiries and quotation requests so your procurement timeline stays on track.",
    icon: Zap,
  },
  {
    title: "Technical Expertise",
    description:
      "Support for product selection, specifications, OEM requirements, and technical documentation.",
    icon: ShieldCheck,
  },
  {
    title: "Reliable Manufacturing",
    description:
      "Quality systems aligned with ISO 13485 and ISO 9001 for consistent electrosurgical instruments.",
    icon: Award,
  },
  {
    title: "Standard Lead Time",
    description:
      "Approximately 6 weeks standard production lead time, confirmed on each quotation.",
    icon: Timer,
  },
] as const;

const FAQ_ITEMS = [
  {
    question: "Can I request OEM or private-label manufacturing?",
    answer:
      "Yes. Saluvia Industries offers comprehensive OEM and private-label manufacturing services, including custom product development, laser marking, custom packaging, and long-term supply agreements for qualified partners.",
  },
  {
    question: "What information should I include when requesting a quotation?",
    answer:
      "Please include the product name or code, estimated quantity, destination country, preferred shipping method, and any customization requirements such as branding, packaging, or labeling. The more detail you provide, the faster we can prepare an accurate quote.",
  },
  {
    question: "Do you provide product documentation?",
    answer:
      "Yes. Upon request, we can provide product specifications and supporting documentation to help with evaluation, tenders, and regulatory workflows for qualified buyers.",
  },
  {
    question: "What is your standard production lead time?",
    answer:
      "Our standard production lead time is approximately 6 weeks. Exact timing depends on product type, quantity, and customization, and will be confirmed in your quotation.",
  },
] as const;

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
        title="Contact Saluvia Industries"
        description={
          <div className="space-y-4">
            <p className="text-lg font-medium text-ink-inverse sm:text-xl">
              Let&apos;s Discuss Your Electrosurgical Instrument Requirements
            </p>
            <p>
              Whether you&apos;re looking for a reliable OEM manufacturing
              partner, requesting a quotation, or seeking technical information
              about our electrosurgical instruments, our team is here to assist
              you.
            </p>
            <p>
              We work with hospitals, medical distributors, healthcare
              organizations, and private-label partners worldwide, providing
              responsive support from initial inquiry through production and
              delivery.
            </p>
          </div>
        }
      >
        <div className="flex flex-wrap gap-3">
          <Button href="#inquiry" variant="primary">
            Request a Quote
          </Button>
          <Button
            href="/products"
            variant="outline"
            className="border-ink-inverse/35 bg-transparent text-ink-inverse hover:border-accent-bright hover:bg-brand-soft hover:text-ink-inverse"
          >
            Download Catalog
          </Button>
        </div>
      </PageHero>

      <section className="section-space">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <ContactChannels
            channels={[...SITE_SALES_CHANNELS]}
            office={SITE_OFFICE}
          />
          <Reveal>
            <Suspense fallback={<FormFallback />}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </div>
      </section>

      <section className="section-space bg-bg-elevated">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="OEM & private label"
              title="Looking for a trusted manufacturing partner?"
              description="Saluvia Industries offers comprehensive OEM and private-label manufacturing services for electrosurgical instruments — from custom development through branded packaging and long-term supply."
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {OEM_CAPABILITIES.map((item) => (
              <StaggerItem key={item.title}>
                <article className="flex h-full items-start gap-3 border-t border-accent/40 pt-5">
                  <item.icon
                    className="mt-0.5 size-5 shrink-0 text-accent"
                    aria-hidden
                  />
                  <h3 className="font-display text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-space">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="Partnerships"
              title="Distributor & business partnerships"
              description="We welcome collaboration with organizations that share our commitment to quality electrosurgical instruments and reliable supply."
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNERSHIP_TYPES.map((item) => (
              <StaggerItem key={item.title}>
                <article className="flex h-full gap-4 rounded-lg border border-border bg-bg-elevated p-5 shadow-sm">
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-accent-muted text-accent">
                    <item.icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="font-display text-base font-semibold text-ink">
                    {item.title}
                  </h3>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-space bg-brand text-ink-inverse">
        <div className="container-site">
          <Reveal>
            <SectionHeading
              eyebrow="Why Saluvia Industries"
              title="Why contact Saluvia Industries?"
              description="Responsive communication, technical depth, and manufacturing discipline for professional buyers worldwide."
              invert
            />
          </Reveal>
          <Stagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_CONTACT.map((item) => (
              <StaggerItem key={item.title}>
                <article className="h-full border-t border-accent/50 pt-5">
                  <item.icon
                    className="size-5 text-accent-bright"
                    aria-hidden
                  />
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink-inverse">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-inverse/75">
                    {item.description}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <ContactFaq items={FAQ_ITEMS} />

      <section className="section-space-end">
        <Reveal className="container-site">
          <div className="relative overflow-hidden rounded-xl bg-brand px-8 py-12 text-ink-inverse shadow-lg sm:px-12 sm:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, color-mix(in srgb, var(--accent) 45%, transparent) 100%)",
              }}
            />
            <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  Let&apos;s Build a Long-Term Partnership
                </h2>
                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-inverse/85">
                  Quality instruments, reliable manufacturing, and responsive
                  communication — from first inquiry through ongoing supply.
                </p>
                <div className="mt-8">
                  <Button href="#inquiry" variant="primary">
                    Send an Inquiry
                  </Button>
                </div>
              </div>
              <div className="rounded-lg border border-ink-inverse/15 bg-brand-soft/40 p-5 sm:p-6">
                <h3 className="font-display text-lg font-semibold text-ink-inverse">
                  Contact Information
                </h3>
                <ul className="mt-4 space-y-3 text-sm text-ink-inverse/85">
                  <li className="flex gap-2">
                    <Mail
                      className="mt-0.5 size-4 shrink-0 text-accent-bright"
                      aria-hidden
                    />
                    <a
                      href={`mailto:${SITE_OFFICE.email}`}
                      className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {SITE_OFFICE.email}
                    </a>
                  </li>
                  <li className="flex gap-2">
                    <Phone
                      className="mt-0.5 size-4 shrink-0 text-accent-bright"
                      aria-hidden
                    />
                    <a
                      href={`tel:${SITE_PHONE.tel}`}
                      className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {SITE_OFFICE.phone}
                    </a>
                  </li>
                  <li className="flex gap-2">
                    <MapPin
                      className="mt-0.5 size-4 shrink-0 text-accent-bright"
                      aria-hidden
                    />
                    <span>{SITE_OFFICE.addressSingleLine}</span>
                  </li>
                  <li className="flex gap-2">
                    <Clock
                      className="mt-0.5 size-4 shrink-0 text-accent-bright"
                      aria-hidden
                    />
                    <span>{SITE_OFFICE.businessHours}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <ContactQuickLinks />
    </div>
  );
}
