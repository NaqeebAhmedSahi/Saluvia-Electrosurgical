import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

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
