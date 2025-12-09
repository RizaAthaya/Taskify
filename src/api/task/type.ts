export type TTaskStatus = string;
export type TTaskPriority = "urgent" | "high" | "moderate" | "low";

export interface ITask {
  id?: string;
  name: string;
  description: string;
  status: TTaskStatus;
  priority: TTaskPriority;
  userId: string;
  createdAt: number;
  updatedAt: number;
}

export interface ICreateTask {
  name: string;
  description: string;
  status: TTaskStatus;
  priority: TTaskPriority;
}

export interface IUpdateTask {
  name?: string;
  description?: string;
  status?: TTaskStatus;
  priority?: TTaskPriority;
}
