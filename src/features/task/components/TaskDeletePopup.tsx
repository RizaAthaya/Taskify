import React from "react";
import Popup from "@/components/ui/popup";
import Button from "@/components/ui/button";

interface TaskDeletePopupProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const TaskDeletePopup: React.FC<TaskDeletePopupProps> = ({
  open,
  onCancel,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Popup
      open={open}
      onClose={onCancel}
      title="Hapus Task"
      description="Apakah Anda yakin ingin menghapus task ini?"
      actions={
        <>
          <Button variant="neutral" onClick={onCancel}>
            Batal
          </Button>
          <Button variant="primary" onClick={onConfirm} disabled={isLoading}>
            Ya, hapus
          </Button>
        </>
      }
    />
  );
};

export default TaskDeletePopup;
