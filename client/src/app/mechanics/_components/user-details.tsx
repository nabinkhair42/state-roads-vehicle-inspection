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
import { CircleUser, Mail, User2Icon } from "lucide-react";
import { useAppSelector } from "@/hooks/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleMechanicsLogout } from "@/services/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserControl = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mechanic } = useAppSelector((state) => state.auth);
  const { mutate } = useMutation({
    mutationFn: handleMechanicsLogout,
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
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><User2Icon className="mr-2 text-muted-foreground w-5" />{mechanic?.name}</DropdownMenuItem>
          <DropdownMenuItem><Mail className="mr-2 text-muted-foreground w-5" />{mechanic?.email}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" disabled>
            View Profile
          </DropdownMenuItem>
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
