import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import { UserAvartar } from "../icons/UserAvartar";
import { resetPasswordFields } from "@/utils/resetform";
import { resetPasswordSchema, validateData } from "@/utils/validate";
import { toastSuccess, toastError } from "@/utils/toast";
import { useAuth } from "@/context/authContext";
function UserResetPassword() {
  const { state } = useAuth();
  const user = state?.user;
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
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
    try {
      setIsSubmitting(true);
      await axios.put(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      toastSuccess("Password updated successfully");
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 400) {
        toastError(err.response?.data?.error || "Failed to update password");
      } else {
        toastError("Failed to update password");
      }
    } finally {
      setIsSubmitting(false);
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex items-center gap-4">
        <div className="sm:hidden flex items-center gap-2 border-r-2 border-gray-200 pr-4">
          {user?.profilePic ? <img src={user.profilePic} alt="profile-pic" className="w-10 h-10 rounded-full" /> : <UserAvartar />}
          <span className="text-xl font-semibold text-gray-500">{user?.name}</span>
        </div>
        <span className="text-xl sm:text-2xl font-semibold">
          Reset Password
        </span>
      </div>
      <div className="mt-5 bg-gray-100 rounded-xl p-4 sm:p-10">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {resetPasswordFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type="password"
                name={field.name}
                className={`border p-2 rounded-md w-full ${
                  errors[field.name] ? "border-red-500" : ""
                }`}
                value={formData[field.name]}
                onChange={handleInputChange}
                autoComplete={field.autoComplete}
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}
          <Button
            className="w-[30%] mt-7"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </form>
      </div>
    </div>
  );
}
export default UserResetPassword;
