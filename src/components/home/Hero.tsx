"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export type HeroSlide = {
  src: string;
  alt: string;
  headline: string;
  support: string;
  catalogHref?: string;
  catalogLabel?: string;
  quoteHref?: string;
  quoteLabel?: string;
  certifications?: string[];
};

export type HeroProps = {
  brand?: string;
  brandSupport?: string;
  slides: HeroSlide[];
  /** @deprecated Prefer per-slide certifications */
  certifications?: string[];
  /** Optional fallbacks when a slide omits CTA fields */
  catalogHref?: string;
  catalogLabel?: string;
  quoteHref?: string;
  quoteLabel?: string;
  autoPlayMs?: number;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({
  brand = "Saluvia",
  brandSupport = "Industries",
  slides,
  certifications: legacyCerts,
  catalogHref = "/products",
  catalogLabel = "Explore Catalog",
  quoteHref = "/contact",
  quoteLabel = "Request a Quote",
  autoPlayMs = 7000,
  className,
}: HeroProps) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (reduceMotion || paused || count <= 1) return;
    const id = window.setInterval(next, autoPlayMs);
    return () => window.clearInterval(id);
  }, [autoPlayMs, count, next, paused, reduceMotion]);

  if (count === 0) return null;

  const slide = slides[index];
  const slideCatalogHref = slide.catalogHref ?? catalogHref;
  const slideCatalogLabel = slide.catalogLabel ?? catalogLabel;
  const slideQuoteHref = slide.quoteHref ?? quoteHref;
  const slideQuoteLabel = slide.quoteLabel ?? quoteLabel;

  const slideCerts =
    slide.certifications !== undefined
      ? slide.certifications
      : legacyCerts
        ? legacyCerts
        : [];

  return (
    <section
      id="hero"
      aria-roledescription="carousel"
      aria-label="Saluvia featured instruments"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      className={cn(
        "relative isolate min-h-[min(92vh,52rem)] overflow-hidden bg-brand-deep text-white",
        className,
      )}
    >
      {/* Full-bleed slides */}
      <div className="absolute inset-0" aria-hidden>
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.1, ease }}
          >
            <Image
              src={slide.src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Soft scrim — keeps left copy readable without flattening the photo */}
        <div className="absolute inset-0 bg-linear-to-r from-[#041820]/88 via-[#041820]/55 to-transparent md:via-[#041820]/40 md:to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#041820]/70 via-transparent to-[#041820]/25" />
        <div className="absolute inset-y-0 left-0 w-[min(58%,36rem)] bg-linear-to-r from-[#041820]/50 to-transparent" />
      </div>

      {/* Copy — left safe zone; top-anchored so brand stays fixed across slides */}
      <div className="container-site relative flex min-h-[min(92vh,52rem)] flex-col justify-start pt-[clamp(5.5rem,16vh,8.5rem)] pb-28 pr-4 sm:pr-8 lg:pr-[42%]">
        <div className="max-w-xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent-bright/90">
            Electrosurgical instruments
          </p>

          <h1 id="hero-heading" className="mt-4 max-w-lg">
            <span className="block font-display text-[clamp(2.85rem,8vw,5.5rem)] font-semibold leading-[0.92] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
              {brand}
            </span>
            {brandSupport ? (
              <span className="mt-1 block text-sm font-medium uppercase tracking-[0.2em] text-white/70">
                {brandSupport}
              </span>
            ) : null}
          </h1>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={index}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.35, ease }}
            >
              <p className="mt-5 max-w-lg text-balance text-xl font-medium leading-snug text-white/95 sm:text-2xl">
                {slide.headline}
              </p>

              <p className="mt-5 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
                {slide.support}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button
                  href={slideCatalogHref}
                  variant="primary"
                  className="min-h-11 px-6 text-white shadow-lg"
                >
                  {slideCatalogLabel}
                </Button>
                <Button
                  href={slideQuoteHref}
                  variant="outline"
                  className="min-h-11 border-white/40 bg-white/5 text-white backdrop-blur-sm hover:border-white hover:bg-white/12 hover:text-white"
                >
                  {slideQuoteLabel}
                </Button>
              </div>

              {slideCerts.length > 0 ? (
                <p className="mt-10 max-w-lg text-[11px] leading-relaxed tracking-wide text-white/45 sm:text-xs">
                  {slideCerts.join(" · ")}
                </p>
              ) : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Controls */}
      {count > 1 ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
          <div className="container-site flex items-end justify-between gap-4 pb-7 pt-16">
            <div
              className="pointer-events-auto flex items-center gap-2"
              role="tablist"
              aria-label="Hero slides"
            >
              {slides.map((s, i) => {
                const active = i === index;
                return (
                  <button
                    key={`${s.src}-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`Show slide ${i + 1} of ${count}: ${s.headline}`}
                    onClick={() => goTo(i)}
                    className={cn(
                      "group relative h-1.5 overflow-hidden rounded-full transition-all duration-500",
                      active
                        ? "w-10 bg-white/25"
                        : "w-1.5 bg-white/35 hover:bg-white/55",
                    )}
                  >
                    {active ? (
                      <span className="absolute inset-0 overflow-hidden rounded-full">
                        <motion.span
                          key={`progress-${index}-${paused ? "p" : "r"}`}
                          className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-accent-bright"
                          initial={{ scaleX: paused ? 1 : 0 }}
                          animate={{ scaleX: 1 }}
                          transition={
                            reduceMotion || paused
                              ? { duration: 0 }
                              : {
                                  duration: autoPlayMs / 1000,
                                  ease: "linear",
                                }
                          }
                        />
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="pointer-events-auto flex items-center gap-2">
              <span className="mr-1 hidden font-mono text-[11px] tracking-widest text-white/50 sm:inline">
                {String(index + 1).padStart(2, "0")}
                <span className="text-white/30"> / </span>
                {String(count).padStart(2, "0")}
              </span>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="grid size-10 place-items-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="grid size-10 place-items-center rounded-full border border-white/25 bg-white/5 text-white backdrop-blur-sm transition hover:border-white/50 hover:bg-white/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Screen-reader live region */}
      <div className="sr-only" aria-live="polite">
        Slide {index + 1} of {count}: {slide.headline}. {slide.alt}
      </div>
    </section>
  );
}
