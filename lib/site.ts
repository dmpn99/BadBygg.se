/**
 * Central plats för sidans innehåll och konfiguration.
 *
 * OBS (Hub & Spoke-förberedelse): Datastrukturerna nedan speglar de dokument
 * som senare skapas i Sanity (t.ex. `service` och `siteSettings`). När CMS:et
 * kopplas in ersätts dessa konstanter med GROQ-hämtningar – komponenterna
 * behöver då inte ändras eftersom de redan konsumerar typerna nedan.
 */

export const siteConfig = {
  name: "Bad & Bygg Falun Borlänge",
  legalName: "Bad & Bygg Falun/Borlänge AB",
  description:
    "Badrumsrenovering, utbyggnad och köksrenovering i Falun och Borlänge. BKR-certifierade plattsättare och erfarna snickare – alltid med fast pris och trygg garanti.",
  url: "https://www.badbygg.se",
  phone: "+46 23 000 00 00",
  phoneDisplay: "023-000 00 00",
  email: "info@badbygg.se",
  address: {
    streetAddress: "Exempelgatan 1",
    postalCode: "791 00",
    addressLocality: "Falun",
    addressCountry: "SE",
  },
  areaServed: ["Falun", "Borlänge", "Säter", "Gagnef", "Leksand"],
} as const;

/**
 * Ikonnycklarna är strängar (inte React-komponenter) så att datan förblir
 * serialiserbar och enkel att flytta till Sanity. Mappningen till Lucide-ikoner
 * sker i komponenterna som renderar innehållet.
 */
