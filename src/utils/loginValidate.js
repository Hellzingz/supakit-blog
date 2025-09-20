export const loginValidate = (email, password) => {
    const error = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
 
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