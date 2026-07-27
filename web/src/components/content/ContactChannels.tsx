"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/content/SectionHeading";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export type SalesChannel = {
  type: string;
  label: string;
  email: string;
  phone: string;
  note?: string;
};

export type OfficePlaceholder = {
  addressLines: string[];
  city: string;
  country: string;
  phone: string;
  email: string;
  businessHours: string;
};

export function ContactChannels({
  channels,
  office,
}: {
  channels: SalesChannel[];
  office: OfficePlaceholder;
}) {
  return (
    <div className="space-y-10">
      <div>
        <SectionHeading
          eyebrow="Direct channels"
          title="Reach the right desk"
          description="Placeholders below are clearly marked until Saluvia confirms live sales contacts."
        />
        <Stagger className="mt-8 grid gap-4">
          {channels.map((channel) => (
            <StaggerItem key={channel.type}>
              <article className="rounded-lg border border-border bg-bg-elevated p-5 shadow-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {channel.label}
                  </h3>
                  <span className="rounded-sm bg-bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
                    Placeholder
                  </span>
                </div>
                {channel.note ? (
                  <p className="mt-2 text-sm text-ink-soft">{channel.note}</p>
                ) : null}
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex items-start gap-2 text-ink-soft">
                    <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    <div>
                      <dt className="sr-only">Email</dt>
                      <dd className="font-medium text-ink">{channel.email}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 text-ink-soft">
                    <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                    <div>
                      <dt className="sr-only">Phone</dt>
                      <dd>{channel.phone}</dd>
                    </div>
                  </div>
                </dl>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <Reveal>
        <article className="rounded-lg border border-dashed border-border-strong bg-bg-tint/60 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display text-lg font-semibold text-ink">
              Headquarters
            </h3>
            <span className="rounded-sm bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-warning">
              Address placeholder
            </span>
          </div>
          <div className="mt-4 space-y-3 text-sm text-ink-soft">
            <div className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <div>
                {office.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
                <p>
                  {office.city}, {office.country}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <p>{office.phone}</p>
            </div>
            <div className="flex gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <p>{office.email}</p>
            </div>
            <div className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <p>{office.businessHours}</p>
            </div>
          </div>
          <div className="mt-6 flex aspect-[16/9] items-center justify-center rounded-md border border-border bg-bg-muted text-center text-sm text-ink-muted">
            Map embed placeholder — add coordinates when HQ is confirmed
          </div>
        </article>
      </Reveal>
    </div>
  );
}
