import {
  ILoginSchema,
  IMechanicsLoginSchema,
  IMechanicsSignupSchema,
  ISignupSchema,
} from "@/zod";
import axios from "axios";
import { API_URL } from ".";

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
