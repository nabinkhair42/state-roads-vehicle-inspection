import axios from "./axios";
import { API_URL } from ".";

export const handleGetMechanicsStats = async (): Promise<{
  totalAppointments: number;
  totalServices: number;
}> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URL.GET_MECHANICS_STATS, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.data);
      })
      .catch((err) => {
        reject(err?.response?.data?.message);
      });
  });
};
