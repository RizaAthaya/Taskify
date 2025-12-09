export interface IStatus {
  id?: string;
  label: string;
  value: string;
  description?: string;
  userId: string;
  createdAt: number;
  updatedAt: number;
}

export interface ICreateStatus {
  label: string;
  value: string;
  description?: string;
}

export interface IUpdateStatus {
  label?: string;
  value?: string;
  description?: string;
}
