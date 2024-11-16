import axios from "./axios";
import { adminLoginToken, API_URL } from ".";
import { IDashboardDetails } from "@/types/admin";
import { IMechanicsLists } from "@/types/admin";

export const handleGetAllDashboardDetails =
  async (): Promise<IDashboardDetails> => {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL.GET_DASHBOARD_STATS, {
          headers: {
            "admin-login-token": adminLoginToken,
          },
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err?.response?.data?.message || "An error occurred");
        });
    });
  };

export const handleGetAllMechanicsLists =
  async (): Promise<IMechanicsLists> => {
    return new Promise((resolve, reject) => {
      axios
        .get(API_URL.GET_MECHANICS_LISTS, {
          headers: {
            "admin-login-token": adminLoginToken,
          },
        })
        .then((res) => {
          resolve(res.data.data);
        })
        .catch((err) => {
          reject(err?.response?.data?.message);
        });
    });
  };
