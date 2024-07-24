"use client";
import Loading from "@/components/reusable/loading";
import { useAppDispatch } from "@/hooks/store";
import {
  handleGetMechanicProfile,
  handleGetUserProfile,
} from "@/services/auth";
import { mechanicLogin, userLogin } from "@/store/slices/auth-slice";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const user = useQuery({
    queryFn: handleGetUserProfile,
    staleTime: Infinity,
    queryKey: ["user"],
    retry: false,
  });

  const mechanic = useQuery({
    queryFn: handleGetMechanicProfile,
    staleTime: Infinity,
    queryKey: ["mechanic"],
    retry: false,
  });

  useEffect(() => {
    if (user.isLoading) return;
    if (user.isSuccess) {
      dispatch(userLogin(user.data));
    }
  }, [user.isSuccess, user.isLoading, user.data]);

  useEffect(() => {
    if (mechanic.isLoading) return;
    if (mechanic.isSuccess) {
      dispatch(mechanicLogin(mechanic.data));
    }
  }, [mechanic.isSuccess, mechanic.isLoading, mechanic.data]);

  if (
    user.isLoading ||
    mechanic.isLoading ||
    mechanic.isFetching ||
    user.isFetching
  ) {
    return <Loading className="h-screen" />;
  }

  return children;
};

export default AuthProvider;
