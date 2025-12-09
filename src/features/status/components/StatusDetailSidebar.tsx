import { useState } from "react";
import { useForm } from "react-hook-form";
import { Icon } from "@iconify/react";
import { useUser } from "@/context/user/useUser";
import type { IStatus, IUpdateStatus } from "@/api/status/type";
import { useUpdateStatus } from "../hooks/useUpdateStatus";
import { useDeleteStatusAndTasks } from "../hooks/useDeleteStatusAndTasks";
import InputTaskDetail from "@/components/form/input/task-detail";
import TextareaTaskDetail from "@/components/form/textarea/task-detail";
import Popup from "@/components/ui/popup";
import Button from "@/components/ui/button";
import { useAlert } from "@/context/alert/useAlert";

interface StatusDetailSidebarProps {
  status: IStatus;
  onClose: () => void;
}

export const StatusDetailSidebar: React.FC<StatusDetailSidebarProps> = ({ status, onClose }) => {
  const { showAlert } = useAlert();
  const { user } = useUser();
  const userId = user?.uid;

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [closing, setClosing] = useState(false);

  const { register, getValues } = useForm<IUpdateStatus>({
    defaultValues: {
      label: status.label,
      value: status.value,
      description: status.description,
    },
    mode: "onChange",
  });

  const updateStatusMutation = useUpdateStatus(
    () => {},
    (err) => {
      showAlert({ message: err.message || "Gagal memperbarui status", variant: "error" });
    }
  );

  const deleteStatusMutation = useDeleteStatusAndTasks(
    () => onClose(),
    (err) => {
      showAlert({ message: err.message || "Gagal menghapus status", variant: "error" });
    }
  );

  const handleSave = () => {
    if (!userId) return;
    const values = getValues();
    const label = (values.label || "").trim();
    const value = (values.value || "").trim();
    if (!label || !value) {
      showAlert({ message: "Label dan value wajib diisi", variant: "error" });
      return;
    }

    updateStatusMutation.mutate({
      userId,
      statusId: status.id!,
      data: {
        label: values.label!,
        value: values.value!,
        description: values.description,
      },
    });
  };

  const handleDelete = () => {
    if (!userId) return;
    deleteStatusMutation.mutate({ userId, statusId: status.id! });
  };

  const handleRequestClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => onClose(), 500);
  };

  return (
    <div
      className={`fixed top-0 right-0 w-full sm:w-[400px] h-screen z-50 bg-white shadow-xl flex flex-col p-4 sm:p-6 tds-panel ${closing ? "tds-exit" : "tds-enter"}`}
    >
      <div className="justify-between flex items-center gap-2 mb-4">
        <Button variant="primary" onClick={handleSave}>
          <span className="flex items-center gap-1">
            <Icon icon="mdi:content-save-outline" className="w-5 h-5" />
            <span className="hidden sm:inline">Simpan</span>
          </span>
        </Button>
        <button
          onClick={handleRequestClose}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <Icon icon="mdi:close" className="w-6 h-6" />
        </button>
      </div>

      <InputTaskDetail required register={register("label", { required: true })} />

      <InputTaskDetail required register={register("value", { required: true })} />

      <TextareaTaskDetail register={register("description")} />

      <div className="flex justify-between items-center mt-auto">
        <p className="text-gray-400 text-sm">ID: {status.id}</p>

        <button
          onClick={() => setConfirmDelete(true)}
          className="text-red-500 hover:bg-pink-100 rounded-full p-1 cursor-pointer"
        >
          <Icon icon="mdi:trash-can-outline" className="w-5 h-5" />
        </button>
      </div>

      <Popup
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        title="Hapus Status"
        description="Apakah Anda yakin menghapus status ini? Semua task dengan status ini akan ikut dihapus."
        actions={
          <>
            <Button variant="neutral" onClick={() => setConfirmDelete(false)}>
              Batal
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Ya, hapus
            </Button>
          </>
        }
      />
    </div>
  );
};
