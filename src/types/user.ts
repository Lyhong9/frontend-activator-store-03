export type IUser = {
  id: number;
  userImages?: IUserImage[];
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
};

export interface IUserImage {
  id: number;
  userId: number;
  imageUrl: string;
  fileName: string;
}