"use client";
import React from "react";
import Link from "next/link";
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
import { Key } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginSchema, LoginSchema } from "@/zod";
import ErrorLine from "@/components/reusable/error-line";
import { handleUserLogin } from "@/services/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<ILoginSchema> = (data) => {
    mutate(data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: handleUserLogin,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      router.replace("/");
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>User Login</CardTitle>
          <CardDescription>
            Use credentials to sign is to dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="email">Username</Label>
            <Input
              placeholder="example@gmail.com"
              type="email"
              required
              {...register("email")}
            />
            <ErrorLine message={errors.email?.message} />
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
            type="submit"
            isLoading={isPending}
            className="flex gap-4 px-8"
          >
            <Key />
            Login
          </Button>
          <Link className="text-primary text-sm" href="/forget">
            Forget Password?
          </Link>
          <p className="flex gap-2 justify-center items-center text-sm">
            Don't have account?
            <Link className="text-primary text-sm" href="/sign-up">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </form>
  );
};

export default UserForm;
