"use client";
import Loading from "@/components/reusable/loading";
import { useAppDispatch } from "@/hooks/store";
import { useMechanicProfile, useUserProfile } from "@/services/auth";
import { mechanicLogin, userLogin } from "@/store/slices/auth-slice";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { use, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useUserProfile();

  const mechanic = useMechanicProfile();

  useEffect(() => {
    if (user.isLoading) return;
    if (user.isSuccess && user.data) {
      dispatch(userLogin(user.data));
    }
  }, [user.isSuccess, user.isLoading, user.data]);

  useEffect(() => {
    if (mechanic.isLoading) return;
    if (mechanic.isSuccess && mechanic.data) {
      dispatch(mechanicLogin(mechanic.data));
    }
  }, [mechanic.isSuccess, mechanic.isLoading, mechanic.data]);

  useEffect(() => {
    if (user.isSuccess && user.data && !user?.data?.isVerified) {
      router.replace("/verify-email/user");
    }
  }, [user]);

  useEffect(() => {
    if (mechanic.isSuccess && mechanic.data && !mechanic?.data?.isVerified) {
      router.replace("/verify-email/mechanic");
    }
  }, [mechanic]);

  if (user.isLoading || mechanic.isLoading) {
    return <Loading className="h-screen" />;
  }

  return children;
};

export default AuthProvider;
