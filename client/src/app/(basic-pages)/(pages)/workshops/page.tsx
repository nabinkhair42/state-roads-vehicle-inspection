import dynamic from "next/dynamic";
import type { Metadata } from "next";

const MapComponent = dynamic(
  () => import("@/app/(basic-pages)/(pages)/workshops/_components/map"),
  { ssr: false }
);

export default function WorkshopsPage() {
  return (
    <div>
      <MapComponent />
    </div>
  );
}

// /workshops/metadata.ts (or /workshops/page.tsx)

export const metadata: Metadata = {
  title: "Find Trusted Car Inspection Workshops Near You | Auto Inspector",
  description:
    "Explore our certified car inspection workshops nationwide. Schedule a detailed vehicle inspection with Auto Inspector’s expert mechanics and ensure your vehicle is road-ready.",
  keywords:
    "car inspection workshops, vehicle inspection services, car safety checks, Auto Inspector workshops, car inspection locations",
  openGraph: {
    type: "website",
    url: "https://www.autoinspector.com.au/workshops",
    title: "Find Trusted Car Inspection Workshops Near You | Auto Inspector",
    description:
      "Discover Auto Inspector's trusted car inspection workshops across Australia. Our certified experts provide comprehensive vehicle inspections to ensure your car's safety and reliability.",
    images: [
      {
        url: "https://www.autoinspector.com.au/workshops-og-image.jpg",
        width: 800,
        height: 600,
        alt: "Auto Inspector Car Inspection Workshops",
      },
    ],
  },
};
