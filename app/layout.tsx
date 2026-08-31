import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Badrumsrenovering & byggfirma i Falun och Borlänge | Bad & Bygg",
    template: "%s | Bad & Bygg Falun-Borlänge",
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: siteConfig.name,
    title: "Badrumsrenovering & byggfirma i Falun och Borlänge | Bad & Bygg",
    description: siteConfig.description,
    images: [{ url: "/hero-badrum.jpg", width: 1200, height: 900 }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sv" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-stone-50 font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}
