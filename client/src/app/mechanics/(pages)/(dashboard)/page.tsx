"use client";
import Loading from "@/components/reusable/loading";
import { handleGetMechanicsStats } from "@/services/stats";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Dashboard = () => {
  const { isLoading, data } = useQuery({
    queryFn: handleGetMechanicsStats,
    queryKey: ["stats"],
  });
  return (
    <div className="flex flex-col h-full gap-6">
      <h2 className="text-2xl font-bold text-primary">Dashboard</h2>
      <div className="flex gap-5 flex-wrap">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {Object.keys(data ?? []).map((key, i) => (
              <div
                key={i}
                className="flex flex-col gap-2 bg-muted/20 items-end justify-end rounded-md border border-gray-200 p-4"
              >
                {" "}
                <span className="text-3xl font-bold text-primary">
                  {
                    // @ts-ignore
                    data[key]
                  }
                </span>
                <span className="text-sm font-semibold uppercase">
                  {
                    // convert camelCase to normal case
                    key.replace(/([A-Z])/g, " $1").toUpperCase()
                  }
                </span>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
