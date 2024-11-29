import axios from "./axios";
import {
  IAppointmentResponse,
  IAppointment,
  IDashboardDetails,
  IMechanicsResponse,
} from "@/types/admin";
import { API_URL } from "@/services";
const adminLoginToken = process.env.NEXT_PUBLIC_ADMIN_LOGIN_TOKEN;

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
  searchBy: string,
  sortBy: string,
  sortOrder: "asc" | "desc"
): Promise<IMechanicsResponse> => {
  try {
    const response = await axios.get(API_URL.GET_MECHANICS_LISTS, {
      headers: {
        "admin-login-token": adminLoginToken,
      },
      params: {
        pageNo: page,
        [`search.${searchBy}`]: searchQuery,
        sortBy,
        sortOrder,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching mechanics:", error);
    throw new Error(
      "An unexpected error occurred while fetching mechanics data"
    );
  }
};

export const handleGetAppointmentRequests =
  async (): Promise<IAppointmentResponse> => {
    try {
      const response = await axios.get(API_URL.GET_APPOINTMENT_REQUESTS, {
        headers: {
          "admin-login-token": adminLoginToken,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching appointment requests:", error);
      throw new Error(
        "An unexpected error occurred while fetching appointment requests"
      );
    }
  };

export const handleApproveAppointmentRequest = async (
  appointmentId: string
): Promise<IAppointment> => {
  try {
    const response = await axios.put(
      `${API_URL.APPROVE_APPOINTMENT_REQUEST}/${appointmentId}/approve`,
      {},
      {
        headers: {
          "admin-login-token": adminLoginToken,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error approving appointment request:", error);
    throw new Error(
      "An unexpected error occurred while approving the appointment request"
    );
  }
};

export const handleRejectAppointmentRequest = async (
  appointmentId: string
): Promise<IAppointment> => {
  try {
    const response = await axios.delete(
      `${API_URL.REJECT_APPOINTMENT_REQUEST}/${appointmentId}/reject`,
      {
        headers: {
          "admin-login-token": adminLoginToken,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error rejecting appointment request:", error);
    throw new Error(
      "An unexpected error occurred while rejecting the appointment request"
    );
  }
};

export const validateAdminToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.post(
      API_URL.VALIDATE_TOKEN,
      { token },
      {
        headers: {
          "admin-login-token": adminLoginToken,
        },
      }
    );
    console.log("response", response.data.data);
    return response.data.data.isValid;
  } catch (error) {
    console.error("Error validating admin token:", error);
    return false;
  }
};
