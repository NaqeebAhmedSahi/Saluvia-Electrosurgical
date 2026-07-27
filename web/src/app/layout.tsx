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
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://saluvia.com",
  ),
  title: {
    default:
      "Saluvia | Electrosurgical Instruments — Forceps, Electrodes & Cables",
    template: "%s | Saluvia",
  },
  description:
    "Explore Saluvia electrosurgical instruments, including bipolar forceps, electrodes, cables, and specialty surgical products for professional buyers.",
  openGraph: {
    type: "website",
    siteName: "Saluvia",
    title: "Saluvia | Precision Electrosurgical Instruments",
    description:
      "A focused catalog of electrosurgical instruments for hospitals, clinics, and distributors.",
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
