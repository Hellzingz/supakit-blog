import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";

function ResetPasswordForm({ 
  formData,
  setFormData,
  errors,
  setErrors,
  onSubmit,
  className = "",
  buttonText = "Reset Password",
  buttonClassName = "",
  isSubmitting = false
}) {
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

  return (
    <form onSubmit={onSubmit} className={`flex flex-col gap-2 max-w-md ${className}`}>
      <InputField
        label="Current Password"
        name="oldPassword"
        type="password"
        value={formData.oldPassword}
        onChange={handleInputChange}
        errors={errors.oldPassword}
        placeholder="Current Password"
      />
      <InputField
        label="New Password"
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={handleInputChange}
        errors={errors.newPassword}
        placeholder="New Password"
      />
      <InputField
        label="Confirm New Password"
        name="confirmNewPassword"
        type="password"
        value={formData.confirmNewPassword}
        onChange={handleInputChange}
        errors={errors.confirmNewPassword}
        placeholder="Confirm New Password"
      />
      <Button 
        type="submit" 
        className={`max-w-45 px-4 md:px-8 py-5 rounded-full cursor-pointer ${buttonClassName}`} 
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : buttonText}
      </Button>
    </form>
  );
}

export default ResetPasswordForm;