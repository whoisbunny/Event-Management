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

export interface IEvent {
  _id: string;
  name: string;
  description: string;
  date: string;
  createdBy: {
    _id: string;
    name: string;
  };
}

export interface IEventList {
  data: IEvent[] | null;
  totalData: number;
  limit: number;
  totalPages: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number | null;
  nextPage?: number | null;
}

export interface IAddEvent {
  _id?: string;
  name: string;
  description: string;
  date: string;
}
