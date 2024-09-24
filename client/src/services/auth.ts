import {
  IChangePasswordSchema,
  ILoginSchema,
  IMechanicsLoginSchema,
  IMechanicsSignupSchema,
  ISignupSchema,
} from "@/zod";
import axios from "./axios";
import { API_URL } from ".";
import { IUserProfile } from "@/types/user.types";
import { IMechanicProfile } from "@/types/mechanics.types";
import Cookie from "js-cookie";
import { TOKENS } from "@/constants/token";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const useUserSignUp = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: ISignupSchema): Promise<string> => {
      return new Promise((resolve, reject) => {
        axios
          .post(API_URL.USER_SIGNUP, data, {
            withCredentials: true,
          })
          .then((res) => {
            const token = res?.data?.data?.token as {
              key: string;
              value: string;
            };
            Cookie.set(token.key, token.value);
            queryClient
              .invalidateQueries({
                queryKey: ["user"],
              })
              .finally(() => {
                resolve(res.data?.message);
              });
          })
          .catch((err) => {
            reject(err.response.data?.message);
          });
      });
    },
    onSuccess: (msg) => {
      toast.success(msg);
      router.push("/verify-email/user");
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useResendOTPForUserSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (): Promise<string> => {
      return new Promise((resolve, reject) => {
        axios
          .get(API_URL.RESEND_OTP_USER_SIGNUP, {
            withCredentials: true,
          })
          .then((res) => {
            queryClient
              .invalidateQueries({
                queryKey: ["user"],
              })
              .finally(() => {
                resolve(res.data?.message);
              });
          })
          .catch((err) => {
            reject(err.response.data?.message);
          });
      });
    },
    onSuccess: (msg) => {
      toast.success(msg);
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useVerifyOTPForUserSignup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (otp: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            API_URL.VERIFY_OTP_USER_SIGNUP,
            { otp },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            queryClient
              .invalidateQueries({
                queryKey: ["user"],
              })
              .finally(() => {
                resolve(res.data?.message);
              });
          })
          .catch((err) => {
            reject(err.response.data?.message);
          });
      });
    },
    onSuccess: (msg) => {
      toast.success(msg);
      router.push("/");
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async (): Promise<IUserProfile> => {
      return new Promise((resolve, reject) => {
        axios
          .get(API_URL.USER_PROFILE, {
            withCredentials: true,
          })
          .then((res) => {
            resolve(res.data?.data);
          })
          .catch((err) => {
            reject(err.response?.data?.message);
          });
      });
    },
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useUserLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: ILoginSchema): Promise<string> => {
      return new Promise((resolve, reject) => {
        axios
          .post(API_URL.USER_LOGIN, data, {
            withCredentials: true,
          })
          .then((res) => {
            const token = res?.data?.data?.token as {
              key: string;
              value: string;
            };
            Cookie.set(token.key, token.value);
            queryClient
              .invalidateQueries({
                queryKey: ["user"],
              })
              .finally(() => {
                resolve(res.data?.message);
              });
          })
          .catch((err) => {
            reject(err.response.data?.message);
          });
      });
    },
    onSuccess: (msg) => {
      toast.success(msg);
      router.push("/");
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useMechanicsSignup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: IMechanicsSignupSchema): Promise<string> => {
      return new Promise((resolve, reject) => {
        axios
          .post(API_URL.MECHANICS_SIGNUP, data, {
            withCredentials: true,
          })
          .then((res) => {
            const token = res?.data?.data?.token as {
              key: string;
              value: string;
            };
            Cookie.set(token.key, token.value);
            queryClient
              .invalidateQueries({
                queryKey: ["mechanics"],
              })
              .finally(() => {
                resolve(res.data?.message);
              });
          })
          .catch((err) => {
            reject(err.response.data?.message);
          });
      });
    },
    onSuccess: (msg) => {
      toast.success(msg);
      router.push("/verify-email/mechanic");
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useResendOTPForMechanicsSignup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (): Promise<string> => {
      return new Promise((resolve, reject) => {
        axios
          .get(API_URL.RESEND_OTP_MECHANICS_SIGNUP, {
            withCredentials: true,
          })
          .then((res) => {
            queryClient
              .invalidateQueries({
                queryKey: ["mechanics"],
              })
              .finally(() => {
                resolve(res.data?.message);
              });
          })
          .catch((err) => {
            reject(err.response.data?.message);
          });
      });
    },
    onSuccess: (msg) => {
      toast.success(msg);
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useVerifyOTPForMechanicsSignup = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (otp: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        axios
          .post(
            API_URL.VERIFY_OTP_MECHANICS_SIGNUP,
            { otp },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            queryClient
              .invalidateQueries({
                queryKey: ["mechanics"],
              })
              .finally(() => {
                resolve(res.data?.message);
              });
          })
          .catch((err) => {
            reject(err.response.data?.message);
          });
      });
    },
    onSuccess: (msg) => {
      toast.success(msg);
      router.push("/");
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useMechanicLogin = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: IMechanicsLoginSchema): Promise<string> => {
      return new Promise((resolve, reject) => {
        axios
          .post(API_URL.MECHANICS_LOGIN, data, {
            withCredentials: true,
          })
          .then((res) => {
            const token = res?.data?.data?.token as {
              key: string;
              value: string;
            };
            Cookie.set(token.key, token.value);
            queryClient
              .invalidateQueries({
                queryKey: ["mechanics"],
              })
              .finally(() => {
                resolve(res.data?.message);
              });
          })
          .catch((err) => {
            reject(err.response.data?.message);
          });
      });
    },
    onSuccess: (msg) => {
      toast.success(msg);
      router.push("/mechanics");
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

export const useMechanicProfile = () => {
  return useQuery({
    queryKey: ["mechanics"],
    queryFn: async (): Promise<IMechanicProfile> => {
      return new Promise((resolve, reject) => {
        axios
          .get(API_URL.MECHANICS_PROFILE, {
            withCredentials: true,
          })
          .then((res) => {
            resolve(res.data?.data);
          })
          .catch((err) => {
            reject(err.response?.data?.message);
          });
      });
    },
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

// do not convert logout to hooks
export const handleMechanicsLogout = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    Cookie.remove(TOKENS.MECHANICS_AUTH_TOKEN_ID);
    resolve("You are logged out!");
  });
};

export const handleUserLogout = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    Cookie.remove(TOKENS.AUTH_TOKEN_ID);
    resolve("You are logged out!");
  });
};

