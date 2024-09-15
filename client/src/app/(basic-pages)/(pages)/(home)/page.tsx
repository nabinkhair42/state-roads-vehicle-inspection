import CarShowcase from "@/app/(basic-pages)/components/CarShowcase";
import FeaturesSectionDemo from "@/app/(basic-pages)/components/Features";
import Inquiry from "@/app/(basic-pages)/components/Inquiry";
import React from "react";
import AlternativeHero from "@/app/(basic-pages)/components/AlternativeHeroSection";
import DynamicHero from "@/app/(basic-pages)/components/Alternative2";
import InspectionPoints from "../../components/Points";

const page = () => {
  return (
    <main className="h-full w-full overflow-x-clip">
      
      <DynamicHero />
      <AlternativeHero />
      {/* <CarShowcase /> */}
      <FeaturesSectionDemo />
      <InspectionPoints />
      <Inquiry />
    </main>
  );
};

export default page;
