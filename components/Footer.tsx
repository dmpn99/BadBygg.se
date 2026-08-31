import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { navLinks, siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {/* Företagsinfo */}
          <div>
            <p className="text-lg font-bold text-slate-900">{siteConfig.legalName}</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-600">
              Hantverkare med hjärta för badrum, kök och byggprojekt i Dalarna.
              BKR-certifierade plattsättare och erfarna snickare.
            </p>
          </div>

          {/* Genvägar */}
          <nav aria-label="Sidfotsmeny">
            <p className="text-sm font-semibold tracking-wide text-slate-900 uppercase">Tjänster & sidor</p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-600 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Kontakt */}
          <div>
            <p className="text-sm font-semibold tracking-wide text-slate-900 uppercase">Kontakt</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0 text-brand" aria-hidden="true" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-brand">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4 shrink-0 text-brand" aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-brand">
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
                <span>Verksamma i {siteConfig.areaServed.join(", ")}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-200 pt-6">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {siteConfig.legalName}. Alla rättigheter förbehållna.
          </p>
        </div>
      </div>
    </footer>
  );
}
