import type { Metadata } from "next";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakta oss – få en kostnadsfri offert",
  description:
    "Kontakta Bad & Bygg i Falun och Borlänge för en kostnadsfri offert på badrumsrenovering, utbyggnad eller köksrenovering. Vi svarar oftast inom en arbetsdag.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <section aria-labelledby="kontakt-heading" className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Sidhuvud */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-brand uppercase">Kontakt</p>
          <h1
            id="kontakt-heading"
            className="mt-4 text-4xl font-bold tracking-tight text-balance text-slate-900 sm:text-5xl"
          >
            Berätta om ditt projekt – vi återkommer snabbt
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Fyll i formuläret eller hör av dig direkt. Offerten är alltid kostnadsfri och helt utan
            förpliktelser.
          </p>
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Vänster kolumn – kontaktuppgifter */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-900">Kontaktuppgifter</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
              Vi vet att en renovering är ett stort beslut, och vi tycker att du förtjänar snabba
              och raka svar. Ring, mejla eller använd formuläret – vi återkommer oftast samma dag,
              alltid inom en arbetsdag.
            </p>

            <ul className="mt-8 space-y-6">
              <li className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-brand/10">
                  <Phone className="size-5 text-brand" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Telefon</p>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="mt-1 block text-sm text-slate-600 transition-colors hover:text-brand"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-brand/10">
                  <Mail className="size-5 text-brand" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">E-post</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="mt-1 block text-sm text-slate-600 transition-colors hover:text-brand"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-brand/10">
                  <Clock className="size-5 text-brand" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Svarstid</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Vardagar 07–17. Vi svarar oftast inom några timmar.
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-brand/10">
                  <MapPin className="size-5 text-brand" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Arbetsområde</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {siteConfig.areaServed.join(", ")} med omnejd.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Höger kolumn – formulär */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
