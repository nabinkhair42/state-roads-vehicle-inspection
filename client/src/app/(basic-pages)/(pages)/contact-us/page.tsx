import { Metadata } from "next";
import React from "react";
import ContactUS from "@/app/(basic-pages)/(pages)/contact-us/Form";

const page = () => {
  return (
    <>
      <ContactUS />
    </>
  );
};

export default page;

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch with Auto Inspector",
  description:
    "Contact Auto Inspector for all your car inspection queries and support. We're here to help you schedule appointments, answer questions, and provide detailed information about our services.",
  keywords:
    "contact Auto Inspector, customer support, car inspection support, get in touch Auto Inspector, contact page",
  openGraph: {
    type: "website",
    url: "https://www.autoinspector.com.au/contact-us",
    title: "Contact Us - Auto Inspector",
    description:
      "Need help with car inspection services? Contact Auto Inspector today for questions, appointment bookings, and customer support.",
    images: [
      {
        url: "https://www.autoinspector.com.au/contact-us",
        width: 800,
        height: 600,
        alt: "Contact Auto Inspector",
      },
    ],
  },
};
