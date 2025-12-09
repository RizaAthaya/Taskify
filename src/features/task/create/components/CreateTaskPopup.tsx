import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { TTaskStatus, TTaskPriority, ICreateTask } from "@/api/task/type";
import { useCreateTask } from "../../hooks/useCreateTask";
import InputTaskDetail from "@/components/form/input/task-detail";
import TextareaTaskDetail from "@/components/ui/textarea/task-detail";
import Select from "@/components/ui/select";
import Button from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useAlert } from "@/context/alert/useAlert";
import { useGetStatusesByUser } from "@/features/status/hooks/useGetStatusesByUser";

interface CreateTaskPopupProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

const CreateTaskPopup = ({ open, onClose, userId }: CreateTaskPopupProps) => {
  const { showAlert } = useAlert();
  const [closing, setClosing] = useState(false);

  const { register, handleSubmit, reset } = useForm<ICreateTask>({
    defaultValues: {
      name: "",
      description: "",
      status: "todo",
      priority: "moderate",
    },
  });

  const [status, setStatus] = useState<TTaskStatus>("todo");
  const [priority, setPriority] = useState<TTaskPriority>("moderate");

  const { data: statuses } = useGetStatusesByUser(userId || "", !!userId);

  const handleClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 500);
  };

  const createTaskMutation = useCreateTask(
    () => {
      setStatus("todo");
      setPriority("moderate");
      reset();
      handleClose();
    },
    (err) => {
      showAlert({ message: err.message || "Gagal membuat task", variant: "error" });
    }
  );

  useEffect(() => {
    if (!statuses || statuses.length === 0) return;

    const availableValues = statuses.map((s) => s.value as TTaskStatus);

    setStatus((prev) => (availableValues.includes(prev) ? prev : availableValues[0]));
  }, [statuses]);

  const onSubmit = (data: ICreateTask) => {
    if (!userId) return;
    if (!statuses || statuses.length === 0) {
      showAlert({ message: "Belum ada status. Buat status terlebih dahulu.", variant: "error" });
      return;
    }
    createTaskMutation.mutate({
      userId,
      data: {
        name: data.name,
        description: data.description,
        status,
        priority,
      },
    });
  };
  const onInvalid = () => {
    showAlert({ message: "Lengkapi semua field", variant: "error" });
  };

  if (!open && !closing) return null;

  return (
    <div
      className={`fixed top-0 right-0 z-50 h-full w-full sm:w-[400px] bg-white shadow-xl flex flex-col p-4 sm:p-6 overflow-y-auto tds-panel ${closing ? "tds-exit" : "tds-enter"}`}
    >
      <button
        onClick={handleClose}
        className="self-end text-gray-500 hover:text-gray-700 mb-4 cursor-pointer"
      >
        <Icon icon="mdi:close" className="w-6 h-6" />
      </button>

      <InputTaskDetail
        placeholder="Masukkan judul task"
        required
        register={register("name", { required: true })}
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="flex-1">
          {statuses && statuses.length > 0 ? (
            <Select<TTaskStatus>
              label="Status"
              value={status}
              onChange={setStatus}
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
            label="Prioritas"
            value={priority}
            onChange={setPriority}
            options={[
              { value: "low", label: "Rendah" },
              { value: "moderate", label: "Sedang" },
              { value: "high", label: "Tinggi" },
              { value: "urgent", label: "Mendesak" },
            ]}
          />
        </div>
      </div>

      {/* Hidden inputs to register select values for validation */}
      <input type="hidden" {...register("status", { required: true })} value={status} readOnly />
      <input
        type="hidden"
        {...register("priority", { required: true })}
        value={priority}
        readOnly
      />

      <TextareaTaskDetail
        placeholder="Masukkan deskripsi (opsional)"
        register={register("description")}
      />

      <div className="flex justify-end gap-2 pt-2 mt-auto">
        <Button variant="neutral" onClick={handleClose}>
          Batal
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit(onSubmit, onInvalid)}
          disabled={createTaskMutation.isPending}
        >
          {createTaskMutation.isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </div>
  );
};

export default CreateTaskPopup;
