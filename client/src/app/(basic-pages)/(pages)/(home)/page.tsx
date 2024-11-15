import FeaturesSectionDemo from "@/app/(basic-pages)/_components/Features";
import Inquiry from "@/app/(basic-pages)/_components/Inquiry";
import React from "react";
import AlternativeHero from "@/app/(basic-pages)/_components/AlternativeHeroSection";
import DynamicHero from "@/app/(basic-pages)/_components/DynamicHero";
import InspectionPoints from "@/app/(basic-pages)/_components/Points";
import { Metadata } from "next";

const Page = () => {
  return (
    <main className="h-full w-full overflow-x-clip">
      <DynamicHero />
      <AlternativeHero />
      <FeaturesSectionDemo />
      <InspectionPoints />
      <Inquiry />
    </main>
  );
};

export default Page;

export const metadata: Metadata = {
  title: "Home Page",
  description: "Welcome to the State Roads Vehicle Inspection Home Page",
};
