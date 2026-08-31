import Link from "next/link";
import Image from "next/image";
import {
  Award,
  BadgeCheck,
  ShieldCheck,
  Star,
  Bath,
  Hammer,
  CookingPot,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/lib/site";

const trustItems: { icon: LucideIcon; label: string }[] = [
  { icon: Award, label: "Över 10 års erfarenhet" },
  { icon: BadgeCheck, label: "BKR-certifierade plattsättare" },
  { icon: ShieldCheck, label: "Fullt försäkrade med garanti" },
  { icon: Star, label: "Nöjda kunder i hela Dalarna" },
];

/** Ikon per tjänste-slug – hålls utanför lib/site.ts så att datan förblir CMS-vänlig. */
const serviceIcons: Record<string, LucideIcon> = {
  badrumsrenovering: Bath,
  utbyggnad: Hammer,
  koksrenovering: CookingPot,
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="hero-heading" className="bg-stone-50">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand uppercase">
              Byggfirma i Falun & Borlänge
            </p>
            <h1
              id="hero-heading"
              className="mt-4 text-4xl font-bold tracking-tight text-balance text-slate-900 sm:text-5xl"
            >
              Badrumsrenovering och byggprojekt – utfört av certifierade hantverkare
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Vi förvandlar ditt badrum, kök eller din utbyggnad till ett hantverk du kan lita på.
              Fast pris, tydlig tidsplan och BKR-certifierad kvalitet – från första skiss till
              slutbesiktning.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-md bg-brand px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Få kostnadsfri offert
              </Link>
              <Link
                href="#tjanster"
                className="inline-flex items-center justify-center rounded-md border border-stone-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-900 transition-colors hover:border-stone-400 hover:bg-stone-100"
              >
                Se våra tjänster
              </Link>
            </div>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-lg">
            <Image
              src="/hero-badrum.jpg"
              alt="Nyrenoverat modernt badrum med glasdusch och ekkommod, renoverat av Bad & Bygg i Falun"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section aria-label="Varför välja oss" className="border-y border-stone-200 bg-white">
        <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {trustItems.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3">
              <Icon className="size-6 shrink-0 text-brand" aria-hidden="true" />
              <span className="text-sm font-medium text-slate-900">{label}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Tjänster */}
      <section id="tjanster" aria-labelledby="tjanster-heading" className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <h2
              id="tjanster-heading"
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Våra tjänster
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Tre specialiteter, ett och samma löfte: gediget hantverk och ett resultat som håller
              i många år.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = serviceIcons[service.slug];
              return (
                <Link
                  key={service.slug}
                  href={`/tjanster/${service.slug}`}
                  className="group flex flex-col rounded-lg border border-stone-200 bg-white p-8 transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-md bg-brand/10">
                    <Icon className="size-6 text-brand" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    {service.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Läs mer
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
