import { useState } from "react";
import axios from "axios";
import { UserAvartar } from "../icons/UserAvartar";
import { toastSuccess, toastError } from "@/utils/toast";
import { useAuth } from "@/context/authContext";
import { resetPasswordSchema, validateData } from "@/utils/validate";
import ResetPasswordForm from "../Forms/ResetPasswordForm";

function UserResetPassword() {
  const { state } = useAuth();
  const user = state?.user;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validateData(resetPasswordSchema, formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }
      );
      if (response.data?.access_token) {
        localStorage.setItem("token", response.data.access_token);
      }

      toastSuccess("Update password", "Password has been updated successfully");
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error("Error resetting password:", error);
      toastError("Update password", "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-4">
        <div className="sm:hidden flex items-center gap-2 border-r-2 border-gray-200 pr-4">
          {user?.profilePic ? (
            <img
              src={user.profilePic}
              alt="profile-pic"
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-xl font-semibold">
                {user?.name?.charAt(0)}
              </span>
            </div>
          )}
          <span className="text-xl font-semibold text-gray-500">
            {user?.name}
          </span>
        </div>
        <span className="text-xl sm:text-2xl font-semibold">
          Reset Password
        </span>
      </div>

      <div className="mt-5 bg-gray-100 rounded-xl p-4 sm:p-10">
        <ResetPasswordForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          onSubmit={handleSubmit}
          className="flex flex-col gap-3"
          buttonText="Save"
          buttonClassName="w-[30%] mt-7"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}

export default UserResetPassword;
