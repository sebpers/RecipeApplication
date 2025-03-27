import AuthCardComponent from "../components/AuthCardComponent";
import { useState } from "react";
import { login } from "../services/AuthService";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { setIsAuthenticated } = useAuth();

  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    setError(null);
    setLoading(true);

    const account = { email, password };

    try {
      const response = await login(account);

      if (response.isAuthSuccessful) {
        setIsAuthenticated(true);
        navigate("/");
        toast.success("Welcome");
      }
    } catch (err) {
      setError(err.response?.data?.errorMessage || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthCardComponent>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="flex flex-col mb-6 rounded border border-2">
            <input
              className="p-4 rounded"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative w-full">
            <input
              className="p-4 pr-12 rounded w-full border border-gray-300"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size="20" /> : <FiEye size="20" />}
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="mt-6">
            <button
              className="bg-blue-600 text-white w-full py-4 pt-2 rounded"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <small>Reset password</small>
          </div>

          <hr className="my-8 h-1 border-t-1dark:bg-white/10" />

          <Link to="/register">
            <div className="flex">
              <button
                type="button"
                className="bg-lime-500 text-white w-52 p-4 mx-auto rounded"
              >
                Register
              </button>
            </div>
          </Link>
        </form>
      </AuthCardComponent>
    </>
  );
};

export default LoginPage;
