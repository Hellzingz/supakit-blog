import { useState } from "react";
import { NavBar } from "@/components/NavBar";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/authContext";
import { toastError } from "@/utils/toast";
import { ImSpinner2 } from "react-icons/im";
import InputField from "@/components/InputField";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const {
    login,
    state: { loading: isLoading },
  } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      return setErrors({ email: "Email is required" });
    }
    if (password.trim() === "") {
      return setErrors({ password: "Password is required" });
    }
    try {
      const data = {
        email: email,
        password: password,
      };
      const result = await login(data);

      // ถ้า login สำเร็จ (ไม่มี error) ให้ clear form และ navigate
      if (result?.success) {
        setEmail("");
        setPassword("");
        setErrors({});
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toastError("Login failed");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex justify-center items-center p-4 my-4 flex-grow">
        <div className="w-full max-w-2xl bg-gray-50 rounded-sm shadow-md px-3 sm:px-20 py-14">
          <h2 className="text-4xl font-semibold text-center mb-6 text-foreground">
            Log in
          </h2>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <InputField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              errors={errors?.email}
              placeholder="Email"
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              errors={errors?.password}
              placeholder="Password"
            />
            <div className="flex justify-center">
              <button
                disabled={isLoading}
                type="submit"
                className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center gap-2">
                    <ImSpinner2 className="animate-spin" />
                    Loading...
                  </div>
                ) : (
                  <span>Log in</span>
                )}
              </button>
            </div>
            <p className="text-center text-gray-400">
              Don't have any account?{" "}
              <Link to="/register" className="underline ml-1 text-gray-600">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
export default LoginPage;
