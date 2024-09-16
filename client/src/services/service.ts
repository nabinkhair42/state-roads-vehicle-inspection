import { IServiceSchema } from "@/zod";
import axios from "./axios";
import { API_URL } from ".";
import { IService } from "@/types/service.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMechanicProfile } from "./auth";

export const useCreateService = (props: { onSuccess: () => void }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: mec } = useMechanicProfile();
  return useMutation({
    mutationFn: async (
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
            queryClient
              .invalidateQueries({
                queryKey: ["services", mec?._id],
              })
              .finally(() => {
                resolve(res.data?.message);
              });
          })
          .catch((err) => {
            reject(err?.response?.data?.message);
          });
      });
    },
    onSuccess: (data) => {
      toast.success(data);
      router.push("/mechanics/services");
      props.onSuccess();
    },
    onError: (error: string) => {
      toast.error(error);
    },
  });
};

export const useGetAllMechanicsServices = (id: string) => {
  return useQuery({
    queryFn: () => handleGetAllMechanicsServices(id!),
    queryKey: ["services", id],
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
