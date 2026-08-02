"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const PRODUCT_CATEGORIES = [
  "Bipolar Forceps",
  "Monopolar Forceps",
  "Electrosurgical Electrodes",
  "Electrosurgical Pencils",
  "Cables & Accessories",
  "Gynecology Instruments",
  "Arthroscopic Electrodes",
  "OEM / Private Label",
  "Other",
] as const;

type FormState = {
  contactName: string;
  organization: string;
  country: string;
  email: string;
  phone: string;
  jobTitle: string;
  productCategory: string;
  productCodes: string;
  quantityTimeline: string;
  message: string;
  consent: boolean;
};

const initialState: FormState = {
  contactName: "",
  organization: "",
  country: "",
  email: "",
  phone: "",
  jobTitle: "",
  productCategory: "",
  productCodes: "",
  quantityTimeline: "",
  message: "",
  consent: false,
};

const fieldClass =
  "w-full rounded-md border border-border bg-bg-elevated px-3.5 py-2.5 text-sm text-ink shadow-sm transition-colors placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30";

const labelClass = "mb-1.5 block text-sm font-medium text-ink";

function normalizeCodes(value: string) {
  return value
    .split(/[,;\s]+/)
    .map((code) => code.trim())
    .filter(Boolean);
}

function isValidCodePattern(code: string) {
  return /^\d{2,4}-\d{2,4}[A-Za-z]?$/.test(code);
}

