import { CiCircleQuestion } from "react-icons/ci"
import AuthCard from "../components/AuthCard"
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import useRole from "../hooks/useRole";

interface Register {
  firstName: string;
  lastName: string;
  email: string,
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const { provideRole } = useRole();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();


  const fieldErrors = (fieldName: string) => {
    if (fieldName) {
      return errors?.[fieldName]?.map((message, index) => (
        <li className="text-red-600 list-none	" key={index}>
          { message }
        </li>
      ));
    } else {
      return errors;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Reset error state
    setErrors({});
    setLoading(true);

    const account: Register = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    };

    try {
      const response = await register(account);

      if (response.isAuthSuccessful) {
        provideRole(response?.roles);
        navigate('/');
      }

    } catch (err) {
      setErrors(err);
    } finally {
      setLoading(false); // Ensure loading is stopped
    }
  };

  return (
    <>
      <AuthCard>
        <form onSubmit={ handleSubmit }>
          <h1>Register</h1>

          <div className="flex flex-col mb-6">
            <input
              className="p-4 rounded rounded border border-2"
              type="text"
              placeholder="First name"
              value={ firstName }
              onChange={ (e) => setFirstName(e.target.value) } />
              <div>
                { fieldErrors('FirstName') }
              </div>
          </div>

          <div className="flex flex-col mb-6">
            <input
              className="p-4 rounded border border-2"
              type="text"
              placeholder="Last name"
              value={ lastName }
              onChange={ (e) => setLastName(e.target.value) } />
              <div>
                { fieldErrors('LastName') }
              </div>
          </div>

          <div className="flex flex-col mb-6">
            <input
              className="p-4 rounded border border-2"
              type="text"
              placeholder="Email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) } />
              <div>
                { fieldErrors('Email') }
              </div>
          </div>

          <div className="flex justify-end">
            <CiCircleQuestion
              size={ 25 }
              title="Password must include special characters, numbers and a capital letter"
              className="text-right" />
          </div>

          <div className="flex flex-col mb-6">
            <input
              className="p-4 rounded border border-2 "
              type="password"
              placeholder="Password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) } />
              <div>
                { fieldErrors('Password') }
              </div>
          </div>

          <div className="flex flex-col">
            <input
              className="p-4 rounded border border-2"
              type="password"
              placeholder="Confirm password"
              value={ confirmPassword }
              onChange={ (e) => setConfirmPassword(e.target.value) } />
              <div>
                { fieldErrors('ConfirmPassword') }
              </div>
          </div>

          { Array.isArray(errors) && errors.map((er, index) => (
            <div className="mt-6 text-red-600" key={index}>{ er }</div>
          ))}

          <hr className="my-8 h-1 border-t-1dark:bg-white/10" />

          <div className="flex">
            <button
              type="submit"
              className="bg-lime-500 text-white w-52 p-4 mx-auto rounded"
              disabled={ loading }
            >
              { loading ? 'Registering...' : 'Register' }
            </button>
          </div>
        </form>
      </AuthCard>
    </>
  )
}

export default Register