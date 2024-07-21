"use client";
import Loading from "@/components/reusable/loading";
import { Button } from "@/components/ui/button";
import { handleGetAllMechanicsServices } from "@/services/service";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";
import ServiceCard from "./_components/service-card";
import { useAppSelector } from "@/hooks/store";

const Services = () => {
  const { mechanic } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useQuery({
    queryFn: () => handleGetAllMechanicsServices(mechanic?._id!),
    queryKey: ["services", mechanic?._id],
  });
  return (
    <div className="flex flex-col items-center justify-center h-full gap-6">
      <Link href={`/mechanics/services/new`} className="ml-auto">
        <Button>Create Service</Button>
      </Link>
      <div className="flex-grow h-full w-full flex flex-wrap gap-6">
        {isLoading ? (
          <Loading />
        ) : (
          data?.map((service, i) => <ServiceCard key={i} service={service} />)
        )}
      </div>
    </div>
  );
};

export default Services;
