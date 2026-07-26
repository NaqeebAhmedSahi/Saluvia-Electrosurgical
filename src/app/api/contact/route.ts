import { NextResponse } from "next/server";
import {
  buildInquiryEmail,
  createMailTransport,
  getMailConfig,
  type ContactInquiry,
} from "@/lib/mail";

export const runtime = "nodejs";

const INQUIRY_TYPES = new Set([
  "Quote",
  "Sample",
  "Distributor",
  "Technical",
  "OEM",
  "Other",
]);

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeCodes(value: string) {
  return value
    .split(/[,;\s]+/)
    .map((code) => code.trim())
    .filter(Boolean);
}

function isValidCodePattern(code: string) {
  return /^\d{2,4}-\d{2,4}[A-Za-z]?$/.test(code);
}

function parseBody(body: unknown): { data?: ContactInquiry; error?: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body." };
  }

  const raw = body as Record<string, unknown>;
  const inquiryType = asString(raw.inquiryType) || "Quote";

  const data: ContactInquiry = {
    inquiryType,
    organization: asString(raw.organization) || undefined,
    contactName: asString(raw.contactName),
    jobTitle: asString(raw.jobTitle) || undefined,
    email: asString(raw.email),
    phone: asString(raw.phone) || undefined,
    country: asString(raw.country),
    productCategory: asString(raw.productCategory) || undefined,
    productCodes: asString(raw.productCodes) || undefined,
    quantityTimeline: asString(raw.quantityTimeline) || undefined,
    message: asString(raw.message),
  };

  if (!INQUIRY_TYPES.has(data.inquiryType)) {
    return { error: "Select a valid inquiry type." };
  }
  if (!data.contactName) return { error: "Full name is required." };
  if (!data.email || !isValidEmail(data.email)) {
    return { error: "Enter a valid email address." };
  }
  if (!data.country) return { error: "Country is required." };
  if (!data.message) return { error: "Message is required." };
  if (raw.consent !== true) {
    return { error: "Consent is required to submit." };
  }

  if (data.productCodes) {
    const invalid = normalizeCodes(data.productCodes).filter(
      (code) => !isValidCodePattern(code),
    );
    if (invalid.length) {
      return {
        error: `Invalid product code format: ${invalid.join(", ")}`,
      };
    }
  }

  return { data };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = parseBody(body);
    if (!parsed.data) {
      return NextResponse.json(
        { ok: false, error: parsed.error ?? "Invalid form data." },
        { status: 400 },
      );
    }

    const config = getMailConfig();
    const transport = createMailTransport();
    const email = buildInquiryEmail(parsed.data);

    await transport.sendMail({
      from: config.from,
      to: config.to,
      replyTo: parsed.data.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[contact] mail send failed:", error);
    const message =
      error instanceof Error && error.message.startsWith("Missing required")
        ? "Email is not configured on the server."
        : "Unable to send your inquiry right now. Please try again shortly.";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
