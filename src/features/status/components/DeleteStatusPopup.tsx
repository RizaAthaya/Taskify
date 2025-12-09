import React from "react";
import Popup from "@/components/ui/popup";
import Button from "@/components/ui/button";

interface DeleteStatusPopupProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const DeleteStatusPopup: React.FC<DeleteStatusPopupProps> = ({
  open,
  onCancel,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Popup
      open={open}
      onClose={onCancel}
      title="Delete Status"
      description="Apakah Anda yakin menghapus status ini? Semua task dengan status ini akan ikut dihapus."
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

export default DeleteStatusPopup;