export interface ServiceBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceStep {
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

/** Motsvarar ett framtida `service`-dokument i Sanity (hub-sida per tjänst). */
export interface Service {
  /** Slug som blir hub-sidans URL: /tjanster/[slug] */
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  /** SEO */
  metaTitle: string;
  metaDescription: string;
  /** Landningssidans innehåll */
  heroHeading: string;
  intro: string;
  benefitsHeading: string;
  benefits: ServiceBenefit[];
  steps: ServiceStep[];
  faq: ServiceFaq[];
}

export const services: Service[] = [
  {
    slug: "badrumsrenovering",
    title: "Badrumsrenovering",
    excerpt:
      "Helrenovering av badrum med BKR-certifierade plattsättare. Vi tar hand om allt – från rivning och tätskikt till kakel och slutbesiktning.",
    image: "/hero-badrum.jpg",
    imageAlt: "Nyrenoverat modernt badrum med kakel och glasdusch i Falun",
    metaTitle: "Badrumsrenovering i Falun & Borlänge – fast pris & BKR-certifierat",
    metaDescription:
      "Helrenovering av badrum i Falun och Borlänge. BKR-certifierade plattsättare, fast pris, kvalitetsdokument och garanti. Få en kostnadsfri offert idag.",
    heroHeading: "Badrumsrenovering i Falun & Borlänge – tryggt, tätt och snyggt",
    intro:
      "Badrummet är hemmets mest krävande rum att renovera – här möts vatten, el och tätskikt, och allt måste bli rätt. Våra BKR-certifierade plattsättare helrenoverar ditt badrum från rivning till slutbesiktning, alltid med fast pris och ett kvalitetsdokument som din försäkring gäller för.",
    benefitsHeading: "Därför renoverar du badrummet med oss",
    benefits: [
      {
        icon: "badgeCheck",
        title: "BKR-certifierade plattsättare",
        description:
          "Tätskikt och plattsättning utförs enligt Byggkeramikrådets branschregler – och du får kvalitetsdokumentet som bevis.",
      },
      {
        icon: "wallet",
        title: "Fast pris – inga överraskningar",
        description:
          "Du får en tydlig offert med fast pris innan vi börjar. Dyker något oväntat upp bakom väggarna stämmer vi alltid av med dig först.",
      },
      {
        icon: "shieldCheck",
        title: "Försäkringsgiltigt & garanti",
        description:
          "Vi är fullt försäkrade och lämnar garanti på både material och arbete. Ditt badrum ska hålla tätt i decennier, inte år.",
      },
      {
        icon: "handshake",
        title: "En kontakt hela vägen",
        description:
          "Vi samordnar el, VVS och besiktning åt dig. Du har en enda kontaktperson från första hembesöket till nyckelfärdigt badrum.",
      },
    ],
    steps: [
      {
        title: "Kostnadsfritt hembesök",
        description:
          "Vi kommer hem till dig, mäter upp badrummet och lyssnar på dina idéer. Du får konkreta råd om material och lösningar direkt.",
      },
      {
        title: "Offert med fast pris",
        description:
          "Inom några dagar får du en detaljerad offert där allt ingår – rivning, tätskikt, kakel, el, VVS och städning.",
      },
      {
        title: "Renovering med tydlig tidsplan",
        description:
          "Vi river, bygger upp och kaklar enligt en tidsplan du godkänt. Du får löpande uppdateringar under hela projektet.",
      },
      {
        title: "Slutbesiktning & kvalitetsdokument",
        description:
          "Vi går igenom badrummet tillsammans och du får kvalitetsdokument enligt BKR samt garantibevis. Sedan är det bara att njuta.",
      },
    ],
    faq: [
      {
        question: "Vad kostar en badrumsrenovering?",
        answer:
          "Priset beror på badrummets storlek, materialval och hur mycket som ska ändras i planlösningen. Efter ett kostnadsfritt hembesök får du alltid en offert med fast pris, så att du vet exakt vad renoveringen kostar innan vi börjar. Glöm inte att ROT-avdraget sänker arbetskostnaden – vi drar det direkt på fakturan.",
      },
      {
        question: "Hur lång tid tar en badrumsrenovering?",
        answer:
          "En helrenovering av ett normalstort badrum tar vanligtvis 3–5 veckor. Tätskikt behöver härda ordentligt mellan momenten, och det är inget vi kompromissar med. Du får en tydlig tidsplan i offerten och löpande uppdateringar under arbetets gång.",
      },
      {
        question: "Får jag använda ROT-avdraget?",
        answer:
          "Ja. Badrumsrenovering i din permanent- eller fritidsbostad ger rätt till ROT-avdrag på arbetskostnaden. Vi sköter hela ansökan och drar avdraget direkt på fakturan, så att du slipper pappersarbetet.",
      },
      {
        question: "Kan jag bo hemma under renoveringen?",
        answer:
          "Absolut, de flesta av våra kunder bor hemma under renoveringen. Har du bara ett badrum hjälper vi dig planera så att vatten och avlopp är avstängt så kort tid som möjligt, och vi håller arbetsområdet avskärmat och städat.",
      },
    ],
  },
  {
    slug: "utbyggnad",
    title: "Utbyggnad & tillbyggnad",
    excerpt:
      "Behöver huset växa? Våra erfarna snickare bygger ut ditt hem – från bygglovsritning till färdigt rum, med fast pris och tydlig tidsplan.",
    image: "/hero-utbyggnad.jpg",
    imageAlt: "Modern tillbyggnad i trä på klassisk faluröd villa i Dalarna",
    metaTitle: "Utbyggnad & tillbyggnad i Falun & Borlänge – från bygglov till inflytt",
    metaDescription:
      "Bygg ut villan med erfarna snickare i Falun och Borlänge. Vi hjälper dig hela vägen – bygglov, stomme, tak och invändigt. Kostnadsfri offert med fast pris.",
    heroHeading: "Utbyggnad i Falun & Borlänge – mer plats att leva på",
    intro:
      "Trångbott men vill inte flytta? En genomtänkt utbyggnad ger familjen mer yta och höjer husets värde. Våra snickare har byggt ut villor i Dalarna i över tio år och tar helhetsansvar – från bygglovsritningar och grund till tät stomme, tak och färdiga rum.",
    benefitsHeading: "Därför bygger du ut med oss",
    benefits: [
      {
        icon: "fileCheck",
        title: "Hjälp med bygglovet",
        description:
          "Vi tar fram ritningar och underlag och guidar dig genom kommunens bygglovsprocess, oavsett om det gäller tillbyggnad eller attefall.",
      },
      {
        icon: "hammer",
        title: "Erfarna snickare",
        description:
          "Vårt eget snickarlag bygger stomme, tak och fasad med hantverk som smälter in i husets befintliga karaktär.",
      },
      {
        icon: "clock",
        title: "Tydlig tidsplan",
        description:
          "En utbyggnad ska inte dra ut på tiden. Du får en realistisk tidsplan i offerten och vet alltid vad som händer härnäst.",
      },
      {
        icon: "handshake",
        title: "Helhetsansvar",
        description:
          "Grund, el, VVS, isolering och invändig finish – vi samordnar alla moment så att du bara behöver ha kontakt med oss.",
      },
    ],
    steps: [
      {
        title: "Kostnadsfritt platsbesök",
        description:
          "Vi tittar på huset och tomten, diskuterar dina behov och ger en ärlig bild av vad som är möjligt – och vad det kostar.",
      },
      {
        title: "Ritningar & bygglov",
        description:
          "Vi tar fram bygglovshandlingar och sköter kontakten med kommunen tills startbeskedet är klart.",
      },
      {
        title: "Byggnation",
        description:
          "Grund, stomme, tak och fasad – därefter isolering, el, VVS och invändig finish. Allt enligt godkänd tidsplan.",
      },
      {
        title: "Slutbesked & inflytt",
        description:
          "Vi ser till att slutbesked finns på plats och lämnar över nyckelfärdiga rum. Garantin gäller såklart hela vägen.",
      },
    ],
    faq: [
      {
        question: "Behöver jag bygglov för en utbyggnad?",
        answer:
          "Oftast ja, men mindre tillbyggnader kan i vissa fall göras som attefallstillbyggnad med enbart anmälan. Vi vet vad som gäller i Falun, Borlänge och kranskommunerna och hjälper dig med hela processen – från ritningar till startbesked.",
      },
      {
        question: "Vad kostar en utbyggnad?",
        answer:
          "Kostnaden styrs av storlek, grundläggning och hur rummet ska användas – ett badrum eller kök i utbyggnaden kostar mer än ett sovrum. Efter platsbesöket får du en offert med fast pris så att du kan fatta beslut på riktiga siffror.",
      },
      {
        question: "Hur lång tid tar en utbyggnad?",
        answer:
          "Räkna med 2–4 månaders byggtid för en normalstor tillbyggnad, plus tiden för bygglovet. Vi bygger tätt hus tidigt i processen så att huset aldrig står oskyddat.",
      },
      {
        question: "Kan ni matcha husets befintliga stil?",
        answer:
          "Ja, det är ofta det viktigaste med en lyckad tillbyggnad. Våra snickare anpassar panel, taklutning, fönstersättning och detaljer så att det nya smälter ihop med det gamla – eller skapar en medveten kontrast om du hellre vill det.",
      },
    ],
  },
  {
    slug: "koksrenovering",
    title: "Köksrenovering",
    excerpt:
      "Vi renoverar ditt kök från grunden – snickeri, kakel, stänkskydd och montering. Ett hantverk som håller i vardagen, år efter år.",
    image: "/hero-kok.jpg",
    imageAlt: "Nyrenoverat skandinaviskt kök med köksö och kaklat stänkskydd",
    metaTitle: "Köksrenovering i Falun & Borlänge – snickeri & montering med fast pris",
    metaDescription:
      "Renovera köket med erfarna snickare i Falun och Borlänge. Montering, måttanpassat snickeri och kaklade stänkskydd – med fast pris och garanti. Boka kostnadsfri offert.",
    heroHeading: "Köksrenovering i Falun & Borlänge – hjärtat i hemmet, byggt att hålla",
    intro:
      "Köket är rummet där vardagen händer – och där slarv i monteringen syns varje dag. Våra snickare renoverar ditt kök från grunden: rivning, nya stommar och luckor, måttanpassat snickeri, kaklat stänkskydd och perfekt montering ner till sista millimetern.",
    benefitsHeading: "Därför renoverar du köket med oss",
    benefits: [
      {
        icon: "ruler",
        title: "Montering på millimetern",
        description:
          "Skevheter i golv och väggar är regel, inte undantag, i äldre hus. Våra snickare passar in stommar och luckor så att allt blir rakt och tyst.",
      },
      {
        icon: "sparkles",
        title: "Kaklade stänkskydd",
        description:
          "Våra plattsättare sätter stänkskydd i kakel eller klinker som lyfter hela köket – snyggt, tåligt och lätt att hålla rent.",
      },
      {
        icon: "handshake",
        title: "El & VVS samordnat",
        description:
          "Nya vitvaror, blandare och belysning kräver behöriga installatörer. Vi tar in och samordnar dem så att du slipper jaga hantverkare.",
      },
      {
        icon: "wallet",
        title: "Fast pris & ROT-avdrag",
        description:
          "Tydlig offert med fast pris, och vi drar ROT-avdraget direkt på fakturan. Du vet vad köket kostar innan vi lyfter ett verktyg.",
      },
    ],
    steps: [
      {
        title: "Kostnadsfritt hembesök",
        description:
          "Vi mäter upp köket, går igenom dina önskemål och ger råd om planlösning, material och vad som ger mest värde för pengarna.",
      },
      {
        title: "Offert med fast pris",
        description:
          "Du får en tydlig offert som täcker rivning, snickeri, montering, kakling samt samordning av el och VVS.",
      },
      {
        title: "Renovering",
        description:
          "Vi river ut det gamla, förbereder väggar och golv, monterar det nya köket och kaklar stänkskyddet – med minsta möjliga störning i din vardag.",
      },
      {
        title: "Genomgång & garanti",
        description:
          "Vi finjusterar luckor och lådor, går igenom allt tillsammans och lämnar garanti på arbetet. Sedan är det bara att börja laga mat.",
      },
    ],
    faq: [
      {
        question: "Vad kostar en köksrenovering?",
        answer:
          "Det beror främst på kökets storlek, stommar och luckor samt om planlösningen ändras. Behåller du befintlig planlösning kommer du billigare undan. Efter hembesöket får du en offert med fast pris – och ROT-avdraget sänker arbetskostnaden ytterligare.",
      },
      {
        question: "Hur lång tid tar en köksrenovering?",
        answer:
          "En typisk köksrenovering tar 2–4 veckor beroende på omfattning. Byts även el, VVS eller planlösning tar det något längre. Du får en tydlig tidsplan i offerten.",
      },
      {
        question: "Kan jag använda köket under renoveringen?",
        answer:
          "Under rivning och montering är köket ur bruk, men vi hjälper dig gärna att sätta upp en tillfällig diskbänk och arbetsyta i ett annat rum. De flesta klarar vardagen bra med lite planering.",
      },
      {
        question: "Monterar ni kök från alla leverantörer?",
        answer:
          "Ja. Vi monterar kök från alla större leverantörer och bygger även platsbyggda lösningar när du vill ha något utöver standardmåtten. Vi hjälper dig gärna att granska ritningen innan du beställer.",
      },
    ],
  },
];

/* -------------------------------------------------------------------------
 * OM OSS / E-E-A-T
 * PLATSHÅLLARE: Alla namn, årtal och nummer nedan är exempel och MÅSTE bytas
 * ut mot riktiga uppgifter innan lansering. Verifierbara uppgifter (BKR-nummer,
 * org.nr, försäkringsbolag) är en central förtroendesignal för Google.
 * ---------------------------------------------------------------------- */

export const founder = {
  /** PLATSHÅLLARE – byt till grundarens riktiga namn. */
  name: "Anders Eriksson",
  title: "Grundare & hantverkare",
  yearsInTrade: 12,
  /** Grundarens berättelse – ett stycke per element. */
  story: [
    "Bad & Bygg började med en enkel övertygelse: ett hantverk som utförs ordentligt behöver aldrig göras om. Efter många år som snickare och plattsättare åt andra firmor startade jag eget – tröttnad på genvägar och övertygad om att kunder i Falun och Borlänge förtjänade bättre.",
    "Idag är vi ett sammansvetsat lag av snickare och plattsättare som renoverat hundratals badrum, kök och hem runt om i Dalarna. Vi bor här själva, våra barn går i skola här, och våra kunder är våra grannar. Det är därför varje jobb betyder något – ett dåligt utfört badrum i Falun skulle vi få höra talas om på ICA.",
    "Min princip är densamma idag som dag ett: gör det rätt, gör det tätt, och lämna aldrig ett hem förrän kunden är stolt över det. Det är så vi byggt vårt rykte – och det är så vi tänker fortsätta.",
  ],
} as const;

/** Motsvarar ett framtida `teamMember`-dokument i Sanity. */
export interface TeamMember {
  /** PLATSHÅLLARE – byt till riktiga namn. */
  name: string;
  role: string;
  yearsInTrade: number;
  certifications: string[];
}

export const team: TeamMember[] = [
  {
    name: "Anders Eriksson",
    role: "Grundare · Snickare & plattsättare",
    yearsInTrade: 12,
    certifications: ["BKR-behörighet", "Våtrumscertifikat BBV"],
  },
  {
    name: "Johan Lindberg",
    role: "Plattsättare",
    yearsInTrade: 8,
    certifications: ["BKR-behörighet", "Våtrumscertifikat BBV"],
  },
  {
    name: "Marcus Ström",
    role: "Snickare",
    yearsInTrade: 10,
    certifications: ["Yrkesbevis snickare", "ID06"],
  },
  {
    name: "Erik Wallin",
    role: "Snickare & projektledare",
    yearsInTrade: 7,
    certifications: ["Yrkesbevis snickare", "ID06"],
  },
];

/** Verifierbara företagsuppgifter – visas i trust-sektionen på Om oss. */
export interface Credential {
  icon: string;
  title: string;
  value: string;
  description: string;
}

export const credentials: Credential[] = [
  {
    icon: "badgeCheck",
    title: "BKR-behörighet",
    /** PLATSHÅLLARE – byt till ert riktiga behörighetsnummer. */
    value: "Behörighet nr 12-3456",
    description:
      "Våra plattsättare arbetar enligt Byggkeramikrådets branschregler för våtrum (BBV). Behörigheten går att verifiera i BKR:s offentliga register.",
  },
  {
    icon: "droplets",
    title: "Säker Vatten",
    value: "Auktoriserad VVS-partner",
    description:
      "Alla VVS-arbeten utförs av auktoriserade installatörer enligt Säker Vattens branschregler – ett krav för att din försäkring ska gälla fullt ut.",
  },
  {
    icon: "building",
    title: "Organisationsnummer",
    /** PLATSHÅLLARE – byt till ert riktiga org.nr. */
    value: "556123-4567",
    description:
      "Bad & Bygg Falun/Borlänge AB är ett registrerat aktiebolag. Slå gärna upp oss hos Bolagsverket eller allabolag.se.",
  },
  {
    icon: "fileCheck",
    title: "Godkänd för F-skatt",
    value: "F-skattsedel finns",
    description:
      "Vi är godkända för F-skatt, vilket krävs för att du som kund ska kunna använda ROT-avdraget tryggt och lagligt.",
  },
  {
    icon: "umbrella",
    title: "Ansvarsförsäkring",
    /** PLATSHÅLLARE – byt till ert försäkringsbolag och belopp. */
    value: "Försäkrad via Trygg-Hansa",
    description:
      "Fullständig ansvars- och allriskförsäkring genom hela projektet. Skulle något oförutsett hända är både du och ditt hem skyddade.",
  },
];

export const navLinks = [
  { href: "/tjanster/badrumsrenovering", label: "Badrum" },
  { href: "/tjanster/utbyggnad", label: "Utbyggnad" },
  { href: "/tjanster/koksrenovering", label: "Kök" },
  { href: "/projekt", label: "Projekt" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/kontakt", label: "Kontakt" },
] as const;
