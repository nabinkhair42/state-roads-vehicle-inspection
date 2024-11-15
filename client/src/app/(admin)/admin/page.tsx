"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MdOutlineEngineering,
  MdPerson,
  MdDirectionsCar,
  MdStar,
} from "react-icons/md";

export default function DashboardStats() {
  const stats = [
    {
      icon: MdOutlineEngineering,
      title: "Mechanics",
      value: "98+",
      description: "have signed up for the service",
    },
    {
      icon: MdPerson,
      title: "Users",
      value: "198+",
      description: "are exploring the service",
    },
    {
      icon: MdDirectionsCar,
      title: "Inspections",
      value: "1,250+",
      description: "completed this month",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Auto Inspector Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="p-6 bg-primary/10 text-primary rounded-full aspect-square flex items-center justify-center w-20 h-20 mx-auto">
                <stat.icon className="h-10 w-10" />
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <CardTitle className="text-3xl font-bold mb-2">
                {stat.value}
              </CardTitle>
              <CardDescription className="text-lg font-medium">
                {stat.title}
              </CardDescription>
              <CardDescription className="text-sm mt-2">
                {stat.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
