"use client";

import { useState, type FormEvent } from "react";
import { Loader2, Send, CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Koppla formuläret till en backend genom att sätta FORM_ENDPOINT.
 * Formspree: skapa ett formulär på formspree.io och klistra in URL:en,
 * t.ex. "https://formspree.io/f/xxxxxxxx". Fältnamnen (name, phone,
 * email, message) följer redan Formspree-konventionen.
 */
const FORM_ENDPOINT = "";

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-md border border-stone-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-brand focus:outline-2 focus:outline-offset-0 focus:outline-brand/30";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!FORM_ENDPOINT) {
      // Ingen backend kopplad ännu – visa bekräftelse direkt under utveckling.
      console.warn("ContactForm: FORM_ENDPOINT saknas. Formulärdata:", Object.fromEntries(new FormData(form)));
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Formuläret kunde inte skickas (${response.status})`);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-stone-200 bg-white p-10 text-center">
        <CheckCircle2 className="size-12 text-brand" aria-hidden="true" />
        <h2 className="mt-5 text-2xl font-semibold text-slate-900">Tack för ditt meddelande!</h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-600">
          Vi har tagit emot din förfrågan och återkommer så snart vi kan – oftast inom en arbetsdag.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-brand hover:text-brand-dark"
        >
          Skicka ett nytt meddelande
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-stone-200 bg-white p-8 sm:p-10"
      aria-label="Kontaktformulär"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-900">
            Namn <span className="text-brand">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Anna Andersson"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-900">
            Telefon <span className="text-brand">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="070-123 45 67"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-900">
            E-post <span className="text-brand">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="anna@exempel.se"
            className={inputClasses}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-900">
            Meddelande <span className="text-brand">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Berätta kort om ditt projekt – t.ex. vad som ska renoveras, ungefärlig storlek och när du vill komma igång."
            className={`${inputClasses} resize-y`}
          />
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="mt-5 flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
          Något gick fel när meddelandet skulle skickas. Försök igen eller ring oss direkt.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="size-5 animate-spin" aria-hidden="true" />
            Skickar…
          </>
        ) : (
          <>
            <Send className="size-5" aria-hidden="true" />
            Skicka förfrågan
          </>
        )}
      </button>

      <p className="mt-4 text-xs leading-relaxed text-slate-500">
        Vi använder dina uppgifter enbart för att besvara din förfrågan.
      </p>
    </form>
  );
}
