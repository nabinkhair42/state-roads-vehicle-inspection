import React from "react";
import { Metadata } from "next";
import CalenderBooking from "./components/CalanderBooking";

const BookAppointment = () => {
  return (
    <div className="container flex flex-col">
      <CalenderBooking />
    </div>
  );
};

export default BookAppointment;


export const metadata: Metadata = {
  title: "Book Your Car Inspection Appointment - Auto Inspector",
  description:
    "Schedule your car inspection appointment today with Auto Inspector. Our certified mechanics offer comprehensive vehicle inspections with over 250 points checked. Easy online booking available.",
  keywords:
    "book car inspection, schedule car inspection, car inspection appointment, online booking for car inspection, Auto Inspector services",
  openGraph: {
    type: "website",
    url: "https://www.yourwebsite.com/book-appointment",
    title: "Book Your Car Inspection Appointment - Auto Inspector",
    description:
      "Book an appointment for your car inspection with Auto Inspector. Get detailed reports and ensure a safe vehicle purchase. Online booking available now.",
    images: [
      {
        url: "https://www.autoinspector.com.au/contact-us",
        width: 800,
        height: 600,
        alt: "Book car inspection appointment",
      },
    ],
  },
};
