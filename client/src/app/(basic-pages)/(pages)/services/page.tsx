import type { Metadata } from "next";
import React from "react";
import ServiceTypes from "@/app/(basic-pages)/(pages)/services/components/ServiceTypes";
import Testimonial from "@/app/(basic-pages)/(pages)/services/components/Testimonial";
const BookAppointment = () => {
  return (
    <div className="container min-h-screen overflow-x-clip">
      <ServiceTypes />
      <Testimonial />
    </div>
  );
};

export default BookAppointment;

export const metadata: Metadata = {
  title: "Our Services - Comprehensive Car Inspection by Auto Inspector",
  description:
    "Discover our expert car inspection services designed to ensure a safe, smart, and informed car purchase. Over 250 inspection points, detailed reports, and certified mechanics at your service.",
  keywords:
    "car inspection services, vehicle inspection, car safety inspection, Auto Inspector services",
  openGraph: {
    type: "website",
    url: "https://www.autoinspector.com.au/services",
    title: "Our Services - Comprehensive Car Inspection",
    description:
      "Explore our detailed car inspection services. Ensure your car purchase is safe with our 250+ point inspection and professional mechanics.",
    images: [
      {
        url: "https://www.autoinspector.com.au/services",
        width: 800,
        height: 600,
        alt: "Car Inspection Services",
      },
    ],
  },
};
