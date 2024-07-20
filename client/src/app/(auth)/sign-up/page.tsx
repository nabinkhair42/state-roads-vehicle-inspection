import React from "react";
import { cn } from "@/lib/utils";
import DotPattern from "@/components/ui/dotPattern";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserForm from "./_components/user-form";
import MechanicsForm from "./_components/mechanics-form";

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
