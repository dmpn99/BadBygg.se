import Link from "next/link";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import type { Project } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { services } from "@/lib/site";

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("sv-SE", { year: "numeric", month: "long" }).format(
    new Date(date),
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  const cover = project.images[0];
  const serviceTitle = services.find((s) => s.slug === project.service)?.title ?? project.service;

  return (
    <Link
      href={`/projekt/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <span className="relative aspect-4/3 overflow-hidden">
        {cover && (
          <Image
            src={urlFor(cover).width(800).height(600).url()}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <span className="absolute top-3 left-3 rounded-md bg-stone-50/95 px-2.5 py-1 text-xs font-semibold text-slate-900">
          {serviceTitle}
        </span>
      </span>
      <span className="flex flex-1 flex-col p-6">
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <MapPin className="size-3.5 text-brand" aria-hidden="true" />
          {project.location} · {formatMonth(project.completedAt)}
        </span>
        <h3 className="mt-2 text-lg font-semibold text-slate-900">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{project.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          Se projektet
          <ArrowRight
            className="size-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </span>
    </Link>
  );
}
