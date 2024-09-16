"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateService from "../_components/create-service";
import { useQuery } from "@tanstack/react-query";
import { useGetAllMechanicsServices } from "@/services/service";
import { useAppSelector } from "@/hooks/store";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mechanic } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetAllMechanicsServices(mechanic?._id!);
  return (
    <>
      <CreateService
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        disabledServices={data?.map((service) => service.serviceType) ?? []}
      />
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
              You have {data?.length ?? 0} services
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {data?.length === 3
                ? "You cannot create more than 3 services"
                : "You can start selling as soon as you add a service."}
            </p>
            <Button
              disabled={isLoading || data?.length === 3}
              onClick={() => setIsOpen(true)}
              className="flex gap-2"
            >
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
