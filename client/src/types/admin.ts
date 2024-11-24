export interface IDashboardDetails {
  mechanicsCount: number;
  usersCount: number;
  appointmentsCount: number;
}

export interface IMechanicsLists {
  _id: string; // Unique identifier for the mechanic
  name: string; // Name of the mechanic
  email: string; // Email of the mechanic
  phone: string; // Phone number of the mechanic
  isVerified: boolean; // Verification status
  storeName: string; // Name of the store
  storeAddress: string; // Address of the store
  storeCoordinates: {
    latitude: string; // Latitude of the store
    longitude: string; // Longitude of the store
  };
  createdAt: string; // Creation date
  updatedAt: string; // Last updated date
  totalAppointments: number; // Total number of appointments
}

export interface IPagination {
  pageNo: number; // Current page number
  limit: number; // Number of items per page
  hasNextPage: boolean; // Indicates if there is a next page
  totalPages: number; // Total number of pages
}

export interface IMechanicsResponse {
  results: IMechanicsLists[]; // Array of mechanics
  pagination: IPagination; // Pagination information
}

export interface IAppointmentRequest {
  id: string; // Unique identifier for the request
  user: string; // User who made the request
  mechanic: string; // Mechanic assigned to the request
  requestedDate: string; // Date when the request was made
  appointmentDate: string; // Date of the appointment
  status: "Pending" | "Accepted" | "Rejected"; // Status of the request
}

export interface IAppointmentRequestsResponse {
  results: IAppointmentRequest[]; // Array of appointment requests
  pagination: IPagination; // Pagination information
}
