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
} from "react-icons/md";

import { handleGetAllDashboardDetails } from "@/services/admin";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function DashboardStats() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: handleGetAllDashboardDetails,
  });

  const stats = [
    {
      icon: MdOutlineEngineering,
      title: "Mechanics",
      value: data?.mechanicsCount, 
      description: "have signed up for the service",
    },
    {
      icon: MdPerson,
      title: "Users",
      value: data?.usersCount,
      description: "are exploring the service",
    },
    {
      icon: MdDirectionsCar,
      title: "Appointments",
      value: data?.appointmentsCount, 
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
                {isLoading ? <Loader2 className="animate-spin" /> : stat.value}
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