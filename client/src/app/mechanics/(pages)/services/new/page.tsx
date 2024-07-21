"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateService from "../_components/create-service";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <CreateService isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Create Your Own Services
          </h1>
        </div>
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
          x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no services
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              You can start selling as soon as you add a service.
            </p>
            <Button onClick={() => setIsOpen(true)} className="flex gap-2">
              <Plus />
              Add Service
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
