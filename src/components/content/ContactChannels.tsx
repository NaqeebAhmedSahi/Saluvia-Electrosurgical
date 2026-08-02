"use client";

import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Phone, Clock, Factory } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";

export type SalesChannel = {
  type: string;
  label: string;
  email: string;
  phone: string;
  note?: string;
};

export type SiteOffice = {
  companyName?: string;
  addressLines: readonly string[];
  city: string;
  country: string;
  addressSingleLine?: string;
  phone: string;
  phoneTel?: string;
  email: string;
  businessHours: string;
  mapEmbedUrl?: string;
  mapTitle?: string;
};

/** @deprecated Prefer SiteOffice — kept for existing imports */
export type OfficePlaceholder = SiteOffice;

function channelIcon(type: string): LucideIcon {
  switch (type) {
    case "facility":
      return Factory;
    case "email":
      return Mail;
    case "phone":
      return Phone;
    default:
      return MapPin;
  }
}

function ChannelPrimary({
  channel,
  office,
}: {
  channel: SalesChannel;
  office: SiteOffice;
}) {
  if (channel.type === "facility") {
    const company = office.companyName ?? "Saluvia Industries";
    const location =
      office.addressSingleLine ??
      `${office.city}, ${office.country}`;
    return (
      <p className="mt-3 text-sm leading-relaxed text-ink-soft">
        <span className="font-medium text-ink">{company}</span>
        <br />
        {location}
      </p>
    );
  }

  if (channel.type === "email") {
    return (
      <div className="mt-3 space-y-2 text-sm">
        <a
          href={`mailto:${channel.email}`}
          className="inline-flex items-center gap-2 font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Mail className="size-4 shrink-0 text-accent" aria-hidden />
          {channel.email}
        </a>
        {channel.note ? (
          <p className="text-ink-soft">{channel.note}</p>
        ) : null}
      </div>
    );
  }

  if (channel.type === "phone") {
    const tel = (office.phoneTel ?? channel.phone).replace(/[^\d+]/g, "");
    return (
      <div className="mt-3 space-y-2 text-sm">
        <a
          href={`tel:${tel}`}
          className="inline-flex items-center gap-2 font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Phone className="size-4 shrink-0 text-accent" aria-hidden />
          {channel.phone}
        </a>
        {channel.note ? (
          <p className="text-ink-soft">{channel.note}</p>
        ) : null}
      </div>
    );
  }

  return (
    <dl className="mt-4 space-y-2 text-sm">
      <div className="flex items-start gap-2 text-ink-soft">
        <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
        <div>
          <dt className="sr-only">Email</dt>
          <dd>
            <a
              href={`mailto:${channel.email}`}
              className="font-medium text-ink underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {channel.email}
            </a>
          </dd>
        </div>
      </div>
      <div className="flex items-start gap-2 text-ink-soft">
        <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
        <div>
          <dt className="sr-only">Phone</dt>
          <dd>
            <a
              href={`tel:${channel.phone.replace(/[^\d+]/g, "")}`}
              className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {channel.phone}
            </a>
          </dd>
        </div>
      </div>
      {channel.note ? <p className="text-ink-soft">{channel.note}</p> : null}
    </dl>
  );
}

export function ContactChannels({
  channels,
  office,
}: {
  channels: readonly SalesChannel[] | SalesChannel[];
  office: SiteOffice;
}) {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeading
          eyebrow="Get in touch"
          title="Contact channels"
          description="Reach Saluvia Industries for quotations, OEM partnerships, technical documentation, and distributor opportunities."
        />
        <Stagger className="mt-8 grid gap-4">
          {channels.map((channel) => {
            const Icon = channelIcon(channel.type);
            return (
              <StaggerItem key={channel.type}>
                <article className="rounded-lg border border-border bg-bg-elevated p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex size-9 items-center justify-center rounded-md bg-accent-muted text-accent">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink">
                      {channel.label}
                    </h3>
                  </div>
                  <ChannelPrimary channel={channel} office={office} />
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>

      <Reveal>
        <article className="rounded-lg border border-border bg-bg-elevated p-5 shadow-sm sm:p-6">
          <h3 className="font-display text-lg font-semibold text-ink">
            Location & hours
          </h3>
          <div className="mt-4 space-y-3 text-sm text-ink-soft">
            <div className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <div>
                {office.companyName ? (
                  <p className="font-medium text-ink">{office.companyName}</p>
                ) : null}
                <p>
                  {office.addressSingleLine ??
                    `${office.city}, ${office.country}`}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <p>{office.businessHours}</p>
            </div>
          </div>
          {office.mapEmbedUrl ? (
            <div className="mt-6 overflow-hidden rounded-md border border-border">
              <iframe
                title={office.mapTitle ?? "Manufacturing facility map"}
                src={office.mapEmbedUrl}
                className="aspect-[16/9] w-full border-0 bg-bg-muted"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : null}
        </article>
      </Reveal>
    </div>
  );
}
