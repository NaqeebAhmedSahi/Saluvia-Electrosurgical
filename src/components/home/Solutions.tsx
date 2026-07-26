import Link from "next/link";
import {
  Brain,
  Ear,
  Scissors,
  Stethoscope,
  Bone,
  Cross,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export type SolutionItem = {
  title: string;
  description: string;
  href: string;
  icon?: LucideIcon;
};

export type SolutionsProps = {
  eyebrow?: string;
  title?: string;
  support?: string;
  solutions?: SolutionItem[];
};

const DEFAULT_SOLUTIONS: SolutionItem[] = [
  {
    title: "Neurosurgery & Microsurgery",
    description:
      "Fine bipolar forceps designed for delicate tissue handling and precise coagulation.",
    href: "/categories/bipolar-forceps",
    icon: Brain,
  },
  {
    title: "ENT Surgery",
    description:
      "Precision instruments engineered for excellent visibility and control during otolaryngology procedures.",
    href: "/categories/bipolar-forceps",
    icon: Ear,
  },
  {
    title: "Plastic & Reconstructive Surgery",
    description:
      "Reliable bipolar instruments offering refined handling for demanding surgical techniques.",
    href: "/categories/bipolar-forceps",
    icon: Scissors,
  },
  {
    title: "Gynecology",
    description:
      "Complete electrosurgical solutions including forceps, electrodes, cables, and accessories.",
    href: "/categories/electrosurgical-instruments-for-gynecology",
    icon: Stethoscope,
  },
  {
    title: "Arthroscopy",
    description:
      "Specialized arthroscopic electrodes manufactured for precision tissue management.",
    href: "/categories/arthroscopic-electrodes",
    icon: Bone,
  },
  {
    title: "General Surgery",
    description:
      "Comprehensive electrosurgical instrument solutions supporting a wide range of surgical procedures.",
    href: "/products",
    icon: Cross,
  },
];

export function Solutions({
  eyebrow = "Solutions by specialty",
  title = "Built for clinical workflows",
  support = "Start from the specialty you serve, then move into matching categories and product codes.",
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
            {eyebrow}
          </p>
          <h2
            id="solutions-heading"
            className="font-display mt-3 text-3xl font-semibold tracking-tight text-ink md:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {support}
          </p>
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
                    className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-brand to-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  {Icon ? (
                    <span className="mb-5 flex size-12 items-center justify-center rounded-lg border border-border/60 bg-accent-muted text-brand transition-colors duration-300 group-hover:border-accent/40">
                      <Icon className="size-6" strokeWidth={1.75} aria-hidden />
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
