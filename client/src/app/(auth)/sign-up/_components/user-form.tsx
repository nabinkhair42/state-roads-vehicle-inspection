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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ISignupSchema, SignupSchema } from "@/zod";
import ErrorLine from "@/components/reusable/error-line";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUserSignup } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignupSchema>({
    resolver: zodResolver(SignupSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: handleUserSignup,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      window.location.href = "/"; ////TODO Router.Push
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  const onSubmit: SubmitHandler<ISignupSchema> = (data) => {
    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription className="text-sm">
            Create an account, if you want to get service for your vehicle!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Name*</Label>
            <Input
              type="text"
              placeholder="John Doe"
              required
              {...register("name")}
            />
            <ErrorLine message={errors.name?.message} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">Email*</Label>
            <Input
              placeholder="example@gmail.com"
              type="email"
              required
              {...register("email")}
            />
            <ErrorLine message={errors.email?.message} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">Contact Number*</Label>
            <Input
              placeholder="+697451514"
              type="tel"
              required
              {...register("phone")}
            />
            <ErrorLine message={errors.phone?.message} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password*</Label>
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
            className="flex gap-4 px-8 min-w-40"
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

export default UserForm;
