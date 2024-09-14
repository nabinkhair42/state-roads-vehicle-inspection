"use client";

import { useRouter } from "next/navigation";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Check, TimerIcon } from "lucide-react";

const services = [
  {
    title: "Comprehensive Inspection",
    description: "Complete Peace of Mind for Your Vehicle Purchase",
    price: 45,
    duration: "60-90 min",
    included: [
      "250+ separate checks",
      "3-5 km road test",
      "Detailed five-page report",
      "Personal feedback from inspector",
      "Interior checks (Battery, AC, Fuel system, etc.)",
      "Body & chassis checks (Tyres, Suspension, etc.)",
    ],
  },
  {
    title: "Mechanical Inspection",
    description: "Comprehensive Assessment of Mechanical Condition",
    price: 30,
    duration: "45-60 min",
    included: [
      "Checks on motor, gear box, differential, and drive line",
      "Detailed mechanical health assessment",
      "Battery, AC compressor, Fuel system operation",
      "Engine & transmission leaks, Suspension, Tyres",
    ],
  },
  {
    title: "Body and Chassis Inspections",
    description: "Protection from Collision and Structural Damage Risks",
    price: 35,
    duration: "30-45 min",
    included: [
      "Structural integrity check",
      "Identifies repairs, scratches, cosmetic touch ups, rust, dents",
      "All panels including paint depth testing",
      "Turn signal lights, Fog lamps, Tail lights, etc.",
    ],
  },
];

export default function ServiceTypes() {
  const router = useRouter();
  const handleBookAppointment = () => {
    router.push("/book-appointment");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card
            key={index}
            className="flex flex-col h-full transition-shadow hover:shadow-lg"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                {service.title}
              </CardTitle>
              <CardDescription className="mt-2">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="text-center mb-4">
                <span className="text-4xl font-bold text-primary">
                  ${service.price}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  / inspection
                </span>
              </div>
              <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                <TimerIcon className="w-4 h-4 mr-2" />
                {service.duration}
              </div>
              <Separator className="my-4" />
              <ul className="space-y-2">
                {service.included.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="w-5 h-5 text-primary shrink-0 mr-2 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="pt-4">
              <Button className="w-full" onClick={handleBookAppointment}>
                Book Appointment
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
