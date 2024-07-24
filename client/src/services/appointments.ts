import axios from "axios";
import { API_URL } from ".";
import { IAppointment } from "@/types/appointment";
import { IAppointmentSchema } from "@/zod";

export const handleGetAllMechanicsAppointment = async (): Promise<
  IAppointment[]
> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URL.GET_MECHANICS_APPOINTMENTS, {
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

export const handleApproveAppointment = async (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL.APPROVE_APPOINTMENT}/${id}`, null, {
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

export const handleRejectAppointment = async (id: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL.REJECT_APPOINTMENT}/${id}`, null, {
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

export const handleCompleteAppointment = async ({
  id,
  report,
}: {
  id: string;
  report: File;
}): Promise<string> => {
  console.log("id", id);
  const fd = new FormData();
  fd.append("report", report as Blob);
  return new Promise((resolve, reject) => {
    axios
      .put(`${API_URL.COMPLETE_APPOINTMENT}/${id}`, fd, {
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

export const handleBookAppointment = async ({
  serviceId,
  ...data
}: IAppointmentSchema & { serviceId: string }): Promise<string> => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL.BOOK_APPOINTMENT}/${serviceId}`, data, {
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

export const handleGetAllUserAppointments = async (): Promise<
  IAppointment[]
> => {
  return new Promise((resolve, reject) => {
    axios
      .get(API_URL.GET_USER_APPOINTMENTS, {
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
