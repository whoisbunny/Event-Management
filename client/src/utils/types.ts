export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  refreshToken: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface IEventList {}
export interface IEvent {}
