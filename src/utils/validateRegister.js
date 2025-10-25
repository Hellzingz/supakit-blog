export const validateRegister = (data) => {
  const errors = {};
  if (data.name.trim() === "") {
    errors.name = "Name is required";
  }
  if (data.username.trim() === "") {
    errors.username = "Username is required";
  }
  if (data.email.trim() === "") {
    errors.email = "Email is required";
  }
  if (data.password.trim() === "") {
    errors.password = "Password is required";
  }
  return errors;
};
