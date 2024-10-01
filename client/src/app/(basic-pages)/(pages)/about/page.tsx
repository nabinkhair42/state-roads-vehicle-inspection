import React from "react";
import { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  features,
  commitmentBadges,
  aboutUsContent,
} from "@/constants/aboutUs";

export const metadata: Metadata = {
  title: "Auto Inspector - Professional Car Inspection Services",
  description:
    "Auto Inspector offers expert car inspection services with detailed reports, qualified mechanics, and a 30-day vehicle protection guarantee. Ensure a smart car purchase with our comprehensive 250+ point inspection.",
};

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        {aboutUsContent.title}
      </h1>

      <div className="mb-20">
        <h2 className="text-2xl font-semibold mb-6">
          {aboutUsContent.introduction.title}
        </h2>
        {aboutUsContent.introduction.paragraphs.map((paragraph, index) => (
          <p key={index} className="text-muted-foreground mb-6">
            {paragraph}
          </p>
        ))}
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
          {aboutUsContent.commitmentTitle}
        </h2>
        {aboutUsContent.commitmentParagraphs.map((paragraph, index) => (
          <p key={index} className="text-muted-foreground mb-6">
            {paragraph}
          </p>
        ))}
        <div className="flex flex-wrap gap-3">
          {commitmentBadges.map((badge, index) => (
            <Badge key={index} variant="outline" className="text-sm py-1 px-3">
              {badge}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
