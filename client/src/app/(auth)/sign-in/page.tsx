import React from "react";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dotPattern";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserForm from "./_components/user-fom";
import MechanicsForm from "./_components/mechanics-form";
import { Metadata } from "next";

const LoginPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
      />
      <div className=" z-10">
        <Tabs defaultValue="user" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="user">User</TabsTrigger>
            <TabsTrigger value="mechanics">Mechanic</TabsTrigger>
          </TabsList>
          <TabsContent value="user">
            <UserForm />
          </TabsContent>
          <TabsContent value="mechanics">
            <MechanicsForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginPage;

export const metadata: Metadata = {
  title: "Sign In - Auto Inspector",
  description:
    "Sign in to your Auto Inspector account. Schedule a car inspection, view your inspection reports, and manage your bookings with ease.",
  keywords: "car inspection login, Auto Inspector login, car inspection account",
  openGraph: {
    type: "website",
    url: "https://www.autoinspector.com.au/sign-in",
    title: "Sign In - Auto Inspector",
    description:
      "Sign in to your Auto Inspector account. Schedule a car inspection, view your inspection reports, and manage your bookings with ease.",
    images: [
      {
        url: "https://www.autoinspector.com.au/sign-in-og-image.jpg",
        width: 800,
        height: 600,
        alt: "Auto Inspector Sign In",
      },
    ],
  },
};