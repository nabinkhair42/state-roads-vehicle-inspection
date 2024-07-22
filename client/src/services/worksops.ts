import { IMechanicProfile } from "@/types/mechanics.types";
import axios from "axios";
import { API_URL } from ".";

export const handleGetAllWorkshops = async (): Promise<IMechanicProfile[]> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URL.GET_ALL_WORKSHOPS, {
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
