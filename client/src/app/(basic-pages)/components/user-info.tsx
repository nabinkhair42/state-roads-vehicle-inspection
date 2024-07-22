"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CircleUser } from "lucide-react";
import { useAppSelector } from "@/hooks/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleMechanicsLogout, handleUserLogout } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserControl = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mechanic, user } = useAppSelector((state) => state.auth);
  const { mutate } = useMutation({
    mutationFn: user ? handleUserLogout : handleMechanicsLogout,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.setQueryData(["mechanic"], null);
      router.push("/");
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full p-1 h-fit w-fit"
          >
            <CircleUser className="h-6 w-6" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-40 z-[9999]">
          <DropdownMenuLabel>
            My Account ({user ? "User" : "Mechanic"})
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>{user?.name ?? mechanic?.name}</DropdownMenuItem>
          <DropdownMenuItem>{user?.email ?? mechanic?.email}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            View Profile
          </DropdownMenuItem>
          {mechanic ? (
            <DropdownMenuItem
              onClick={() => {
                router.push("/mechanics/");
              }}
              className="cursor-pointer"
            >
              Mechanics Dashboard
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => {
                router.push("/sign-in");
              }}
              className="cursor-pointer"
            >
              Mechanics Login
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              mutate();
            }}
            className="cursor-pointer"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserControl;
