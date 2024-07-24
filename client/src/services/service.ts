import { IServiceSchema } from "@/zod";
import axios from "axios";
import { API_URL } from ".";
import { IService } from "@/types/service.type";

export const handleCreateService = async (
  data: IServiceSchema & {
    thumbnail: File | null;
  }
): Promise<string> => {
  const fd = new FormData();
  fd.append("description", data.description);
  fd.append("price", data.price.toString());
  fd.append("serviceType", data.serviceType);
  data.features?.forEach((feature) => {
    fd.append("features", feature);
  });
  fd.append("thumbnail", data.thumbnail as Blob);

  return new Promise((resolve, reject) => {
    axios
      .post(API_URL.CREATE_SERVICE, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data?.message);
      })
      .catch((err) => {
        reject(err?.response?.data?.message);
      });
  });
};

export const handleGetAllMechanicsServices = async (
  id: string
): Promise<IService[]> => {
  const url = `${API_URL.GET_MECHANICS_SERVICES}/${id}`;
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
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

export const handleGetAllServices = async (
  query?: string
): Promise<IService[]> => {
  const url = query
    ? `${API_URL.ALL_SERVICES}?query=${query}`
    : API_URL.ALL_SERVICES;
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
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
