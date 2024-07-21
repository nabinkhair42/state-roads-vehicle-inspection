import {
  ILoginSchema,
  IMechanicsLoginSchema,
  IMechanicsSignupSchema,
  ISignupSchema,
} from "@/zod";
import axios from "axios";
import { API_URL } from ".";
import { IUserProfile } from "@/types/user.types";
import { IMechanicProfile } from "@/types/mechanics.types";

export const handleUserSignup = async (
  data: ISignupSchema
): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URL.USER_SIGNUP, data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message);
      })
      .catch((err) => {
        reject(err.response.data?.message);
      });
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
        resolve(res.data?.message);
      })
      .catch((err) => {
        reject(err.response.data?.message);
      });
  });
};

export const handleUserLogin = async (data: ILoginSchema): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(API_URL.USER_LOGIN, data, {
        withCredentials: true,
      })
      .then((res) => {
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
        resolve(res.data?.message);
      })
      .catch((err) => {
        reject(err.response.data?.message);
      });
  });
};

export const handleGetUserProfile = async (): Promise<IUserProfile> => {
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
    axios
      .get(API_URL.MECHANICS_LOGOUT, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message);
      })
      .catch((err) => {
        reject(err.response.data?.message);
      });
  });
};

export const handleUserLogout = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URL.USER_LOGOUT, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message);
      })
      .catch((err) => {
        reject(err.response.data?.message);
      });
  });
};
