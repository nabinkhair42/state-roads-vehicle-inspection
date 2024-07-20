import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import DotPattern from "@/components/ui/dotPattern";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import UserForm from "./_components/user-fom";
import MechanicsForm from "./_components/mechanics-form";

const LoginPage = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
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

export default LoginPage;
