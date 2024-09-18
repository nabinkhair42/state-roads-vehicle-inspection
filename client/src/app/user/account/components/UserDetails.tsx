"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAppSelector } from "@/hooks/store";

const UserDetails = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>View and edit your details here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <Label className="text-[16px] font-semibold">Name:</Label>
              <p>{user?.name}</p>
            </div>

            <div className="flex gap-2 items-center">
              <Label className="text-[16px] font-semibold">Email:</Label>
              <p>{user?.email}</p>
            </div>

            <div className="flex gap-2 items-center">
              <Label className="text-[16px] font-semibold">Phone Number:</Label>
              <p>{user?.phone}</p>
            </div>
            <div className="flex gap-2 items-center">
              <Label className="text-[16px] font-semibold">
                Store Created At:
              </Label>
              <p>
                {new Date(user?.createdAt ?? "").toLocaleDateString("en-US")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UserDetails;
