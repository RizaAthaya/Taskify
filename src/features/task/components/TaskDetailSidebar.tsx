import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useUser } from "@/context/user/useUser";
import type { ITask, TTaskStatus, TTaskPriority, ICreateTask } from "@/api/task/type";
import { useUpdateTask } from "../hooks/useUpdateTask";
import { useDeleteTask } from "../hooks/useDeleteTask";
import Select from "@/components/ui/select";
import InputTaskDetail from "@/components/form/input/task-detail";
import TextareaTaskDetail from "@/components/ui/textarea/task-detail";
import Button from "@/components/ui/button";
import { useAlert } from "@/context/alert/useAlert";
import Spinner from "@/components/ui/spinner";
import { useGetStatusesByUser } from "@/features/status/hooks/useGetStatusesByUser";
import TaskDeletePopup from "./TaskDeletePopup";

interface TaskDetailSidebarProps {
  task: ITask;
  onClose: () => void;
}

export const TaskDetailSidebar: React.FC<TaskDetailSidebarProps> = ({ task, onClose }) => {
  const { showAlert } = useAlert();
  const { user } = useUser();
  const userId = user?.uid;

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [closing, setClosing] = useState(false);

  const updateTaskMutation = useUpdateTask(
    () => {},
    (err) =>
      showAlert({
        message: err.message || "Gagal memperbarui task",
        variant: "error",
      })
  );

  const deleteTaskMutation = useDeleteTask(
    () => onClose(),
    (err) =>
      showAlert({
        message: err.message || "Gagal menghapus task",
        variant: "error",
      })
  );

  const { register, getValues, setValue, reset, control } = useForm<ICreateTask>({
    defaultValues: {
      name: task.name,
      description: task.description,
      status: task.status,
      priority: task.priority,
    },
    mode: "onChange",
  });

  // Safely observe field values without calling watch() inline in JSX
  const statusValue = useWatch({ control, name: "status" });
  const priorityValue = useWatch({ control, name: "priority" });

  const { data: statuses } = useGetStatusesByUser(userId || "", !!userId);

  useEffect(() => {
    reset({
      name: task.name,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
  }, [task.id, task.name, task.description, task.status, task.priority, reset]);

  const handleSave = () => {
    if (!userId) return;
    const values = getValues();
    const name = (values.name || "").trim();
    if (!name) {
      showAlert({ message: "Nama wajib diisi", variant: "error" });
      return;
    }
    updateTaskMutation.mutate({
      userId,
      taskId: task.id!,
      data: {
        ...task,
        name: values.name,
        description: values.description,
        status: values.status,
        priority: values.priority,
      },
    });
  };

  const handleDelete = () => {
    if (!userId) return;
    deleteTaskMutation.mutate({ userId, taskId: task.id! });
  };

  const handleRequestClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => onClose(), 500);
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 w-full sm:w-[400px] h-screen z-50 bg-white shadow-xl flex flex-col p-4 sm:p-6 tds-panel ${closing ? "tds-exit" : "tds-enter"}`}
      >
        <div className="justify-between flex items-center gap-2 mb-4">
          <Button variant="primary" onClick={handleSave}>
            <span className="flex items-center gap-1">
              <Icon icon="mdi:content-save-outline" className="w-5 h-5" />
              <span className="hidden sm:inline">
                {updateTaskMutation.isPending ? <Spinner size="extraSmall" /> : "Simpan"}
              </span>
            </span>
          </Button>
          <button
            onClick={handleRequestClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <Icon icon="mdi:close" className="w-6 h-6" />
          </button>
        </div>

        <InputTaskDetail required register={register("name", { required: true })} />

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            {statuses && statuses.length > 0 ? (
              <Select<TTaskStatus>
                label="Status"
                value={statusValue as TTaskStatus}
                onChange={(v) => setValue("status", v, { shouldDirty: true })}
                options={statuses.map((s) => ({
                  value: s.value as TTaskStatus,
                  label: s.label,
                }))}
              />
            ) : (
              <p className="text-xs text-red-500 mt-6">
                Belum ada status. Buat status terlebih dahulu.
              </p>
            )}
          </div>

          <div className="flex-1">
            <Select<TTaskPriority>
              label="Priority"
              value={priorityValue as TTaskPriority}
              onChange={(v) => setValue("priority", v, { shouldDirty: true })}
              options={[
                { value: "low", label: "Low" },
                { value: "moderate", label: "Moderate" },
                { value: "high", label: "High" },
                { value: "urgent", label: "Urgent" },
              ]}
            />
          </div>
        </div>

        <TextareaTaskDetail register={register("description")} />

        <div className="flex justify-between items-center mt-auto">
          <p className="text-gray-400 text-sm">
            Created: {new Date(task.createdAt * 1000).toLocaleString()}
          </p>

          <button
            onClick={() => setConfirmDelete(true)}
            className="text-red-500 hover:bg-pink-100 rounded-full p-1 cursor-pointer"
          >
            <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
          </button>
        </div>

        <TaskDeletePopup
          open={confirmDelete}
          onCancel={() => setConfirmDelete(false)}
          onConfirm={handleDelete}
          isLoading={deleteTaskMutation.isPending}
        />
      </div>
    </>
  );
};
