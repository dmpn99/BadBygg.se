import { defineField, defineType } from "sanity";

/**
 * Projektreferens – en "spoke" i Hub & Spoke-modellen.
 * Hantverkarna fyller i detta i Studio (gärna direkt i mobilen på plats).
 */
export const projectType = defineType({
  name: "project",
  title: "Projekt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Rubrik",
      description: 'T.ex. "Helrenoverat badrum i Bjursås"',
      type: "string",
      validation: (rule) => rule.required().error("Projektet behöver en rubrik."),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      description: "Klicka på Generate så skapas den från rubriken.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required().error("Klicka på Generate för att skapa en slug."),
    }),
    defineField({
      name: "service",
      title: "Tjänst",
      description: "Vilken tjänst gäller projektet? Kopplar projektet till rätt tjänstesida.",
      type: "string",
      options: {
        list: [
          { title: "Badrumsrenovering", value: "badrumsrenovering" },
          { title: "Utbyggnad & tillbyggnad", value: "utbyggnad" },
          { title: "Köksrenovering", value: "koksrenovering" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required().error("Välj vilken tjänst projektet gäller."),
    }),
    defineField({
      name: "location",
      title: "Ort",
      description: 'T.ex. "Falun" eller "Kvarnsveden, Borlänge". Viktigt för lokal SEO!',
      type: "string",
      validation: (rule) => rule.required().error("Ange orten – det är viktigt för Google."),
    }),
    defineField({
      name: "completedAt",
      title: "Färdigställt",
      type: "date",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Kort sammanfattning",
      description: "1–2 meningar som visas i projektlistan och i Googles sökresultat.",
      type: "text",
      rows: 3,
      validation: (rule) =>
        rule.required().max(200).error("Skriv en kort sammanfattning (max 200 tecken)."),
    }),
    defineField({
      name: "description",
      title: "Beskrivning",
      description:
        "Berätta om projektet: vad kunden ville ha, vad ni gjorde och materialval. Ju mer text, desto bättre för Google.",
      type: "text",
      rows: 8,
    }),
    defineField({
      name: "images",
      title: "Bilder",
      description: "Ladda upp projektbilder. Fyll i en beskrivande alt-text för varje bild.",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt-text",
              description: 'Beskriv bilden, t.ex. "Kaklad dusch med svarta detaljer".',
              type: "string",
              validation: (rule) => rule.required().error("Alt-text krävs för SEO."),
            }),
          ],
        },
      ],
      validation: (rule) => rule.required().min(1).error("Ladda upp minst en bild."),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "location", media: "images.0" },
  },
});
