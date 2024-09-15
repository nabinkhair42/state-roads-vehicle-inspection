import React from "react";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Car, FileText, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Auto Inspector - Professional Car Inspection Services",
  description:
    "Auto Inspector offers expert car inspection services with detailed reports, qualified mechanics, and a 30-day vehicle protection guarantee. Ensure a smart car purchase with our comprehensive 250+ point inspection.",
};

const features = [
  {
    icon: CheckCircle,
    title: "Comprehensive Inspections",
    description: "Our 250+ point inspection covers all aspects of the vehicle.",
  },
  {
    icon: Car,
    title: "Qualified Mechanics",
    description: "Experienced and certified mechanics perform all inspections.",
  },
  {
    icon: FileText,
    title: "Detailed Reports",
    description: "Receive a thorough report with photos and expert analysis.",
  },
  {
    icon: Shield,
    title: "30-Day Protection",
    description:
      "Enjoy peace of mind with our 30-day vehicle protection guarantee.",
  },
];

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        About Auto Inspector
      </h1>

      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-6">
          Your Trusted Partner in Car Inspections
        </h2>
        <p className="text-muted-foreground mb-6">
          At Auto Inspector, we're committed to providing expert car inspection
          services that help you make informed decisions when purchasing a
          vehicle. With our team of qualified mechanics and comprehensive 250+
          point inspection process, we ensure that you have all the information
          you need to buy with confidence.
        </p>
        <p className="text-muted-foreground">
          Our detailed reports, complete with photos and expert analysis, give
          you a clear picture of the vehicle's condition. Plus, our unique
          30-day vehicle protection guarantee provides extra peace of mind after
          your purchase.
        </p>
      </div>

      <h2 className="text-3xl font-semibold text-center mb-12">
        Why Choose Auto Inspector?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {features.map((feature, index) => (
          <Card key={index} className="hover:shadow-xl transition-shadow">
            <CardHeader>
              <feature.icon className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-10 rounded-lg hover:shadow-lg transition-shadow">
        <h2 className="text-2xl font-semibold mb-6">
          Our Commitment to Quality
        </h2>
        <p className="text-muted-foreground mb-6">
          At Auto Inspector, we're dedicated to providing the highest quality
          car inspection services. Our team of expert mechanics undergoes
          regular training to stay up-to-date with the latest automotive
          technologies and inspection techniques.
        </p>
        <p className="text-muted-foreground mb-8">
          We use state-of-the-art diagnostic tools and follow a rigorous 250+
          point inspection checklist to ensure that no detail is overlooked. Our
          goal is to provide you with a comprehensive understanding of the
          vehicle's condition, empowering you to make an informed decision.
        </p>
        <div className="flex flex-wrap gap-3">
          <Badge variant="outline" className="text-sm py-1 px-3">
            Certified Mechanics
          </Badge>
          <Badge variant="outline" className="text-sm py-1 px-3">
            State-of-the-Art Tools
          </Badge>
          <Badge variant="outline" className="text-sm py-1 px-3">
            Rigorous Standards
          </Badge>
          <Badge variant="outline" className="text-sm py-1 px-3">
            Customer-Focused
          </Badge>
        </div>
      </div>
    </div>
  );
}
