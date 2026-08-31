"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/site";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/95 backdrop-blur-sm">
      <nav
        aria-label="Huvudmeny"
        className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
      >
        {/* Logga */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="Bad & Bygg Falun-Borlänge – startsida">
          <Image
            src="/badbygg-logo.png"
            alt="Bad & Bygg Falun-Borlänge logotyp"
            width={180}
            height={54}
            priority
            className="h-11 w-auto"
          />
        </Link>

        {/* Länkar – desktop */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-slate-900 transition-colors hover:text-brand"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA – desktop */}
        <div className="hidden lg:block">
          <Link
            href="/kontakt"
            className="inline-flex items-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Få offert
          </Link>
        </div>

        {/* Hamburgare – mobil */}
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="mobilmeny"
          aria-label={mobileOpen ? "Stäng menyn" : "Öppna menyn"}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-900 lg:hidden"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {/* Mobilmeny */}
      {mobileOpen && (
        <div id="mobilmeny" className="border-t border-stone-200 bg-stone-50 lg:hidden">
          <ul className="space-y-1 px-4 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-slate-900 hover:bg-stone-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/kontakt"
                onClick={() => setMobileOpen(false)}
                className="block rounded-md bg-brand px-3 py-3 text-center text-base font-semibold text-white hover:bg-brand-dark"
              >
                Få offert
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
