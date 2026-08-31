import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

/** Strukturerad data för lokal SEO (Google Företagsprofil / kartpaketet). */
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: siteConfig.legalName,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  email: siteConfig.email,
  image: `${siteConfig.url}/hero-badrum.jpg`,
  logo: `${siteConfig.url}/badbygg-logo.png`,
  address: {
    "@type": "PostalAddress",
    ...siteConfig.address,
  },
  areaServed: siteConfig.areaServed.map((city) => ({
    "@type": "City",
    name: city,
  })),
  knowsAbout: ["Badrumsrenovering", "Utbyggnad", "Köksrenovering", "Plattsättning", "Snickeri"],
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
