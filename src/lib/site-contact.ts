/**
 * Central contact & HQ details for Saluvia Industries.
 * Update this file when live addresses, phones, emails, or map coords change.
 */

export const SITE_PHONE = {
  display: "+92 316 7827137",
  tel: "+923167827137",
} as const;

export const SITE_EMAILS = {
  sales: "info@saluviaindustries.com",
  partners: "info@saluviaindustries.com",
  oem: "info@saluviaindustries.com",
  general: "info@saluviaindustries.com",
} as const;

export const SITE_OFFICE = {
  companyName: "Saluvia Industries",
  addressLines: ["Sialkot, Punjab"],
  city: "Sialkot, Punjab",
  country: "Pakistan",
  /** Single-line address for footer and compact layouts */
  addressSingleLine: "Sialkot, Punjab, Pakistan",
  phone: SITE_PHONE.display,
  phoneTel: SITE_PHONE.tel,
  email: SITE_EMAILS.general,
  businessHours: "Monday – Saturday | 9:00 AM – 6:00 PM (PKT)",
  /** OpenStreetMap embed — Sialkot, Punjab */
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=74.480%2C32.450%2C74.580%2C32.540&layer=mapnik&marker=32.4945%2C74.5229",
  mapTitle: "Saluvia Industries manufacturing facility map",
} as const;

export const SITE_SALES_CHANNELS = [
  {
    type: "facility",
    label: "Manufacturing Facility",
    email: SITE_EMAILS.general,
    phone: SITE_PHONE.display,
    note: "Saluvia Industries — Sialkot, Punjab, Pakistan.",
  },
  {
    type: "email",
    label: "Email",
    email: SITE_EMAILS.general,
    phone: SITE_PHONE.display,
    note: "General inquiries, quotations, OEM partnerships, technical documentation, and distributor opportunities.",
  },
  {
    type: "phone",
    label: "Phone",
    email: SITE_EMAILS.general,
    phone: SITE_PHONE.display,
    note: "Monday – Saturday, 9:00 AM – 6:00 PM (PKT).",
  },
] as const;
