import React, { useState } from "react";
import { Icon } from "@iconify/react";
import type { ITask, TTaskPriority } from "@/api/task/type";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useUser } from "@/context/user/useUser";
import { PRIORITY_BADGE, STATUS_BADGE } from "@/components/ui/filter/constants";
import { useAlert } from "@/context/alert/useAlert";

interface TaskCardProps {
  task: ITask;
  onOpenDetail?: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onOpenDetail }) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(task.name);
  const [priority, setPriority] = useState<TTaskPriority>(task.priority);
  const { user } = useUser();
  const { showAlert } = useAlert();

  const updateTaskMutation = useUpdateTask(
    () => setEditable(false),
    (err) => {
      showAlert({ message: err.message || "Gagal memperbarui task", variant: "error" });
    }
  );

  const handleSave = () => {
    if (!user?.uid) return;
    updateTaskMutation.mutate({
      userId: user.uid,
      taskId: task.id!,
      data: { name, description: task.description, status: task.status, priority },
    });
  };

  const getStatusIcon = () => {
    switch (task.status) {
      case "completed":
        return "mdi:check-circle";
      case "in-progress":
        return "mdi:progress-clock";
      default:
        return "mdi:check-circle-outline";
    }
  };

  const buttonClass = editable
    ? "bg-green-700 text-white hover:bg-green-600"
    : "bg-gray-100 text-gray-400 hover:bg-gray-200";

  return (
    <div
      className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 sm:p-5 hover:shadow-md transition relative cursor-pointer"
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        if ((e.target as HTMLElement).closest("select")) return;
        onOpenDetail?.();
      }}
    >
      {/* Edit / Save button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (editable) {
            handleSave();
          } else {
            setEditable(true);
          }
        }}
        className={`absolute top-3 right-3 hover:text-gray-700 w-8 h-8 flex 
              items-center justify-center rounded-full cursor-pointer ${buttonClass}`}
      >
        <Icon icon={editable ? "mdi:check" : "mdi:pencil"} className="w-5 h-5" />
      </button>

      {/* Title */}
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
        <span className="w-6 h-6 flex items-center justify-center">
          <Icon
            icon={getStatusIcon()}
            className={`w-6 h-6 ${STATUS_BADGE[task.status].split(" ")[1]}`}
          />
        </span>
        {editable ? (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none border-none bg-transparent text-xl sm:text-2xl font-bold w-full"
          />
        ) : (
          <span className="truncate max-w-[80%]">{name}</span>
        )}
      </h2>

      {/* Status & Priority */}
      <div className="flex items-center gap-2 mt-4">
        {editable ? (
          <select
            value={priority}
            onChange={(e) => {
              e.stopPropagation();
              setPriority(e.target.value as TaskCardProps["task"]["priority"]);
            }}
            className={`px-2.5 py-0.5 rounded-full text-base font-semibold cursor-pointer ${PRIORITY_BADGE[priority]}`}
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        ) : (
          <span
            className={`px-2.5 py-0.5 rounded-full text-base font-semibold ${PRIORITY_BADGE[priority]} capitalize`}
          >
            {priority}
          </span>
        )}
      </div>
    </div>
  );
};