export function ContactForm() {
  const searchParams = useSearchParams();
  const prefillCode = searchParams.get("code") ?? "";

  const [form, setForm] = useState<FormState>(() => ({
    ...initialState,
    productCodes: prefillCode,
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const invalidCodes = useMemo(() => {
    const codes = normalizeCodes(form.productCodes);
    return codes.filter((code) => !isValidCodePattern(code));
  }, [form.productCodes]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};

    if (!form.contactName.trim()) next.contactName = "Full name is required.";
    if (!form.country.trim()) next.country = "Country is required.";
    if (!form.email.trim()) next.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (!form.message.trim()) next.message = "Please include a brief message.";
    if (!form.consent) next.consent = "Consent is required to submit.";
    if (invalidCodes.length > 0) {
      next.productCodes = `Check product code format (e.g. 110-100). Invalid: ${invalidCodes.join(", ")}`;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setSubmitError(null);

    const category = form.productCategory.trim();
    const inquiryType = category === "OEM / Private Label" ? "OEM" : "Quote";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          inquiryType,
          organization: form.organization.trim() || undefined,
          contactName: form.contactName.trim(),
          jobTitle: form.jobTitle.trim() || undefined,
          email: form.email.trim(),
          phone: form.phone.trim() || undefined,
          country: form.country.trim(),
          productCategory: category || undefined,
          productCodes: form.productCodes.trim() || undefined,
          quantityTimeline: form.quantityTimeline.trim() || undefined,
          message: form.message.trim(),
          consent: form.consent,
        }),
      });

      const payload = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
      } | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(
          payload?.error || "Unable to send your inquiry. Please try again.",
        );
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send your inquiry. Please try again.",
      );
    }
  }

  function resetForm() {
    setForm({ ...initialState, productCodes: "" });
    setErrors({});
    setSubmitError(null);
    setStatus("idle");
  }

  return (
    <div
      id="inquiry"
      className="scroll-mt-28 rounded-xl border border-border bg-bg-elevated p-6 shadow-md sm:p-8"
    >
      <div className="mb-6">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Ready to Get Started?
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Send us your inquiry today. We typically respond within{" "}
          <span className="font-medium text-ink">1 business day</span>.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="rounded-lg border border-accent/30 bg-accent-muted/60 px-5 py-8 text-center"
          >
            <p className="font-display text-xl font-semibold text-brand">
              Inquiry received
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
              Thank you for contacting Saluvia Industries. Our team will review
              your request and respond to your email, typically within one
              business day.
            </p>
            <button
              type="button"
              onClick={resetForm}
              className="mt-6 inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-soft"
            >
              Submit another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={onSubmit}
            noValidate
            className="grid gap-5 sm:grid-cols-2"
          >
            <div>
              <label htmlFor="contactName" className={labelClass}>
                Full Name <span className="text-danger">*</span>
              </label>
              <input
                id="contactName"
                name="contactName"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={form.contactName}
                onChange={(e) => update("contactName", e.target.value)}
                className={fieldClass}
                aria-invalid={Boolean(errors.contactName)}
              />
              {errors.contactName ? (
                <p className="mt-1.5 text-xs text-danger">{errors.contactName}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="organization" className={labelClass}>
                Company Name
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                autoComplete="organization"
                placeholder="Hospital, distributor, or OEM brand"
                value={form.organization}
                onChange={(e) => update("organization", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="country" className={labelClass}>
                Country <span className="text-danger">*</span>
              </label>
              <input
                id="country"
                name="country"
                type="text"
                autoComplete="country-name"
                placeholder="e.g. United States"
                value={form.country}
                onChange={(e) => update("country", e.target.value)}
                className={fieldClass}
                aria-invalid={Boolean(errors.country)}
              />
              {errors.country ? (
                <p className="mt-1.5 text-xs text-danger">{errors.country}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address <span className="text-danger">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="name@company.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={fieldClass}
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email ? (
                <p className="mt-1.5 text-xs text-danger">{errors.email}</p>
              ) : null}
            </div>

            <div>
              <label htmlFor="phone" className={labelClass}>
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+92 … (include country code)"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="jobTitle" className={labelClass}>
                Job Title
              </label>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                autoComplete="organization-title"
                placeholder="e.g. Procurement Manager"
                value={form.jobTitle}
                onChange={(e) => update("jobTitle", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div>
              <label htmlFor="productCategory" className={labelClass}>
                Product Category
              </label>
              <select
                id="productCategory"
                name="productCategory"
                value={form.productCategory}
                onChange={(e) => update("productCategory", e.target.value)}
                className={fieldClass}
              >
                <option value="">Select a category</option>
                {PRODUCT_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="productCodes" className={labelClass}>
                Product Code(s)
              </label>
              <input
                id="productCodes"
                name="productCodes"
                type="text"
                placeholder="e.g. 110-100, 220-015"
                value={form.productCodes}
                onChange={(e) => update("productCodes", e.target.value)}
                className={cn(
                  fieldClass,
                  "font-mono tracking-wide",
                  errors.productCodes && "border-danger",
                )}
                aria-invalid={Boolean(errors.productCodes)}
                aria-describedby="productCodes-help"
              />
              <p id="productCodes-help" className="mt-1.5 text-xs text-ink-muted">
                Optional. Comma-separated SKU codes from the catalog.
              </p>
              {errors.productCodes ? (
                <p className="mt-1.5 text-xs text-danger">{errors.productCodes}</p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="quantityTimeline" className={labelClass}>
                Estimated Quantity
              </label>
              <input
                id="quantityTimeline"
                name="quantityTimeline"
                type="text"
                placeholder="Estimated volume or order size"
                value={form.quantityTimeline}
                onChange={(e) => update("quantityTimeline", e.target.value)}
                className={fieldClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className={labelClass}>
                Message <span className="text-danger">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your requirements, quotation needs, or partnership interest"
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className={cn(fieldClass, "resize-y")}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message ? (
                <p className="mt-1.5 text-xs text-danger">{errors.message}</p>
              ) : null}
            </div>

            <div className="sm:col-span-2">
              <label className="flex items-start gap-3 text-sm text-ink-soft">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  className="mt-1 size-4 rounded border-border text-accent accent-accent"
                  aria-invalid={Boolean(errors.consent)}
                />
                <span>
                  I agree to be contacted regarding this inquiry and acknowledge
                  that submitted details will be handled per Saluvia
                  Industries&apos; privacy practices.{" "}
                  <span className="text-danger">*</span>
                </span>
              </label>
              {errors.consent ? (
                <p className="mt-1.5 text-xs text-danger">{errors.consent}</p>
              ) : null}
            </div>

            <div className="sm:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-accent-bright disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending…" : "Submit Inquiry"}
              </button>
            </div>

            {status === "error" && submitError ? (
              <p
                role="alert"
                className="sm:col-span-2 rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
              >
                {submitError}
              </p>
            ) : null}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
