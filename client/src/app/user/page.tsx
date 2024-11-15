"use client";
import React from "react";
import AppointmentList from "@/app/user/_components/UserAppointment";
import { useAppSelector } from "@/hooks/store";
import NotFound from "@/components/pages/not-found";
const Page = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <NotFound />;
  }
  return (
    <div>
      <AppointmentList />
    </div>
  );
};

export default Page;
