import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  Camera,
  Droplets,
  FileCheck,
  MapPin,
  Umbrella,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { credentials, founder, siteConfig, team } from "@/lib/site";

export const metadata: Metadata = {
  title: "Om oss – hantverkarna bakom Bad & Bygg",
  description:
    "Lär känna teamet bakom Bad & Bygg Falun/Borlänge AB. Grundat av hantverkare med över tio år i branschen – BKR-behörighet, F-skatt och full ansvarsförsäkring.",
  alternates: { canonical: "/om-oss" },
};

const credentialIcons: Record<string, LucideIcon> = {
  badgeCheck: BadgeCheck,
  droplets: Droplets,
  building: Building2,
  fileCheck: FileCheck,
  umbrella: Umbrella,
};

/** E-E-A-T: kopplar organisationen till en riktig grundare med namn. */
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Om Bad & Bygg Falun/Borlänge AB",
  url: `${siteConfig.url}/om-oss`,
  mainEntity: {
    "@type": "HomeAndConstructionBusiness",
    name: siteConfig.legalName,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    founder: {
      "@type": "Person",
      name: founder.name,
      jobTitle: founder.title,
    },
    employee: team.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
    })),
    areaServed: siteConfig.areaServed.map((city) => ({ "@type": "City", name: city })),
  },
};

/** Platshållare tills genuina foton finns – byt mot next/image med riktiga bilder. */
function PhotoPlaceholder({ label, icon: Icon = Camera }: { label: string; icon?: LucideIcon }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-stone-200 text-stone-500">
      <Icon className="size-8" aria-hidden="true" />
      <span className="px-4 text-center text-xs font-medium">{label}</span>
    </div>
  );
}

export default function OmOssPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Hero */}
      <section aria-labelledby="om-oss-heading" className="bg-stone-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand uppercase">Om oss</p>
            <h1
              id="om-oss-heading"
              className="mt-4 text-4xl font-bold tracking-tight text-balance text-slate-900 sm:text-5xl"
            >
              Hantverkare från Dalarna – med över tio år i branschen
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Bad & Bygg är ett familjeägt hantverksföretag i Falun och Borlänge. Vi är snickarna
              och plattsättarna som dina grannar redan anlitat – certifierade, försäkrade och
              stolta över varje jobb vi lämnar efter oss.
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="size-4 text-brand" aria-hidden="true" />
              {siteConfig.areaServed.join(" · ")}
            </p>
          </div>

          {/* Byt mot ett genuint teamfoto: <Image src="/team.jpg" ... /> */}
          <div className="relative aspect-4/3 overflow-hidden rounded-lg">
            <PhotoPlaceholder label="Plats för genuint foto på teamet – gärna på en arbetsplats" />
          </div>
        </div>
      </section>

      {/* Historien */}
      <section aria-labelledby="historia-heading" className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:gap-16 lg:px-8 lg:py-24">
          <div className="lg:col-span-2">
            {/* Byt mot porträtt på grundaren */}
            <div className="relative mx-auto aspect-3/4 max-w-sm overflow-hidden rounded-lg">
              <PhotoPlaceholder label={`Plats för porträtt på ${founder.name}`} icon={User} />
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2
              id="historia-heading"
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Vår historia
            </h2>
            <div className="mt-6 space-y-5">
              {founder.story.map((paragraph) => (
                <p key={paragraph.slice(0, 40)} className="text-lg leading-relaxed text-slate-600">
                  {paragraph}
                </p>
              ))}
            </div>
            <footer className="mt-8 border-l-4 border-brand pl-5">
              <p className="text-lg font-semibold text-slate-900">{founder.name}</p>
              <p className="text-sm text-slate-500">
                {founder.title} · {founder.yearsInTrade} år i branschen
              </p>
            </footer>
          </div>
        </div>
      </section>

      {/* Teamet */}
      <section aria-labelledby="team-heading" className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <h2
              id="team-heading"
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Teamet som gör jobbet
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Inga inhyrda okända ansikten – det är de här hantverkarna som kommer hem till dig,
              och samma personer som är där tills jobbet är klart.
            </p>
          </div>

          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <li
                key={member.name}
                className="overflow-hidden rounded-lg border border-stone-200 bg-white"
              >
                {/* Byt mot porträttfoto på respektive hantverkare */}
                <div className="relative aspect-square">
                  <PhotoPlaceholder label={`Porträtt: ${member.name}`} icon={User} />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-900">{member.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{member.role}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
                    <Wrench className="size-3.5" aria-hidden="true" />
                    {member.yearsInTrade} år i branschen
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {member.certifications.map((certification) => (
                      <li
                        key={certification}
                        className="flex items-center gap-1.5 text-xs text-slate-500"
                      >
                        <BadgeCheck className="size-3.5 shrink-0 text-brand" aria-hidden="true" />
                        {certification}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Trust / E-E-A-T */}
      <section
        aria-labelledby="trygghet-heading"
        className="border-y border-stone-200 bg-slate-900"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <h2
              id="trygghet-heading"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Tryggt på papperet också
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-300">
              Fina ord räcker inte när du släpper in hantverkare i ditt hem. Här är uppgifterna
              som går att kontrollera – svart på vitt.
            </p>
          </div>

          <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {credentials.map((credential) => {
              const Icon = credentialIcons[credential.icon] ?? BadgeCheck;
              return (
                <div key={credential.title}>
                  <dt className="flex items-center gap-3">
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-md bg-brand/15">
                      <Icon className="size-5 text-brand" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-slate-400">
                        {credential.title}
                      </span>
                      <span className="block text-base font-semibold text-white">
                        {credential.value}
                      </span>
                    </span>
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-slate-400">
                    {credential.description}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section aria-labelledby="om-cta-heading" className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
          <h2
            id="om-cta-heading"
            className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance text-slate-900 sm:text-4xl"
          >
            Nu vet du vilka vi är – berätta om ditt projekt
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-600">
            Boka ett kostnadsfritt hembesök så kommer någon av oss ut, tittar på förutsättningarna
            och ger dig en offert med fast pris.
          </p>
          <Link
            href="/kontakt"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-brand px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Få kostnadsfri offert
          </Link>
        </div>
      </section>
    </>
  );
}
