import React from "react";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dotPattern";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserForm from "./_components/user-form";
import MechanicsForm from "./_components/mechanics-form";
import { Metadata } from "next";

const SignupPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
        )}
      />
      <div className="bg-white z-10">
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

export default SignupPage;

export const metadata: Metadata = {
  title: "Sign Up - Auto Inspector",
  description:
    "Sign up for an Auto Inspector account. Schedule a car inspection, view your inspection reports, and manage your bookings with ease.",
  keywords: "car inspection sign up, Auto Inspector sign up, car inspection account",
  openGraph: {
    type: "website",
    url: "https://www.autoinspector.com.au/sign-up",
    title: "Sign Up - Auto Inspector",
    description:
      "Sign up for an Auto Inspector account. Schedule a car inspection, view your inspection reports, and manage your bookings with ease.",
    images: [
      {
        url: "https://www.autoinspector.com.au/sign-up-og-image.jpg",
        width: 800,
        height: 600,
        alt: "Auto Inspector Sign Up",
      },
    ],
  },
};