"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { DynamicHeroFeatures } from "@/constants/HomePage";

const DynamicHero = () => {
  const router = useRouter();
  const handleBookInspection = () => {
    router.push("/book-appointment");
  };

  const handleLearnMore = () => {
    router.push("/#features");
  };

  return (
    <section className="relative overflow-hidden py-20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4  py-1 px-3">
              Auto Inspector
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Expert Car Inspections <br />
              <span className="text-primary">You Can Trust</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Make confident decisions with our comprehensive inspections,
              detailed reports, and unmatched expertise.
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-4 mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button size={"lg"} onClick={handleBookInspection}>
              Book an Inspection
            </Button>
            <Button variant="outline" size={"lg"} onClick={handleLearnMore}>
              Learn More
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {DynamicHeroFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-primary/10 rounded-full p-4 mb-3">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full filter blur-3xl opacity-50 -z-10"></div>

        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-blue-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-green-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>
    </section>
  );
};

export default DynamicHero;
