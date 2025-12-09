import { useState, useMemo, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useUser } from "@/context/user/useUser";
import { useAlert } from "@/context/alert/useAlert";
import { useGetTasksByUser } from "./hooks/useGetTasksByUser";
import { useUpdateTask } from "./hooks/useUpdateTask";
import CreateTaskPopup from "./create/components/CreateTaskPopup";
import { TaskCard } from "./components/TaskCard";
import type { ITask, TTaskStatus } from "@/api/task/type";
import { TaskDetailSidebar } from "./components/TaskDetailSidebar";

const Task = () => {
  const { user } = useUser();
  const { showAlert } = useAlert();

  const [openPopup, setOpenPopup] = useState(false);
  const { data: tasks, isLoading, isError, error } = useGetTasksByUser(user?.uid || "");
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const baseTasks = tasks || [];

  const [localStatus, setLocalStatus] = useState<Record<string, TTaskStatus>>({});

  const updateTaskMutation = useUpdateTask(undefined, (err) => {
    showAlert({ message: err.message || "Gagal memperbarui task", variant: "error" });
  });

  const statuses: TTaskStatus[] = ["todo", "in-progress", "completed"];

  const getCurrentStatus = (t: ITask): TTaskStatus => {
    const id = t.id || "";
    return (id && localStatus[id]) || t.status;
  };

  const statusOrder = useMemo(() => {
    const result: Record<TTaskStatus, string[]> = {
      todo: [],
      "in-progress": [],
      completed: [],
    };

    baseTasks.forEach((t) => {
      const s: TTaskStatus = (t.id && localStatus[t.id]) || t.status;
      if (t.id) result[s].push(t.id);
    });

    return result;
  }, [baseTasks, localStatus]);

  useEffect(() => {
    if (isError && error) {
      showAlert({ message: error.message || "Gagal memuat tasks", variant: "error" });
    }
  }, [isError, error, showAlert]);

  // Pindah kolom (drag & drop)
  const handleTaskDrop = (taskId: string, newStatus: TTaskStatus) => {
    // update tampilan lokal
    setLocalStatus((prev) => ({ ...prev, [taskId]: newStatus }));

    // update backend
    const taskToUpdate = baseTasks.find((t) => t.id === taskId);
    if (!taskToUpdate || !user?.uid) return;

    updateTaskMutation.mutate({
      userId: user.uid,
      taskId: taskId,
      data: { ...taskToUpdate, status: newStatus },
    });
  };

  const handleDropOnColumn = (targetStatus: TTaskStatus, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    handleTaskDrop(taskId, targetStatus);
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 space-y-5 sm:space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800">Tasks</h1>
        <button
          onClick={() => setOpenPopup(true)}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 
                     text-white font-semibold rounded-lg transition shadow-md cursor-pointer"
        >
          <Icon icon="mdi:plus" className="w-5 h-5" />
          Tambah Task
        </button>
      </div>

      {isLoading && <p className="text-gray-500 italic">Loading tasks...</p>}

      {/* KANBAN */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto py-4">
        {statuses.map((status) => {
          const ids = statusOrder[status] || [];
          const inStatus = baseTasks.filter((t) => getCurrentStatus(t) === status);

          const orderedTasks = [
            ...(ids.map((id) => inStatus.find((t) => t.id === id)).filter(Boolean) as ITask[]),
            ...inStatus.filter((t) => !ids.includes(t.id!)),
          ];

          return (
            <div
              key={status}
              className="bg-gray-100 rounded-xl p-3 sm:p-4 min-w-[260px] sm:min-w-[320px] md:min-w-[450px] shrink-0 transition-shadow duration-200 hover:shadow-lg"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropOnColumn(status, e)}
            >
              <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4 capitalize">
                {status.replace("-", " ")}
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {orderedTasks.length > 0 ? (
                  orderedTasks.map((task) => (
                    <div
                      key={task.id}
                      data-task-id={task.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", task.id!);
                      }}
                      className="transition-all duration-200"
                    >
                      <TaskCard
                        key={task.updatedAt}
                        task={task}
                        onOpenDetail={() => setSelectedTask(task)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-400 space-y-2">
                    <Icon icon="mdi:inbox-remove-outline" className="w-12 h-12" />
                    <p className="text-sm">No tasks yet</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {baseTasks.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center mt-10 text-center text-gray-400">
          <Icon icon="mdi:clipboard-outline" className="w-16 h-16 mb-4 text-gray-300" />
          <p className="text-lg font-semibold">No tasks available</p>
          <p className="text-sm mt-1 text-gray-400">Add a new task to get started.</p>
        </div>
      )}

      {/* POPUP */}
      <CreateTaskPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        userId={user?.uid || ""}
      />

      {selectedTask && (
        <TaskDetailSidebar task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
};

export default Task;
