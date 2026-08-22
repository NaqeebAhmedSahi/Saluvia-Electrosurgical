import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { SITE_OFFICE, SITE_PHONE } from "@/lib/site-contact";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path
        d="M20.5 11.9a8.5 8.5 0 0 1-12.9 7.3L4 20l.8-3.4A8.5 8.5 0 1 1 20.5 11.9Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9.2 8.8c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .6.4l.8 1.9c.1.3.1.5 0 .7l-.4.6c-.1.2-.1.4 0 .6.3.6.8 1.2 1.5 1.7.2.1.4.1.6 0l.8-.4c.2-.1.5-.1.7 0l1.8.8c.4.2.5.4.5.7v.5c0 .3-.1.5-.4.7-.4.3-1 .5-1.6.4-1.5-.1-3.5-1.2-5.1-2.8-1.6-1.6-2.7-3.6-2.8-5.1-.1-.6.1-1.2.4-1.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export type QuoteBandProps = {
  phone?: string;
  email?: string;
  headline?: string;
  description?: string;
  leadTimeNote?: string;
  tags?: string[];
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

const DEFAULT_TAGS = [
  "OEM Manufacturing",
  "Private Label",
  "Bulk Orders",
  "Distributor Partnerships",
  "Worldwide Export",
];

export function QuoteBand({
  phone,
  email,
  headline = "Request a Quote",
  description = "Looking for a reliable manufacturing partner for electrosurgical instruments? Share your product codes, quantities, destination, or OEM requirements, and our team will prepare a competitive quotation tailored to your project.",
  leadTimeNote = "Production Lead Time: Approximately 6 Weeks",
  tags = DEFAULT_TAGS,
  primaryHref = "/contact",
  primaryLabel = "Request a Quote",
  secondaryHref = "/products",
  secondaryLabel = "Download Catalog",
}: QuoteBandProps) {
  return (
    <section
      id="contact"
      aria-labelledby="quote-heading"
      className="section-space-end"
    >
      <div className="container-site">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-xl px-6 py-12 text-ink-inverse shadow-lg sm:px-10 sm:py-14 md:px-14"
            style={{ background: "var(--gradient-band)" }}
          >
            <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-muted">
                  Partner with Saluvia Industries
                </p>
                <h2
                  id="quote-heading"
                  className="font-display mt-3 max-w-xl text-3xl font-semibold tracking-tight md:text-4xl"
                >
                  {headline}
                </h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-inverse/85">
                  {description}
                </p>
                {leadTimeNote ? (
                  <p className="mt-4 text-sm font-medium text-accent-muted">
                    {leadTimeNote}
                  </p>
                ) : null}

                {tags.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <li
                        key={tag}
                        className="border border-ink-inverse/25 bg-brand-deep/25 px-3 py-1 text-[11px] font-medium tracking-wide text-ink-inverse/80"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Button
                    href={primaryHref}
                    variant="outline"
                    className="min-h-11 border-transparent bg-white text-brand shadow-md hover:border-transparent hover:bg-white hover:text-brand-deep hover:shadow-lg"
                  >
                    {primaryLabel}
                  </Button>
                  <Button
                    href={secondaryHref}
                    variant="outline"
                    className="min-h-11 border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
                  >
                    {secondaryLabel}
                  </Button>
                </div>
              </div>

              {(phone || email) && (
                <aside className="rounded-lg border border-ink-inverse/20 bg-brand-deep/35 p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-muted">
                    Direct channels
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm">
                    {email ? (
                      <li>
                        <span className="block text-ink-inverse/65">Email</span>
                        <a
                          href={`mailto:${email}`}
                          className="font-medium text-ink-inverse underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-inverse"
                        >
                          {email}
                        </a>
                      </li>
                    ) : null}
                    {phone ? (
                      <li>
                        <span className="block text-ink-inverse/65">Phone</span>
                        <a
                          href={`tel:${phone.replace(/\s+/g, "")}`}
                          className="font-medium text-ink-inverse underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-inverse"
                        >
                          <WhatsAppIcon className="mr-2 inline-block size-4 align-[-0.15em] text-accent-muted" />
                          {phone}
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </aside>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
