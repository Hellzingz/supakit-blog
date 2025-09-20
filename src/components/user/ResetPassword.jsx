import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const passwordsMatch = newPassword.length > 0 && newPassword === confirmNewPassword;
  const newIsDifferent = newPassword.length > 0 && oldPassword.length > 0 && newPassword !== oldPassword;
  const isValid = passwordsMatch && newIsDifferent;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!isValid) {
      setError(!passwordsMatch ? "New passwords do not match" : "New password must differ from current password");
      return;
    }
    try {
      setIsSubmitting(true);
      await axios.put(`${import.meta.env.VITE_API_URL}/auth/reset-password`, {
        oldPassword,
        newPassword,
      });
      setSuccess("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Reset Password</h1>
      <div className="mt-5">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <label htmlFor="oldPassword">Current Password</label>
            <input
              type="password"
              name="oldPassword"
              className="border p-2 rounded-md w-100"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              autoComplete="current-password"
            />
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              name="newPassword"
              className="border p-2 rounded-md w-100"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
            />
            <label htmlFor="confirmNewPassword"> Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              className="border p-2 rounded-md w-100"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              autoComplete="new-password"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-600 text-sm">{success}</p>}
            <Button className="w-[30%] mt-7" type="submit" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
        </form>
      </div>
    </div>
  )
}
export default ResetPassword