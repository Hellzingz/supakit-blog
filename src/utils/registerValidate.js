export const registerValidate = (name, username, email, password) => {
  const error = {};
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const nameRegex = /^[\p{L}\s]+$/u;
  const usernameRegex = /^[a-zA-Z0-9_]+$/;

  if (!name.trim()) {
    error.name = "Name is required";
  } else if (name.length < 4) {
    error.name = "Name must be at least 4 characters";
  } else if (!nameRegex.test(name)) {
    error.name = "Name is not valid";
  }

  if (!username.trim()) {
    error.username = "Username is required";
  } else if (username.length < 4) {
    error.username = "Username must be at least 4 characters";
  } else if (!usernameRegex.test(username)) {
    error.username = "Username is not valid";
  }

  if (!email.trim()) {
    error.email = "Email is required";
  } else if(!regex.test(email)) {
    error.email = "Email is not valid";
  }

  if (!password.trim()) {
    error.password = "Password is required";
  } else if(password.length < 6) {
    error.password = "Password must be at least 6 characters";
  }

  return error

};
