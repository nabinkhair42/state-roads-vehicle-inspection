"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cog, ShipWheel, CircleGauge, Hammer } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const features = [
  {
    title: "Qualified Mechanics",
    description:
      "Our hand-picked team of mechanics brings years of industry experience, ensuring you're in capable hands.",
    icon: Hammer,
  },
  {
    title: "Peace of Mind",
    description:
      "We eliminate the risk of expensive mistakes, ensuring no nasty surprises when purchasing a car.",
    icon: ShipWheel,
  },
  {
    title: "Detailed Reports",
    description:
      "Our comprehensive 250+ point inspection report includes a one-on-one review with an expert mechanic.",
    icon: CircleGauge,
  },
  {
    title: "30-Day Guarantee",
    description:
      "We offer a 30-day Stateroads vehicle protection guarantee, backing our commitment to excellence.",
    icon: Cog,
  },
];

export function Features() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Auto Inspector?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader>
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl mb-2">{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </motion.div>
  );
};

export default Features;
