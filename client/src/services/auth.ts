import {
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
            queryClient.invalidateQueries({
              queryKey: ["user"],
            });
            resolve(res.data?.message);
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
  const router = useRouter();
  return useMutation({
    mutationFn: (otp: number): Promise<string> => {
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
            resolve(res.data?.message);
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

export const handleMechanicSignup = async (
  data: IMechanicsSignupSchema
): Promise<string> => {
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
        resolve(res.data?.message);
      })
      .catch((err) => {
        reject(err.response.data?.message);
      });
  });
};

export const handleMechanicLogin = async (
  data: IMechanicsLoginSchema
): Promise<string> => {
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
        resolve(res.data?.message);
      })
      .catch((err) => {
        reject(err.response.data?.message);
      });
  });
};

export const handleGetMechanicProfile = async (): Promise<IMechanicProfile> => {
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
};

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
