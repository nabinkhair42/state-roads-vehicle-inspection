import { IContactSchema } from "@/zod/contact.zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from ".";
import { toast } from "sonner";

export const useContact = () => {
  return useMutation({
    mutationFn: (data: IContactSchema) => {
      return new Promise((resolve, reject) => [
        axios
          .post(API_URL.CONTACT, data)
          .then((res) => {
            resolve(true);
          })
          .catch(() => {
            reject(true);
          }),
      ]);
    },
    onSuccess: () => {
      toast.success(
        "Thanks for contacting us, we will response as soon as possible!"
      );
    },
    onError: () => {
      toast.error("Failed to contact");
    },
  });
};
