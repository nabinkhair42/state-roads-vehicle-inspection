export interface IDashboardDetails {
  mechanicsCount: number
  usersCount: number
  appointmentsCount: number
}

export interface IMechanicsLists {
  _id: string
  name: string
  email: string
  phone: string
  isVerified: boolean
  storeName: string
  storeAddress: string
  storeCoordinates: {
    latitude: string
    longitude: string
  }
  createdAt: string
  updatedAt: string
  totalAppointments: number
}

export interface IPagination {
  pageNo: number
  limit: number
  hasNextPage: boolean
  totalPages: number
}

export interface IMechanicsResponse {
  results: IMechanicsLists[]
  pagination: IPagination
}

export interface IAppointmentRequest {
  id: string
  user: string
  mechanic: string
  requestedDate: string
  appointmentDate: string
  status: "Pending" | "Accepted" | "Rejected"
}

export interface IAppointmentRequestsResponse {
  results: IAppointmentRequest[]
  pagination: IPagination
}

export interface IAppointment {
  _id: string;
  bookedBy: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  service: {
    _id: string;
    serviceType: string;
  };
  bookedFor: {
    _id: string;
    name: string;
    email: string;
    storeName: string;
  };
  appointmentDate: string;
  appointmentTime: string;
  isApprovedByAdmin: boolean;
}

export interface IAppointmentResponse {
  status: number;
  data: IAppointment[];
}


