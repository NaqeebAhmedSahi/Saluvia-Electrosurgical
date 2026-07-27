import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
  stats,
  actions,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  stats?: { label: string; value: string }[];
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <Reveal className={cn("flex flex-col gap-5", className)}>
      {eyebrow ? (
        <span className="w-fit rounded-sm bg-accent-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="font-display text-3xl font-semibold leading-tight tracking-tight text-brand-deep sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      {description ? (
        <div className="max-w-3xl text-sm leading-relaxed text-ink-soft sm:text-base">
          {description}
        </div>
      ) : null}
      {stats?.length ? (
        <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-5">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
                {stat.label}
              </dt>
              <dd className="font-display text-xl font-semibold text-brand">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </Reveal>
  );
}
