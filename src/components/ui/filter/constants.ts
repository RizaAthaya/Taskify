import type { TTaskPriority } from "@/api/task/type";

export const TASK_STATUS = ["todo", "in-progress", "completed"] as const;

export const TASK_PRIORITY = ["urgent", "high", "moderate", "low"] as const;

export const PRIORITY_COLORS: Record<TTaskPriority, string> = {
  urgent: "bg-red-500",
  high: "bg-orange-500",
  moderate: "bg-yellow-500",
  low: "bg-green-500",
};

// Background colors for the badge shown in card
export const PRIORITY_BADGE_BG: Record<TTaskPriority, string> = {
  urgent: "bg-red-100 text-red-600",
  high: "bg-orange-100 text-orange-600",
  moderate: "bg-yellow-100 text-yellow-600",
  low: "bg-green-100 text-green-600",
};

export const STATUS_BADGE = {
  todo: "bg-gray-100 text-gray-600",
  "in-progress": "bg-yellow-100 text-yellow-600",
  completed: "bg-green-100 text-green-600",
};

export const PRIORITY_BADGE = {
  low: "bg-green-100 text-green-600",
  moderate: "bg-yellow-100 text-yellow-600",
  high: "bg-red-100 text-red-600",
  urgent: "bg-red-100 text-red-600",
};
