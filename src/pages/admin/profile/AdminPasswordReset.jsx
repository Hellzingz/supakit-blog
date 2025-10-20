import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { resetPasswordSchema, validateData } from "@/utils/validate";
import ResetPasswordModal from "@/components/ui/ResetPasswordModal";
import axios from "axios";

function AdminPasswordReset() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate using Zod schema
    const validation = validateData(resetPasswordSchema, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsDialogOpen(true);
  };

  const handleResetPassword = async () => {
    try {
      setIsSubmitting(true);
      await axios.put(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      });
      
      toast.custom((t) => (
        <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Reset!</h2>
            <p className="text-sm">
              Password reset successful. You can now log in with your new
              password.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
      ));
      setIsDialogOpen(false);
    } catch (err) {
      console.log(err);
      toast.error("Failed to reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full bg-gray-100">
      <main className="flex-1 px-4 md:px-10 bg-gray-50 overflow-auto">
        <div className="flex justify-between border-b py-4 md:py-10 items-center mb-6">
          <h2 className="text-2xl font-semibold">Reset Password</h2>
          <Button className="px-4 md:px-8 py-2 rounded-full cursor-pointer" onClick={handleSubmit}>
            Reset Password
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7 max-w-md my-10">
          <div className="relative">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Current password
            </label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Current password"
              value={formData.oldPassword}
              onChange={handleInputChange}
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                errors.oldPassword ? "border-red-500" : ""
              }`}
            />
            {errors.oldPassword && (
              <p className="text-red-500 text-xs absolute mt-1">
                {errors.oldPassword}
              </p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New password
            </label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="New password (8-20 characters, letters and numbers)"
              value={formData.newPassword}
              onChange={handleInputChange}
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                errors.newPassword ? "border-red-500" : ""
              }`}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs absolute mt-1">
                {errors.newPassword}
              </p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm new password
            </label>
            <Input
              id="confirmNewPassword"
              name="confirmNewPassword"
              type="password"
              placeholder="Confirm new password"
              value={formData.confirmNewPassword}
              onChange={handleInputChange}
              className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                errors.confirmNewPassword ? "border-red-500" : ""
              }`}
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500 text-xs absolute mt-1">
                {errors.confirmNewPassword}
              </p>
            )}
          </div>
        </form>
      </main>
      <ResetPasswordModal
        dialogState={isDialogOpen}
        setDialogState={setIsDialogOpen}
        resetFunction={handleResetPassword}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
export default AdminPasswordReset;
