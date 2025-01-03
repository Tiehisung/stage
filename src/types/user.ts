export interface IUser {
  _id:string
  image:string
  name: string;
  email: string;
  password: string;
  role?: TUserRole;
  createdAt?: Date;
  updatedAt?: Date;
}

export type TUserRole="guest" | "admin" | "player" | "privileged"