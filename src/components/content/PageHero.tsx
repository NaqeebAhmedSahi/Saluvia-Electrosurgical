"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
  imageSrc,
  imageAlt = "",
}: {
  eyebrow?: string;
  title: string;
  description: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Optional full-bleed background photo for premium manufacturer pages */
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden text-ink-inverse",
        imageSrc ? "min-h-[min(58vh,28rem)]" : "gradient-hero",
        className,
      )}
    >
      {imageSrc ? (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-r from-[#041820]/90 via-[#041820]/72 to-[#041820]/45"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-[#041820]/55 via-transparent to-[#041820]/30"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 85% 20%, color-mix(in srgb, var(--accent-bright) 35%, transparent), transparent 60%)",
          }}
        />
      )}
      <div className="container-site relative flex min-h-[inherit] flex-col justify-center py-16 sm:py-20 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="max-w-3xl"
        >
          {eyebrow ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-[3.25rem] md:leading-[1.1]">
            {title}
          </h1>
          <div className="mt-5 max-w-2xl text-base leading-relaxed text-ink-inverse/85 sm:text-lg">
            {description}
          </div>
          {children ? <div className="mt-8">{children}</div> : null}
        </motion.div>
      </div>
    </section>
  );
}
