import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  ShieldCheck,
  Wallet,
  Handshake,
  FileCheck,
  Hammer,
  Clock,
  Ruler,
  Sparkles,
  Phone,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { services, siteConfig } from "@/lib/site";
import { sanityFetch } from "@/sanity/lib/client";
import { projectsByServiceQuery, type Project } from "@/sanity/lib/queries";
import ProjectCard from "@/components/ProjectCard";

/** Mappar CMS-vänliga ikonnycklar från lib/site.ts till Lucide-komponenter. */
const benefitIcons: Record<string, LucideIcon> = {
  badgeCheck: BadgeCheck,
  shieldCheck: ShieldCheck,
  wallet: Wallet,
  handshake: Handshake,
  fileCheck: FileCheck,
  hammer: Hammer,
  clock: Clock,
  ruler: Ruler,
  sparkles: Sparkles,
};

/** SSG: alla tjänstesidor byggs statiskt vid build-time. */
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

/** Okända slugs ska ge 404 istället för att renderas on-demand. */
export const dynamicParams = false;

/** ISR: nya referensprojekt från Sanity dyker upp inom 10 minuter. */
export const revalidate = 600;

export async function generateMetadata({
  params,
}: PageProps<"/tjanster/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/tjanster/${service.slug}` },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      images: [{ url: service.image, width: 1200, height: 900, alt: service.imageAlt }],
    },
  };
}

export default async function ServicePage({ params }: PageProps<"/tjanster/[slug]">) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const otherServices = services.filter((s) => s.slug !== service.slug);
  const projects = await sanityFetch<Project[]>(
    projectsByServiceQuery,
    { service: service.slug, limit: 3 },
    [],
  );

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.metaDescription,
      url: `${siteConfig.url}/tjanster/${service.slug}`,
      image: `${siteConfig.url}${service.image}`,
      provider: {
        "@type": "HomeAndConstructionBusiness",
        name: siteConfig.legalName,
        url: siteConfig.url,
        telephone: siteConfig.phone,
      },
      areaServed: siteConfig.areaServed.map((city) => ({ "@type": "City", name: city })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: service.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Hem", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: service.title,
          item: `${siteConfig.url}/tjanster/${service.slug}`,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section aria-labelledby="tjanst-heading" className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <nav aria-label="Brödsmulor">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
              <li>
                <Link href="/" className="transition-colors hover:text-brand">
                  Hem
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-4" />
              </li>
              <li>
                <Link href="/#tjanster" className="transition-colors hover:text-brand">
                  Tjänster
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-4" />
              </li>
              <li aria-current="page" className="font-medium text-slate-900">
                {service.title}
              </li>
            </ol>
          </nav>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
          <div>
            <p className="text-sm font-semibold tracking-wide text-brand uppercase">
              {service.title}
            </p>
            <h1
              id="tjanst-heading"
              className="mt-4 text-4xl font-bold tracking-tight text-balance text-slate-900 sm:text-5xl"
            >
              {service.heroHeading}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">{service.intro}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-md bg-brand px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                Få kostnadsfri offert
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-stone-300 bg-white px-7 py-3.5 text-base font-semibold text-slate-900 transition-colors hover:border-stone-400 hover:bg-stone-100"
              >
                <Phone className="size-5" aria-hidden="true" />
                {siteConfig.phoneDisplay}
              </a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-slate-500">
              <MapPin className="size-4 text-brand" aria-hidden="true" />
              Vi arbetar i {siteConfig.areaServed.join(", ")} med omnejd
            </p>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-lg">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Fördelar */}
      <section aria-labelledby="fordelar-heading" className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <h2
            id="fordelar-heading"
            className="max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            {service.benefitsHeading}
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((benefit) => {
              const Icon = benefitIcons[benefit.icon] ?? BadgeCheck;
              return (
                <div key={benefit.title}>
                  <span className="inline-flex size-12 items-center justify-center rounded-md bg-brand/10">
                    <Icon className="size-6 text-brand" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">{benefit.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Så går det till */}
      <section aria-labelledby="process-heading" className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <h2
              id="process-heading"
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
            >
              Så går det till
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Fyra tydliga steg från första kontakt till färdigt resultat – så att du alltid vet
              vad som händer härnäst.
            </p>
          </div>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {service.steps.map((step, index) => (
              <li
                key={step.title}
                className="relative rounded-lg border border-stone-200 bg-white p-7"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 items-center justify-center rounded-full bg-brand text-base font-bold text-white"
                >
                  {index + 1}
                </span>
                <h3 className="mt-5 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="border-y border-stone-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <h2
                id="faq-heading"
                className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
              >
                Vanliga frågor
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Hittar du inte svaret på din fråga? Ring oss på{" "}
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="font-semibold text-brand hover:text-brand-dark"
                >
                  {siteConfig.phoneDisplay}
                </a>{" "}
                – vi svarar gärna.
              </p>
            </div>
            <div className="lg:col-span-3">
              <div className="divide-y divide-stone-200 rounded-lg border border-stone-200">
                {service.faq.map((item) => (
                  <details key={item.question} className="group px-6 py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                      {item.question}
                      <ChevronDown
                        className="size-5 shrink-0 text-brand transition-transform group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Senaste projekt inom tjänsten – hämtas från Sanity */}
      {projects.length > 0 && (
        <section aria-labelledby="projekt-heading" className="bg-stone-50">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="projekt-heading" className="text-2xl font-bold text-slate-900">
                Senaste projekt inom {service.title.toLowerCase()}
              </h2>
              <Link
                href="/projekt"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark"
              >
                Se alla projekt
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Andra tjänster – intern länkning */}
      <section aria-labelledby="andra-tjanster-heading" className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 id="andra-tjanster-heading" className="text-2xl font-bold text-slate-900">
            Vi hjälper dig även med
          </h2>
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/tjanster/${other.slug}`}
                className="group flex items-center gap-5 rounded-lg border border-stone-200 bg-white p-5 transition-colors hover:border-brand"
              >
                <span className="relative aspect-4/3 w-28 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={other.image}
                    alt={other.imageAlt}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </span>
                <span>
                  <span className="block text-lg font-semibold text-slate-900">{other.title}</span>
                  <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                    Läs mer
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Avslutande CTA */}
      <section aria-labelledby="cta-heading" className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="rounded-lg bg-slate-900 px-8 py-14 text-center sm:px-14">
            <h2
              id="cta-heading"
              className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl"
            >
              Redo att komma igång med din {service.title.toLowerCase()}?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-slate-300">
              Boka ett kostnadsfritt hembesök så tittar vi på ditt projekt och ger dig en offert
              med fast pris – helt utan förpliktelser.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center rounded-md bg-brand px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Få kostnadsfri offert
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="inline-flex items-center justify-center gap-2 text-base font-semibold text-white transition-colors hover:text-slate-300"
              >
                <Phone className="size-5" aria-hidden="true" />
                Eller ring {siteConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
