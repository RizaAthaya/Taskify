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
      title="Delete Task"
      description="Are you sure you want to delete this task?"
      actions={
        <>
          <Button variant="neutral" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm} disabled={isLoading}>
            Yes
          </Button>
        </>
      }
    />
  );
};

export default TaskDeletePopup;
