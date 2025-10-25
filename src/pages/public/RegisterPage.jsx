import { useState } from "react";
import { Input } from "@/components/ui/input";
import { NavBar } from "@/components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema, validateData } from "@/utils/validate";
import { useAuth } from "@/context/authContext";
import { ImSpinner2 } from "react-icons/im";
import { validateRegister } from "@/utils/validateRegister";
import { toastError } from "@/utils/toast";
import InputField from "@/components/InputField";

function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const { register, state } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      const data = {
        name: name,
        username: username,
        email: email,
        password: password,
      };
      const errors = validateRegister(data);
      if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
      }

      const { isValid, errors: validationErrors } = validateData(
        registerSchema,
        data
      );
      if (!isValid) {
        setErrors(validationErrors);
        return;
      }

      const result = await register(data);
      if (result?.success) {
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setErrors({});
        navigate("/success");
      }
    } catch (error) {
      if (error.message.includes("Username")) {
        setErrors({ username: error.message });
      } else if (error.message.includes("Email")) {
        setErrors({ email: error.message });
      } else {
        setErrors({ general: error.message });
      }
      toastError(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex justify-center items-center p-4 my-4 flex-grow">
        <div className="w-full max-w-2xl bg-gray-50 rounded-sm shadow-md px-3 sm:px-20 py-14">
          <h2 className="text-4xl font-semibold text-center mb-6 text-foreground">
            Sign up
          </h2>
          {errors?.general && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {errors.general}
            </div>
          )}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputField
              label="Name"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              errors={errors?.name}
              placeholder="Name"
            />
            <InputField
              label="Username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              errors={errors?.username}
              placeholder="Username"
            />
            <InputField
              label="Email"
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errors={errors?.email}
              placeholder="Email"
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errors={errors?.password}
              placeholder="Password"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={state.loading}
                className="px-8 py-2 h-10 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.loading ? (
                  <div className="flex items-center gap-2">
                    <ImSpinner2 className="animate-spin" />
                    Loading...
                  </div>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
            <p className="text-center text-gray-400">
              Already have an account?
              <Link to="/login" className="underline ml-1 text-gray-600">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
export default RegisterPage;
