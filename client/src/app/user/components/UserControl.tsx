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
import { CircleUser, LogInIcon, MailCheck, PhoneCall, User2Icon } from "lucide-react";
import { useAppSelector } from "@/hooks/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleUserLogout } from "@/services/auth";
import { toast } from "sonner";

const UserControl = () => {
  const { user } = useAppSelector((state) => state.auth);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: handleUserLogout,
    onSuccess: (msg) => {
      toast.success(msg);
      queryClient.setQueryData(["user"], null);
      window.location.href = "/";
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-fit">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><User2Icon className="mr-2 text-muted-foreground w-5" /> {user?.name}</DropdownMenuItem>
          <DropdownMenuItem><MailCheck className="mr-2 text-muted-foreground w-5 " />{user?.email}</DropdownMenuItem>
          <DropdownMenuItem><PhoneCall className="mr-2 text-muted-foreground w-5 " />{user?.phone}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => mutate()}><LogInIcon className="mr-2 text-muted-foreground w-5 " />Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserControl;
