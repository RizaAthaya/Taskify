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
import { useGetStatusesByUser } from "@/features/status/hooks/useGetStatusesByUser";
import type { IStatus } from "@/api/status/type";
import CreateStatusPopup from "@/features/status/create/components/CreateStatusPopup";
import { StatusDetailSidebar } from "@/features/status/components/StatusDetailSidebar";
import { useDeleteStatusAndTasks } from "@/features/status/hooks/useDeleteStatusAndTasks";
import DeleteStatusPopup from "@/features/status/components/DeleteStatusPopup";
import Button from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";

const Task = () => {
  const { user } = useUser();
  const { showAlert } = useAlert();

  const [openPopup, setOpenPopup] = useState(false);
  const [openStatusPopup, setOpenStatusPopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: tasks,
    isLoading: isTasksLoading,
    isError,
    error,
  } = useGetTasksByUser(user?.uid || "");
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
  const { data: statuses, isLoading: isStatusesLoading } = useGetStatusesByUser(
    user?.uid || "",
    !!user?.uid
  );
  const [selectedStatus, setSelectedStatus] = useState<IStatus | null>(null);
  const [statusToDelete, setStatusToDelete] = useState<IStatus | null>(null);
  const [statusOrderList, setStatusOrderList] = useState<string[]>([]);
  const baseTasks = tasks || [];

  const [localStatus, setLocalStatus] = useState<Record<string, TTaskStatus>>({});

  const isAnyLoading = isTasksLoading || isStatusesLoading;

  const updateTaskMutation = useUpdateTask(undefined, (err) => {
    showAlert({ message: err.message || "Gagal memperbarui task", variant: "error" });
  });

  const deleteStatusMutation = useDeleteStatusAndTasks(
    () => {
      setStatusToDelete(null);
    },
    (err) => {
      showAlert({ message: err.message || "Gagal menghapus status", variant: "error" });
    }
  );

  useEffect(() => {
    if (!statuses) return;

    const existing = statusOrderList.filter((id) => statuses.some((s) => s.id === id));

    const missing = statuses.map((s) => s.id!).filter((id) => !existing.includes(id));

    const updated = [...existing, ...missing];

    if (JSON.stringify(updated) !== JSON.stringify(statusOrderList)) {
      setStatusOrderList(updated);
    }
  }, [statuses, statusOrderList]);

  // Ambil status yang sedang berlaku (asli atau hasil drag lokal)
  const getCurrentStatus = (t: ITask): TTaskStatus => {
    const id = t.id || "";
    return (id && localStatus[id]) || t.status;
  };

  const statusOrder = useMemo(() => {
    const result: Record<TTaskStatus, string[]> = {};

    // Inisialisasi semua status dari backend
    (statuses || []).forEach((s) => {
      const key = s.value as TTaskStatus;
      if (!result[key]) result[key] = [];
    });

    baseTasks.forEach((t) => {
      const s = getCurrentStatus(t);
      if (!result[s]) result[s] = [];
      if (t.id) result[s].push(t.id);
    });

    return result;
  }, [baseTasks, localStatus, statuses]);

  // Urutan tampilan kolom status berdasarkan statusOrderList
  const orderedStatuses = useMemo(() => {
    if (!statuses) return [] as IStatus[];
    if (statusOrderList.length === 0) return statuses;

    const byId: Record<string, IStatus> = {};
    statuses.forEach((s) => {
      if (s.id) byId[s.id] = s;
    });

    const ordered: IStatus[] = [];
    statusOrderList.forEach((id) => {
      const s = byId[id];
      if (s) ordered.push(s);
    });

    // Tambahkan status baru yang belum ada di orderList ke akhir
    statuses.forEach((s) => {
      if (s.id && !statusOrderList.includes(s.id)) ordered.push(s);
    });

    return ordered;
  }, [statuses, statusOrderList]);

  // Map status value -> icon & warna, berdasarkan urutan statuses
  const statusVisualMap = useMemo(() => {
    const palette: { icon: string; colorClass: string }[] = [
      { icon: "mdi:checkbox-blank-circle", colorClass: "text-emerald-500" },
      { icon: "mdi:checkbox-blank-circle", colorClass: "text-blue-500" },
      { icon: "mdi:checkbox-blank-circle", colorClass: "text-amber-500" },
      { icon: "mdi:checkbox-blank-circle", colorClass: "text-purple-500" },
      { icon: "mdi:checkbox-blank-circle", colorClass: "text-slate-400" },
    ];

    const map: Record<string, { icon: string; colorClass: string }> = {};
    (statuses || []).forEach((s, idx) => {
      const p = palette[idx % palette.length];
      map[s.value] = p;
    });

    return map;
  }, [statuses]);

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

  const handleConfirmDeleteStatus = () => {
    if (!user?.uid || !statusToDelete?.id) return;
    deleteStatusMutation.mutate({ userId: user.uid, statusId: statusToDelete.id });
  };

  const moveStatus = (statusId: string, direction: "left" | "right") => {
    setStatusOrderList((prev) => {
      const currentIndex = prev.indexOf(statusId);
      if (currentIndex === -1) return prev;

      const targetIndex = direction === "left" ? currentIndex - 1 : currentIndex + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;

      const next = [...prev];
      const [item] = next.splice(currentIndex, 1);
      next.splice(targetIndex, 0, item);
      return next;
    });
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 sm:py-8 space-y-5 sm:space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800">Daftar Task</h1>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:items-center">
          <div className="relative w-full sm:w-64 md:mr-2">
            <Icon
              icon="mdi:magnify"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari task berdasarkan judul..."
              className="bg-white border-purple-50 w-full pl-10 pr-3 py-2 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
            />
          </div>
          <div className="flex gap-4 self-center sm:self-auto">
            <button
              onClick={() => setOpenStatusPopup(true)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 
                         text-gray-800 font-semibold rounded-lg transition shadow-md cursor-pointer text-sm"
            >
              <Icon icon="mdi:plus" className="w-5 h-5" />
              Tambah Status
            </button>
            <button
              onClick={() => setOpenPopup(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 
                         text-white font-semibold rounded-lg transition shadow-md cursor-pointer"
            >
              <Icon icon="mdi:plus" className="w-5 h-5" />
              Tambah Task
            </button>
          </div>
        </div>
      </div>

      {/* KANBAN */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto py-4">
        {(!statuses || statuses.length === 0) && !isAnyLoading && (
          <div className="flex flex-col items-center justify-center w-full py-16 text-gray-400 space-y-3">
            <Icon icon="mdi:view-column-outline" className="w-12 h-12" />
            <p className="text-lg font-semibold">Belum ada status</p>
            <p className="text-sm">Buat status terlebih dahulu untuk mulai mengelompokkan task.</p>
            <Button variant="primary" onClick={() => setOpenStatusPopup(true)} className="mt-2">
              Buat Status
            </Button>
          </div>
        )}

        {orderedStatuses.map((status, index) => {
          const key = status.value as TTaskStatus;
          const ids = statusOrder[key] || [];
          const inStatus = baseTasks.filter((t) => {
            const matchesStatus = getCurrentStatus(t) === key;
            if (!searchTerm) return matchesStatus;
            const name = (t.name || "").toLowerCase();
            const query = searchTerm.toLowerCase();
            return matchesStatus && name.includes(query);
          });

          const orderedTasks = [
            ...(ids.map((id) => inStatus.find((t) => t.id === id)).filter(Boolean) as ITask[]),
            ...inStatus.filter((t) => !ids.includes(t.id!)),
          ];

          const isFirst = index === 0;
          const isLast = index === orderedStatuses.length - 1;

          return (
            <div
              key={status.id}
              className="bg-gray-100 rounded-xl p-3 sm:p-4 min-w-[260px] sm:min-w-[320px] md:min-w-[450px] shrink-0 transition-shadow duration-200 hover:shadow-lg"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDropOnColumn(key, e)}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => status.id && moveStatus(status.id, "left")}
                    disabled={isFirst}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-default"
                  >
                    <Icon icon="mdi:chevron-left" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => status.id && moveStatus(status.id, "right")}
                    disabled={isLast}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-default"
                  >
                    <Icon icon="mdi:chevron-right" className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="flex-1 text-center font-bold text-base sm:text-lg capitalize truncate mx-2">
                  {status.label}
                </h3>
                <div className="flex items-center gap-2 text-gray-400">
                  <button
                    onClick={() => setSelectedStatus(status)}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-blue-400 text-blue-500 hover:bg-blue-50 cursor-pointer"
                  >
                    <Icon icon="mdi:pencil" className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setStatusToDelete(status)}
                    className="w-7 h-7 flex items-center justify-center rounded-full border border-red-400 text-red-500 hover:bg-red-50 cursor-pointer"
                  >
                    <Icon icon="mdi:trash-can-outline" className="w-4 h-4" />
                  </button>
                </div>
              </div>

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
                        statusVisual={statusVisualMap[getCurrentStatus(task)]}
                        onOpenDetail={() => setSelectedTask(task)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-10 text-gray-400 space-y-2">
                    <Icon icon="mdi:inbox-remove-outline" className="w-12 h-12" />
                    <p className="text-sm">Belum ada task di status ini.</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {baseTasks.length === 0 && !isAnyLoading && (
        <div className="flex flex-col items-center justify-center mt-10 text-center text-gray-400">
          <Icon icon="mdi:clipboard-outline" className="w-16 h-16 mb-4 text-gray-300" />
          <p className="text-lg font-semibold">Belum ada task</p>
          <p className="text-sm mt-1 text-gray-400">
            Tambahkan task baru untuk mulai menggunakan aplikasi.
          </p>
        </div>
      )}

      {/* POPUP TASK */}
      <CreateTaskPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        userId={user?.uid || ""}
      />

      {/* POPUP STATUS */}
      <CreateStatusPopup
        open={openStatusPopup}
        onClose={() => setOpenStatusPopup(false)}
        userId={user?.uid || ""}
      />

      {selectedTask && (
        <TaskDetailSidebar task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}

      {selectedStatus && (
        <StatusDetailSidebar status={selectedStatus} onClose={() => setSelectedStatus(null)} />
      )}

      <DeleteStatusPopup
        open={!!statusToDelete}
        onCancel={() => setStatusToDelete(null)}
        onConfirm={handleConfirmDeleteStatus}
        isLoading={deleteStatusMutation.isPending}
      />

      {isAnyLoading && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white/60 backdrop-blur-sm">
          <Spinner size="large" />
        </div>
      )}
    </div>
  );
};

export default Task;
