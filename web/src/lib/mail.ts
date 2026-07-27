import nodemailer from "nodemailer";

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getMailConfig() {
  const port = Number(process.env.MAIL_PORT ?? "465");
  const secure =
    process.env.MAIL_SECURE === "true" ||
    process.env.MAIL_SECURE === "1" ||
    port === 465;

  return {
    host: process.env.MAIL_HOST?.trim() || "smtp.gmail.com",
    port,
    secure,
    user: required("MAIL_USER"),
    pass: required("MAIL_APP_PASSWORD").replace(/\s+/g, ""),
    from: process.env.MAIL_FROM?.trim() || required("MAIL_USER"),
    to: process.env.MAIL_TO?.trim() || required("MAIL_USER"),
  };
}

export function createMailTransport() {
  const config = getMailConfig();
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

export type ContactInquiry = {
  inquiryType: string;
  organization: string;
  contactName: string;
  jobTitle?: string;
  email: string;
  phone: string;
  country: string;
  productCodes?: string;
  quantityTimeline?: string;
  message: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value?: string) {
  if (!value?.trim()) return "";
  return `<tr>
    <td style="padding:8px 12px;border-bottom:1px solid #dce9eb;color:#6a7d85;width:34%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:8px 12px;border-bottom:1px solid #dce9eb;color:#14232a;vertical-align:top;">${escapeHtml(value).replace(/\n/g, "<br/>")}</td>
  </tr>`;
}

export function buildInquiryEmail(data: ContactInquiry) {
  const subject = `[Saluvia] ${data.inquiryType} inquiry — ${data.organization}`;

  const text = [
    `New Saluvia B2B inquiry`,
    ``,
    `Inquiry type: ${data.inquiryType}`,
    `Organization: ${data.organization}`,
    `Contact: ${data.contactName}`,
    data.jobTitle ? `Job title: ${data.jobTitle}` : null,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    `Country: ${data.country}`,
    data.productCodes ? `Product codes: ${data.productCodes}` : null,
    data.quantityTimeline
      ? `Quantity / timeline: ${data.quantityTimeline}`
      : null,
    ``,
    `Message:`,
    data.message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  const html = `
  <div style="font-family:Manrope,Segoe UI,Arial,sans-serif;background:#eef3f5;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #c5d4da;border-radius:12px;overflow:hidden;">
      <div style="background:linear-gradient(90deg,#0b3d4a,#1a9b8e);padding:20px 24px;">
        <p style="margin:0;color:#d5f0ec;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;font-weight:600;">Saluvia</p>
        <h1 style="margin:8px 0 0;color:#ffffff;font-size:22px;font-weight:600;">New B2B inquiry</h1>
      </div>
      <div style="padding:8px 12px 20px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          ${row("Inquiry type", data.inquiryType)}
          ${row("Organization", data.organization)}
          ${row("Contact name", data.contactName)}
          ${row("Job title", data.jobTitle)}
          ${row("Email", data.email)}
          ${row("Phone", data.phone)}
          ${row("Country / region", data.country)}
          ${row("Product codes", data.productCodes)}
          ${row("Quantity / timeline", data.quantityTimeline)}
          ${row("Message", data.message)}
        </table>
      </div>
    </div>
  </div>`;

  return { subject, text, html };
}
