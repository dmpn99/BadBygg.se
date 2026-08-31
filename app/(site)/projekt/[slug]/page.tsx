import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, CalendarDays, ChevronRight, ArrowRight, Phone } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/client";
import { projectBySlugQuery, projectSlugsQuery, type Project } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { services, siteConfig } from "@/lib/site";

/** ISR: nya/uppdaterade projekt renderas on-demand och cachas i 10 minuter. */
export const revalidate = 600;

export async function generateStaticParams() {
  const slugs = await sanityFetch<string[]>(projectSlugsQuery, {}, []);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projekt/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = await sanityFetch<Project | null>(projectBySlugQuery, { slug }, null);
  if (!project) return {};

  const cover = project.images[0];
  return {
    title: `${project.title} – utfört projekt`,
    description: project.excerpt,
    alternates: { canonical: `/projekt/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: cover
        ? [{ url: urlFor(cover).width(1200).height(900).url(), width: 1200, height: 900 }]
        : undefined,
    },
  };
}

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("sv-SE", { year: "numeric", month: "long" }).format(
    new Date(date),
  );
}

export default async function ProjektDetailPage({ params }: PageProps<"/projekt/[slug]">) {
  const { slug } = await params;
  const project = await sanityFetch<Project | null>(projectBySlugQuery, { slug }, null);
  if (!project) notFound();

  const service = services.find((s) => s.slug === project.service);
  const [cover, ...gallery] = project.images;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Hem", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Projekt", item: `${siteConfig.url}/projekt` },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${siteConfig.url}/projekt/${project.slug}`,
      },
    ],
  };

  return (
    <article className="bg-stone-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
              <Link href="/projekt" className="transition-colors hover:text-brand">
                Projekt
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-4" />
            </li>
            <li aria-current="page" className="font-medium text-slate-900">
              {project.title}
            </li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <header className="max-w-3xl">
          {service && (
            <Link
              href={`/tjanster/${service.slug}`}
              className="text-sm font-semibold tracking-wide text-brand uppercase hover:text-brand-dark"
            >
              {service.title}
            </Link>
          )}
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance text-slate-900 sm:text-5xl">
            {project.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <span className="flex items-center gap-1.5">
              <MapPin className="size-4 text-brand" aria-hidden="true" />
              {project.location}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4 text-brand" aria-hidden="true" />
              Färdigställt {formatMonth(project.completedAt)}
            </span>
          </div>
        </header>

        {cover && (
          <div className="relative mt-10 aspect-video overflow-hidden rounded-lg">
            <Image
              src={urlFor(cover).width(1600).height(900).url()}
              alt={cover.alt}
              fill
              priority
              sizes="(min-width: 1280px) 1216px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900">Om projektet</h2>
            <p className="mt-4 text-lg leading-relaxed whitespace-pre-line text-slate-600">
              {project.description || project.excerpt}
            </p>

            {gallery.length > 0 && (
              <>
                <h2 className="mt-12 text-2xl font-bold text-slate-900">Fler bilder</h2>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  {gallery.map((image) => (
                    <figure
                      key={image.asset._ref}
                      className="relative aspect-4/3 overflow-hidden rounded-lg"
                    >
                      <Image
                        src={urlFor(image).width(800).height(600).url()}
                        alt={image.alt}
                        fill
                        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </figure>
                  ))}
                </div>
              </>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-28 rounded-lg border border-stone-200 bg-white p-8">
              <h2 className="text-xl font-bold text-slate-900">Vill du ha något liknande?</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Vi ger dig gärna en kostnadsfri offert med fast pris på ditt projekt
                {service ? ` inom ${service.title.toLowerCase()}` : ""}.
              </p>
              <Link
                href="/kontakt"
                className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
              >
                Få kostnadsfri offert
              </Link>
              <a
                href={`tel:${siteConfig.phone}`}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-stone-300 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-stone-100"
              >
                <Phone className="size-4" aria-hidden="true" />
                {siteConfig.phoneDisplay}
              </a>
              {service && (
                <Link
                  href={`/tjanster/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark"
                >
                  Läs mer om {service.title.toLowerCase()}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
