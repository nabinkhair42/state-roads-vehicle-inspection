import { IFile } from "./file.types";
import { IMechanicProfile } from "./mechanics.types";

export interface IService {
  _id: string;
  description: string;
  price: number;
  thumbnail: IFile;
  postedBy: IMechanicProfile;
  features: string[];
  serviceType: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
