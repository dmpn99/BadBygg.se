import type { Metadata } from "next";
import Link from "next/link";
import { Images } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import { sanityFetch } from "@/sanity/lib/client";
import { allProjectsQuery, type Project } from "@/sanity/lib/queries";

/** ISR: nya projekt från Sanity dyker upp inom 10 minuter utan ny deploy. */
export const revalidate = 600;

export const metadata: Metadata = {
  title: "Utförda projekt i Falun & Borlänge – badrum, kök och utbyggnader",
  description:
    "Se våra senaste badrumsrenoveringar, köksrenoveringar och utbyggnader i Falun och Borlänge med omnejd. Riktiga projekt hos riktiga kunder – inspireras inför din renovering.",
  alternates: { canonical: "/projekt" },
};

export default async function ProjektPage() {
  const projects = await sanityFetch<Project[]>(allProjectsQuery, {}, []);

  return (
    <section aria-labelledby="projekt-heading" className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-brand uppercase">Referenser</p>
          <h1
            id="projekt-heading"
            className="mt-4 text-4xl font-bold tracking-tight text-balance text-slate-900 sm:text-5xl"
          >
            Utförda projekt i Falun & Borlänge
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Här visar vi ett urval av våra senaste renoveringar och byggprojekt – riktiga hem hos
            riktiga kunder i Dalarna. Hittar du något som liknar det du drömmer om?{" "}
            <Link href="/kontakt" className="font-semibold text-brand hover:text-brand-dark">
              Berätta för oss
            </Link>
            , så tittar vi på ditt projekt.
          </p>
        </div>

        {projects.length > 0 ? (
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="mt-14 flex flex-col items-center rounded-lg border border-dashed border-stone-300 bg-white px-8 py-20 text-center">
            <Images className="size-10 text-stone-400" aria-hidden="true" />
            <p className="mt-5 text-lg font-semibold text-slate-900">
              Inga projekt publicerade ännu
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-600">
              Vi fyller på med nya referensprojekt löpande. Under tiden får du gärna höra av dig så
              berättar vi mer om vad vi gjort åt andra kunder i ditt område.
            </p>
            <Link
              href="/kontakt"
              className="mt-6 inline-flex items-center rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Kontakta oss
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
