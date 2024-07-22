"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IMechanicsSignupSchema, MechanicsSignupSchema } from "@/zod";
import ErrorLine from "@/components/reusable/error-line";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleMechanicSignup } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const MechanicsForm = () => {
  const [isGettingCoordinates, setIsGettingCoordinates] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IMechanicsSignupSchema>({
    resolver: zodResolver(MechanicsSignupSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleMechanicSignup,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["mechanics"],
      });
      router.replace("/mechanics");
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const onSubmit: SubmitHandler<IMechanicsSignupSchema> = (data) => {
    mutate(data);
  };

  const handleGetCoordinates = () => {
    // ask for permission to get location
    setIsGettingCoordinates(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue(
          "storeCoordinates.longitude",
          position.coords.longitude.toString()
        );
        setValue(
          "storeCoordinates.latitude",
          position.coords.latitude.toString()
        );
        setIsGettingCoordinates(false);
      },
      (err) => {
        toast.error("Please provide location permission!");
        setIsGettingCoordinates(false);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Create Mechanic Account</CardTitle>
          <CardDescription>
            Create account from here if you are mechanic
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 flex flex-col gap-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              placeholder="John Doe"
              required
              {...register("name")}
            />
            <ErrorLine message={errors.name?.message} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="example@gmail.com"
              type="email"
              required
              {...register("email")}
            />
            <ErrorLine message={errors.email?.message} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Contact Number</Label>
            <Input
              placeholder="+697451514"
              type="tel"
              required
              {...register("phone")}
            />
            <ErrorLine message={errors.phone?.message} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              type="text"
              placeholder="XYZ Store"
              required
              {...register("storeName")}
            />
            <ErrorLine message={errors.storeName?.message} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="storeAddress">Store Address</Label>
            <Input
              type="text"
              placeholder="Address of your store"
              required
              {...register("storeAddress")}
            />
            <ErrorLine message={errors.storeAddress?.message} />
          </div>
          <div className="flex justify-between gap-4">
            <Label htmlFor="name">Store Coordinates</Label>
            <Button
              isLoading={isGettingCoordinates}
              onClick={handleGetCoordinates}
              type="button"
              variant="secondary"
              size="sm"
            >
              Get Coordinates
            </Button>
          </div>
          <div className="space-y-1 flex gap-2 justify-center items-center">
            <Input
              type="text"
              placeholder="Longitude"
              required
              {...register("storeCoordinates.longitude")}
            />
            <Input
              type="text"
              placeholder="Latitude"
              required
              {...register("storeCoordinates.latitude")}
            />
            <ErrorLine message={errors.storeCoordinates?.message} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              placeholder="Enter your Password"
              type="password"
              required
              {...register("password")}
            />
            <ErrorLine message={errors.password?.message} />
          </div>
        </CardContent>
        <CardFooter className="w-full flex flex-col gap-2 justify-center items-center">
          <Button
            isLoading={isPending}
            type="submit"
            className="flex gap-4 px-8"
          >
            Sign Up
          </Button>
          <p className="flex gap-2 justify-center items-center text-sm">
            Already have account?
            <Link className="text-primary text-sm" href="/sign-in">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
};

export default MechanicsForm;
