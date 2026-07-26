import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StoreProvider } from "@/store/StoreProvider";
import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displayFont = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://saluviaindustries.com",
  ),
  title: {
    default:
      "Saluvia Industries | Electrosurgical Instruments Manufacturer — OEM & Global Supply",
    template: "%s | Saluvia Industries",
  },
  description:
    "Saluvia Industries manufactures precision electrosurgical instruments in Pakistan — bipolar forceps, electrodes, pencils, cables, and specialty surgical tools for hospitals, distributors, and OEM partners. ISO 13485 & ISO 9001 certified.",
  icons: {
    icon: [{ url: "/fav.jpeg", type: "image/jpeg" }],
    apple: [{ url: "/fav.jpeg", type: "image/jpeg" }],
    shortcut: "/fav.jpeg",
  },
  openGraph: {
    type: "website",
    siteName: "Saluvia Industries",
    title:
      "Saluvia Industries | Precision Electrosurgical Instrument Manufacturer",
    description:
      "B2B manufacturer of electrosurgical instruments for hospitals, medical distributors, and OEM partners worldwide. ISO-certified quality from Sialkot, Pakistan.",
    images: [
      {
        url: "/logo-removebg-preview.png",
        width: 775,
        height: 281,
        alt: "Saluvia Industries",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <StoreProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
