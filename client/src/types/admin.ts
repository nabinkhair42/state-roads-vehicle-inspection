export interface IDashboardDetails {
  mechanicsCount: number;
  usersCount: number;
  appointmentsCount: number;
}

export interface IMechanicsLists {
  id: string; 
  name: string;
  email: string;
  phone: string;
  storeName: string; 
  storeAddress: string;
  totalAppointments: number;
}