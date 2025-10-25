import { useState } from "react";
import axios from "axios";
import { toastSuccess, toastError } from "@/utils/toast";
import { resetPasswordSchema, validateData } from "@/utils/validate";
import ResetPasswordForm from "@/components/Forms/ResetPasswordForm";

function AdminPasswordReset() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateData(resetPasswordSchema, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      if (response.data?.access_token) {
        localStorage.setItem("token", response.data.access_token);
      }
      toastSuccess("Update Successfully", "Password has been updated successfully");
    } catch (err) {
      console.log(err);
      toastError("Update Failed", err.response.data.error);
    } finally {
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full">
      <main className="flex-1 px-4 md:px-10 overflow-auto">
        <div className="flex justify-between border-b py-4 md:py-10 items-center mb-6">
          <h2 className="text-2xl font-semibold">Reset Password</h2>
        </div>
        <div className="my-10">
          <ResetPasswordForm
            formData={formData}
            setFormData={setFormData}
            errors={errors}
            setErrors={setErrors}
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 max-w-md"
            buttonText="Reset Password"
            isSubmitting={isSubmitting}
          />
        </div>
      </main>
    </div>
  );
}

export default AdminPasswordReset;
