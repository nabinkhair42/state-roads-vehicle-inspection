"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {  Briefcase, Car, Check } from "lucide-react";

const inspectionCategories = [
  {
    name: "Engine",
    icon: Car,
    points: [
      "Oil levels and quality",
      "Coolant system integrity",
      "Belts and hoses condition",
      "Engine mounts stability",
      "Exhaust system check",
      "Fuel system inspection",
    ],
  },
  {
    name: "Interior",
    icon: Briefcase,
    points: [
      "Seats and upholstery condition",
      "Dashboard controls functionality",
      "Air conditioning performance",
      "Audio system quality",
      "Safety features test",
      "Interior lighting check",
    ],
  },
  {
    name: "Exterior",
    icon: Car,
    points: [
      "Body condition assessment",
      "Paint quality and finish",
      "Lights and signals operation",
      "Tires tread and pressure",
      "Windshield and wipers check",
      "Suspension system inspection",
    ],
  },
];

const InspectionPoints: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Engine");

  return (
    <section className="py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Comprehensive Inspection
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Our 250+ point inspection covers every aspect of your vehicle
        </p>
        <Tabs
          defaultValue="Engine"
          onValueChange={setActiveCategory}
          className="w-full max-w-4xl mx-auto"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8 p-1 rounded-lg">
            {inspectionCategories.map((category) => (
              <TabsTrigger
                key={category.name}
                value={category.name}
                className="flex items-center justify-center py-3 px-4 rounded-md transition-all duration-200 data-[state=active]:bg-white data-[state=active]:shadow-md"
              >
                <category.icon className="w-5 h-5 mr-2" />
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <AnimatePresence mode="wait">
            {inspectionCategories.map((category) => (
              <TabsContent key={category.name} value={category.name}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardHeader className="bg-gray-50 border-b">
                      <CardTitle className="flex items-center text-2xl">
                        <category.icon className="w-6 h-6 mr-3 text-primary" />
                        {category.name} Inspection Points
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {category.points.map((point, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="flex items-center bg-gray-50 p-3 rounded-lg"
                          >
                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                            <span className="text-gray-700">{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </div>
    </section>
  );
};

export default InspectionPoints;