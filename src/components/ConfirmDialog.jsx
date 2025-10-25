import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

export const ConfirmDialog = ({
  isOpen,
  setIsOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleConfirm = async () => {
    if (onConfirm) {
      setIsLoading(true);
      await onConfirm();
      setIsLoading(false);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-center flex flex-col mb-6">
            {title}
          </AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-[#75716B] text-center sm:text-left text-md font-medium">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>

        <div className="flex gap-3 items-center justify-center sm:justify-end mt-4">
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="w-32 h-10 cursor-pointer flex items-center justify-center px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="w-32 h-10 cursor-pointer flex items-center justify-center px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : confirmText}
          </button>
        </div>
        <AlertDialogCancel
          className="absolute border-none right-3 top-3 shadow-none cursor-pointer rounded-full hover:bg-gray-100 p-2"
          onClick={handleCancel}
          disabled={isLoading}
        >
          <X size={20} />
        </AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
};
