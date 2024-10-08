import { IMechanicProfile } from "@/types/mechanics.types";
import axios from "./axios";
import { API_URL } from ".";

export const handleGetAllWorkshops = async (
  query?: string
): Promise<IMechanicProfile[]> => {
  const url = query
    ? `${API_URL.GET_ALL_WORKSHOPS}?query=${query}`
    : API_URL.GET_ALL_WORKSHOPS;
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
