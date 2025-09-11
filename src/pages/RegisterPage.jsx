import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { NavBar } from "@/components/NavBar";
import { Link } from "react-router-dom";

function RegisterPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorUsername, setIsErrorUsername] = useState({});
  const [isErrorPassword, setIsErrorPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!name.trim()) {
      setIsErrorName(true);
      valid = false;
    } else {
      setIsErrorName(false);
    }

    if (!username.trim()) {
      setIsErrorUsername();
      valid = false;
    } else {
      setIsErrorUsername(false);
    }

    if (!email.trim()) {
      setIsErrorEmail(true);
      valid = false;
    } else {
      setIsErrorEmail(false);
    }

    if (!password.trim()) {
      setIsErrorPassword(true);
      valid = false;
    } else {
      setIsErrorPassword(false);
    }

    if (valid) {
      console.log("Register Successfully");
      navigate("/");
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
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="relative space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-muted-foreground"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  isErrorName ? "border-red-500" : ""
                }`}
              />
              {isErrorName && (
                <p className="text-red-500 text-xs absolute">
                  Name is required !!
                </p>
              )}
            </div>
            <div className="relative space-y-1">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-muted-foreground"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  isErrorUsername ? "border-red-500" : ""
                }`}
              />
              {isErrorUsername && (
                <p className="text-red-500 text-xs absolute">
                  Username is required !!
                </p>
              )}
            </div>
            <div className="relative space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-muted-foreground"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  isErrorEmail ? "border-red-500" : ""
                }`}
              />
              {isErrorEmail && (
                <p className="text-red-500 text-xs absolute">
                  Please enter a valid email.
                </p>
              )}
            </div>
            <div className="relative space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-muted-foreground"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`mt-1 py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground ${
                  isErrorPassword ? "border-red-500" : ""
                }`}
              />
              {isErrorPassword && (
                <p className="text-red-500 text-xs absolute">
                  Please enter your password.
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-2 bg-foreground text-white rounded-full hover:bg-muted-foreground transition-colors"
              >
                Sign up
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
