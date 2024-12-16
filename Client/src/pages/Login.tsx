import AuthCard from "../components/AuthCard"
import { useState } from "react"
import { login } from "../services/authService";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import useAuth from "../hooks/auth/useAuth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

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
        navigate('/');
      }

    } catch (err) {
      setError(err.response?.data?.errorMessage || 'Something went wrong!');
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
  };

  return (
    <>
      <AuthCard>
        <form onSubmit={ handleSubmit }>
          <div className="flex flex-col mb-6 rounded border border-2">
            <input
              className="p-4 rounded"
              type="text"
              placeholder="Email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) } />
          </div>

          <div className="flex flex-col border border-2">
            <input
              className="p-4 rounded"
              type="password"
              placeholder="Password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) } />
          </div>

          {error && <p className="text-red-500">{error}</p>} {/* Display error if any */}

          <div className="mt-6">
            <button
              className="bg-blue-600 text-white w-full py-4 pt-2 rounded"
              type="submit"
              disabled={ loading }
            >
                { loading ? 'Logging in...' : 'Login' }
              </button>

            <small>Reset password</small>
          </div>

          <hr className="my-8 h-1 border-t-1dark:bg-white/10" />


          <Link to="/register">
            <div className="flex">
                <button type="button" className="bg-lime-500 text-white w-52 p-4 mx-auto rounded">Register</button>
            </div>
          </Link>
        </form>
      </AuthCard>
    </>
  )
}

export default Login