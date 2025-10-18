import { Link } from "react-router-dom";
import { X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription
} from "@/components/ui/alert-dialog";

const AlertLogin = ({ open, setOpen }) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="flex flex-col gap-5 items-center text-center p-12">
        <AlertDialogHeader>
        <AlertDialogTitle className="text-center text-3xl">
            Create an account to continue
          </AlertDialogTitle>
          <AlertDialogDescription className=" hidden text-center text-3xl">
            Create an account to continue
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Link
          to="/register"
          className="bg-black text-white rounded-3xl py-2 w-48 cursor-pointer"
        >
          Create Account
        </Link>
        <AlertDialogCancel className="absolute right-3 top-3 rounded-full p-1 hover:bg-gray-100">
          <X />
        </AlertDialogCancel>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="underline cursor-pointer">
            Log in
          </Link>
        </p>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default AlertLogin;
