import axios from "./axios";
import { adminLoginToken, API_URL } from ".";
import { IDashboardDetails, IMechanicsResponse } from "@/types/admin";

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

  export const handleGetAllMechanicsLists = async (
    page: number,
    searchQuery: string,
    sortBy: string,
    sortOrder: string
  ): Promise<IMechanicsResponse> => {
    try {
      const response = await axios.get(API_URL.GET_MECHANICS_LISTS, {
        headers: {
          "admin-login-token": adminLoginToken,
        },
        params: {
          page,
          limit: 10, 
          regexSearch: { name: searchQuery },
          sortBy,
          sortOrder,
        },
      });
      return response.data.data;
    } catch (error) {
      throw new Error('An unexpected error occurred');
    }
  };