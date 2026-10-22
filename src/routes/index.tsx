import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/components/HomePage";

export const Route = createFileRoute("/")({
  ssr: false, // The 3D WebGL hero must never render on the server.
  head: () => ({
    meta: [
      { title: "Krishna Electrician | Electrical Services in Nellore & Kovur" },
      { name: "description", content: "Expert electrical solutions for homes, offices and industries in Nellore & Kovur. Fans, lights, wiring, MCBs, solar and more. Call or WhatsApp 9010367110." },
      { property: "og:title", content: "Krishna Electrician | Powering a Brighter Tomorrow" },
      { property: "og:description", content: "Safe, reliable and affordable electrical services by certified electricians. Nellore & Kovur, Andhra Pradesh." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Electrician", name: "Krishna Electrician",
        telephone: "+919010367110", areaServed: ["Nellore", "Kovur, Andhra Pradesh"],
        availableLanguage: ["English", "Telugu"],
      }),
    }],
  }),
  component: HomePage,
});
