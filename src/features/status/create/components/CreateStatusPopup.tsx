import { useState } from "react";
import { useForm } from "react-hook-form";
import type { ICreateStatus } from "@/api/status/type";
import { useCreateStatus } from "../../hooks/useCreateStatus";
import InputTaskDetail from "@/components/form/input/task-detail";
import TextareaTaskDetail from "@/components/form/textarea/task-detail";
import Button from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { useAlert } from "@/context/alert/useAlert";

interface CreateStatusPopupProps {
  open: boolean;
  onClose: () => void;
  userId: string;
}

const CreateStatusPopup = ({ open, onClose, userId }: CreateStatusPopupProps) => {
  const { showAlert } = useAlert();
  const [closing, setClosing] = useState(false);

  const { register, handleSubmit, reset } = useForm<ICreateStatus>({
    defaultValues: {
      label: "",
      value: "",
      description: "",
    },
  });

  const handleClose = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      onClose();
      setClosing(false);
    }, 500);
  };

  const createStatusMutation = useCreateStatus(
    () => {
      reset();
      handleClose();
    },
    (err) => {
      showAlert({ message: err.message || "Gagal membuat status", variant: "error" });
    }
  );

  const onSubmit = (data: ICreateStatus) => {
    if (!userId) return;
    const label = data.label.trim();
    const value = data.value.trim();
    if (!label || !value) {
      showAlert({ message: "Label dan value wajib diisi", variant: "error" });
      return;
    }

    createStatusMutation.mutate({
      userId,
      data: {
        label,
        value,
        description: data.description,
      },
    });
  };

  const onInvalid = () => {
    showAlert({ message: "Lengkapi field yang wajib", variant: "error" });
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
        placeholder="Judul status (label)"
        required
        register={register("label", { required: true })}
      />

      <InputTaskDetail
        placeholder="Value status (unik)"
        required
        register={register("value", { required: true })}
      />

      <TextareaTaskDetail
        placeholder="Keterangan status (opsional)"
        register={register("description")}
      />

      <div className="flex justify-end gap-2 pt-2 mt-auto">
        <Button variant="neutral" onClick={handleClose}>
          Batal
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit(onSubmit, onInvalid)}
          disabled={createStatusMutation.isPending}
        >
          {createStatusMutation.isPending ? "Menyimpan..." : "Simpan"}
        </Button>
      </div>
    </div>
  );
};

export default CreateStatusPopup;
