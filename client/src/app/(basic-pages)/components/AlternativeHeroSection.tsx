"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Hero from "@/assets/hero/OIG3.jpeg";
import { Points, AlternativeContent } from "@/constants/HomePage";

const SimpleHero = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/10"
    >
      <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 container">
          {AlternativeContent.map((item, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                {item.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                {item.description}
              </p>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          ></motion.div>
          <motion.ul
            className="mt-8 space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {Points.map((item, index) => (
              <li
                key={index}
                className="flex items-center text-muted-foreground"
              >
                <CheckCircle className="mr-2 h-5 w-5 text-primary" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>
        <div className="w-full md:w-1/2 relative">
          <motion.div
            className="relative h-[300px] md:h-[500px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={Hero}
              alt="Car Inspection"
              fill
              className="object-cover rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-50 rounded-lg"></div>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl opacity-50 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl opacity-50 -z-10"></div>
    </section>
  );
};

export default SimpleHero;
