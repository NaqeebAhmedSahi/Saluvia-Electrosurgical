import Link from "next/link";
import { Brain, Stethoscope, Bone, Cable, type LucideIcon } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type SolutionItem = {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
};

export type SolutionsProps = {
  solutions?: SolutionItem[];
};

const DEFAULT_SOLUTIONS: SolutionItem[] = [
  {
    title: "Neuro & ENT",
    description:
      "Fine bipolar forceps suited to delicate coagulation in neurosurgery and otolaryngology workflows.",
    href: "/categories/bipolar-forceps",
    icon: Brain,
  },
  {
    title: "Gynecology",
    description:
      "Electrosurgical instruments and electrodes configured for gynecologic procedures and OR protocols.",
    href: "/categories/electrosurgical-instruments-for-gynecology",
    icon: Stethoscope,
  },
  {
    title: "Arthroscopy",
    description:
      "Arthroscopic electrodes for precise cutting and coagulation in joint procedures.",
    href: "/categories/arthroscopic-electrodes",
    icon: Bone,
  },
  {
    title: "Cables & pencils",
    description:
      "Reusable and single-use bipolar and monopolar cables, plus electrosurgical pencils for the OR.",
    href: "/categories/bipolar-cables",
    icon: Cable,
  },
];

export function Solutions({
  solutions = DEFAULT_SOLUTIONS,
}: SolutionsProps) {
  if (!solutions.length) return null;

  return (
    <section
      id="solutions"
      aria-labelledby="solutions-heading"
      className="section-space"
    >
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Solutions by specialty
          </p>
          <h2
            id="solutions-heading"
            className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl"
          >
            Built for clinical workflows
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Start from the specialty you serve, then move into matching
            categories and product codes.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-bg-elevated p-6 shadow-sm",
                    "transition-all duration-300 ease-out",
                    "hover:-translate-y-1 hover:border-accent/40 hover:shadow-md",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-brand to-accent transition-transform duration-300 group-hover:scale-x-100"
                  />
                  {Icon ? (
                    <span className="mb-5 flex size-12 items-center justify-center rounded-lg bg-accent-muted text-brand transition-colors duration-300 group-hover:bg-accent group-hover:text-ink-inverse">
                      <Icon className="size-6" strokeWidth={1.75} />
                    </span>
                  ) : null}
                  <h3 className="text-lg font-semibold text-ink transition-colors group-hover:text-brand">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                  <span className="mt-auto flex items-center gap-1.5 pt-5 text-xs font-semibold uppercase tracking-wider text-brand">
                    View category
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
