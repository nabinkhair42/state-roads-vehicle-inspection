import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "./axios";
import { API_URL } from ".";
import { INotification } from "@/types/notification.types";

export const useUserNotifications = () => {
  return useQuery({
    queryKey: ["notifications", "user"],
    queryFn: async (): Promise<INotification[]> => {
      return new Promise((resolve, reject) => {
        axios
          .get(API_URL.GET_USER_NOTIFICATIONS)
          .then((res) => {
            resolve(res.data?.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    staleTime: 0,
    refetchInterval: 1000 * 30, // every
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });
};

export const useMechanicsNotifications = () => {
  return useQuery({
    queryKey: ["notifications", "mechanic"],
    queryFn: async (): Promise<INotification[]> => {
      return new Promise((resolve, reject) => {
        axios
          .get(API_URL.GET_MECHANIC_NOTIFICATIONS)
          .then((res) => {
            resolve(res.data?.data);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    staleTime: 0,
    refetchInterval: 1000 * 30, // every
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });
};

export const handleViewNotification = (id: string) => {
  return new Promise<any>((resolve, reject) => {
    axios
      .put(
        API_URL.VIEW_NOTIFICATIONS,
        {},
        {
          params: {
            id,
          },
        }
      )
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
};

export const useHideNotifications = (type: "user" | "mechanic") => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notificationId: string) => {
      return new Promise((resolve, reject) => {
        axios
          .put(
            type === "user"
              ? API_URL.HIDE_USER_NOTIFICATIONS
              : API_URL.HIDE_MECHANIC_NOTIFICATIONS,
            {},
            {
              params: {
                id: notificationId,
              },
            }
          )
          .then(() => {
            queryClient
              .invalidateQueries({
                queryKey: ["notifications", type],
              })
              .finally(() => {
                resolve(true);
              });
          })
          .catch(() => {
            reject(false);
          });
      });
    },
  });
};
