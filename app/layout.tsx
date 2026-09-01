import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConciergeWidget } from "@/components/ConciergeWidget";
import { brand } from "@/data/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: "ELVITA FINANCE | Private Business Funding",
    template: "%s | ELVITA FINANCE"
  },
  description: brand.description,
  openGraph: {
    title: "ELVITA FINANCE",
    description: brand.description,
    type: "website",
    locale: "en_US",
    siteName: "ELVITA FINANCE"
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
        <ConciergeWidget />
      </body>
    </html>
  );
}
