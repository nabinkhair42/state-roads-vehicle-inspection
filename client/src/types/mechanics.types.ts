export interface IMechanicProfile {
  storeCoordinates: {
    longitude: string;
    latitude: string;
  };
  _id: string;
  name: string;
  email: string;
  phone: string;
  storeName: string;
  storeAddress: string;
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
}