export const useUpdatePassword = ({ onSuccess }: { onSuccess: () => void }) => {
  return useMutation({
    mutationFn: (
      data: IChangePasswordSchema & {
        role: "user" | "mechanic";
      }
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        axios
          .put(
            data.role === "user"
              ? API_URL.UPDATE_USER_PASSWORD
              : API_URL.UPDATE_MECHANIC_PASSWORD,
            data,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            resolve(res.data?.message);
          })
          .catch((err) => {
            reject(err.response.data?.message);
          });
      });
    },
    onSuccess: (msg) => {
      toast.success(msg);
      onSuccess();
    },
    onError: (err: string) => {
      toast.error(err);
    },
  });
};

// Function to handle User password reset request
export const userResetPasswordRequest = async (email: string) => {
  const response = await fetch(API_URL.USER_RESET_PASSWORD_REQUEST, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return await response.json();
};

// Function to handle User password reset verification
export const userResetPasswordVerify = async (
  email: string,
  newPassword: string,
  otp: string
) => {
  const response = await fetch(API_URL.USER_RESET_PASSWORD_VERIFY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword, otp }),
  });
  return await response.json();
};

// Function to handle Mechanic password reset request
export const mechanicResetPasswordRequest = async (email: string) => {
  const response = await fetch(API_URL.MECHANIC_RESET_PASSWORD_REQUEST, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return await response.json();
};

// Function to handle Mechanic password reset verification
export const mechanicResetPasswordVerify = async (
  email: string,
  newPassword: string,
  otp: string
) => {
  const response = await fetch(API_URL.MECHANIC_RESET_PASSWORD_VERIFY, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, newPassword, otp }),
  });
  return await response.json();
};
