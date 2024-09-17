"use client";

import ErrorLine from "@/components/reusable/error-line";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdatePassword } from "@/services/auth";
import { IChangePasswordSchema, ChangePasswordSchema } from "@/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit = (data: IChangePasswordSchema) => {
    if (data.newPassword === data.oldPassword) {
      toast.error("New password cannot be same as old password");
      return;
    }
    mutate({
      ...data,
      role: "mechanic",
    });
  };

  const { mutate, isPending } = useUpdatePassword({
    onSuccess: () => [reset()],
  });

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <h3 className="text-2xl font-semibold">Change Password</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            type="password"
            id="currentPassword"
            {...register("oldPassword")}
            className="input"
          />
          <ErrorLine message={errors.oldPassword?.message} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            type="password"
            id="newPassword"
            {...register("newPassword")}
            className="input"
          />
          <ErrorLine message={errors.newPassword?.message} />
        </div>
        <Button isLoading={isPending} className="w-fit self-end">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default Page;
