import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Den Vanskelige Samtalen | Unni Gjertsen & Runa Carlsen",
  description:
    "En kunstnerisk utforskning av dialogens potensiale. Et prosjekt av Unni Gjertsen og Runa Carlsen med podkast, performance og teater om samtalen som kunstverk. Støttet av Fritt Ord.",
  keywords: [
    "Den Vanskelige Samtalen",
    "Unni Gjertsen",
    "Runa Carlsen",
    "kunstprosjekt",
    "dialog",
    "performance",
    "teater",
    "podkast",
    "norsk kunst",
    "samtalekunst",
    "Fritt Ord",
    "kunstnerisk forskning",
    "norsk teater",
    "norsk performance",
    "samtalekultur",
    "kommunikasjonskunst",
    "Oslo",
    "Norge",
    "scenekunst",
  ],
  authors: [{ name: "Unni Gjertsen" }, { name: "Runa Carlsen" }],
  creator: "Unni Gjertsen & Runa Carlsen",
  publisher: "Den Vanskelige Samtalen",
  metadataBase: new URL("https://denvanskeligesamtalen.no"),
  alternates: {
    canonical: "/",
    languages: {
      "nb-NO": "/",
    },
  },
  openGraph: {
    title: "Den Vanskelige Samtalen | Kunstprosjekt om dialog",
    description:
      "En kunstnerisk utforskning av dialogens potensiale. Podkast, performance og teater av Unni Gjertsen og Runa Carlsen.",
    url: "https://denvanskeligesamtalen.no",
    siteName: "Den Vanskelige Samtalen",
    locale: "nb_NO",
    type: "website",
    images: [
      {
        url: "/images/walking.png",
        width: 1200,
        height: 630,
        alt: "Den Vanskelige Samtalen - Et kunstprosjekt av Unni Gjertsen og Runa Carlsen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Den Vanskelige Samtalen",
    description: "En kunstnerisk utforskning av dialogens potensiale",
    images: ["/images/walking.png"],
    creator: "@denvanskeligesamtalen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "din-google-verification-code",
  },
  category: "Arts & Culture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://denvanskeligesamtalen.no/#organization",
        name: "Den Vanskelige Samtalen",
        url: "https://denvanskeligesamtalen.no",
        logo: "https://denvanskeligesamtalen.no/images/fritt-ord.png",
        description:
          "Et kunstprosjekt om dialogens potensiale av Unni Gjertsen og Runa Carlsen",
        founder: [
          {
            "@type": "Person",
            name: "Unni Gjertsen",
          },
          {
            "@type": "Person",
            name: "Runa Carlsen",
          },
        ],
        sponsor: {
          "@type": "Organization",
          name: "Fritt Ord",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://denvanskeligesamtalen.no/#website",
        url: "https://denvanskeligesamtalen.no",
        name: "Den Vanskelige Samtalen",
        description: "En kunstnerisk utforskning av dialogens potensiale",
        inLanguage: "nb-NO",
        publisher: {
          "@id": "https://denvanskeligesamtalen.no/#organization",
        },
      },
      {
        "@type": "CreativeWork",
        "@id": "https://denvanskeligesamtalen.no/#creativework",
        name: "Den Vanskelige Samtalen",
        description:
          "Et kunstprosjekt som utforsker dialog gjennom podkast, performance og teater",
        creator: [
          {
            "@type": "Person",
            name: "Unni Gjertsen",
          },
          {
            "@type": "Person",
            name: "Runa Carlsen",
          },
        ],
        inLanguage: "nb-NO",
        genre: ["Performance Art", "Theater", "Podcast"],
        keywords: "dialog, performance, teater, podkast, kunst, Norge",
        sponsor: {
          "@type": "Organization",
          name: "Fritt Ord",
        },
      },
    ],
  };

  return (
    <html lang="nb" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#ffffff" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://denvanskeligesamtalen.no" />
        <meta name="geo.region" content="NO" />
        <meta name="geo.placename" content="Norge" />
        <meta name="language" content="Norwegian" />
      </head>
      <body className="antialiased bg-white text-neutral-950">
        {children}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
