"use client";

import { useState } from "react";

const FOOTER_ABOUT =
  "Saluvia Industries is a manufacturer of high-quality electrosurgical instruments serving hospitals, medical distributors, OEM partners, and healthcare brands worldwide. Our portfolio includes bipolar forceps, electrosurgical electrodes, pencils, cables, and specialty surgical instruments manufactured under ISO 13485 and ISO 9001 certified quality management systems. Supported by our CE Mark Extension Letter, we are committed to delivering precision manufacturing, dependable quality, and consistent global supply with a standard production lead time of approximately 6 weeks.";

const FOOTER_ABOUT_PREVIEW =
  "Saluvia Industries is a manufacturer of high-quality electrosurgical instruments serving hospitals, medical distributors, OEM partners, and healthcare brands worldwide.";

export function FooterAboutText() {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded((open) => !open)}
      aria-expanded={expanded}
      className="mt-4 max-w-md cursor-pointer text-left text-sm leading-relaxed text-ink-inverse/70 transition-colors hover:text-ink-inverse/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-brand-deep"
    >
      {expanded ? (
        FOOTER_ABOUT
      ) : (
        <>
          {FOOTER_ABOUT_PREVIEW}
          <span aria-hidden>…</span>
          <span className="sr-only"> Click to read more.</span>
        </>
      )}
    </button>
  );
}
