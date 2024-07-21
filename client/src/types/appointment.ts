import { IFile } from "./file.types";
import { IMechanicProfile } from "./mechanics.types";
import { IService } from "./service.type";
import { IUserProfile } from "./user.types";

export interface IAppointment {
  _id: string;
  bookedBy: IMechanicProfile;
  bookedFor: IUserProfile;
  service: IService;
  appointmentDate: string;
  appointmentTime: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  report?: IFile;
  __v: number;
}
