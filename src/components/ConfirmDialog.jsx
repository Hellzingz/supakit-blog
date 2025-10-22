import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
export const ConfirmDialog = ({
  isOpen,
  setIsOpen,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
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
      <AlertDialog 
      open={isOpen} 
      onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold text-center flex flex-col mb-6">{title}</AlertDialogTitle>
            {description && (
              <AlertDialogDescription className="text-[#75716B]">{description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>

          <div className="flex gap-3 items-center sm:justify-end mt-6">
            <AlertDialogCancel 
              onClick={handleCancel} 
              disabled={isLoading}
              className="order-2 sm:order-1 max-w-40"
            >
              {cancelText}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-black text-white hover:bg-gray-800 order-1 sm:order-2 max-w-40"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : confirmText}
            </AlertDialogAction>
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
