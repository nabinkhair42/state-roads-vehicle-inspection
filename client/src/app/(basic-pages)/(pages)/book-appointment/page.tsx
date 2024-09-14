import React from "react";
import Steps from "./components/Steps";
import CalenderBooking from "./components/CalanderBooking";
import { Separator } from "@/components/ui/separator";

const BookAppointment = () => {
  return (
    <div className="container flex flex-col">
      {/* <Steps />
      <Separator /> */}
      <CalenderBooking />
    </div>
  );
};

export default BookAppointment;
