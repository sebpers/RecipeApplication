import { CiCircleQuestion } from "react-icons/ci";
import AuthCardComponent from "../components/AuthCardComponent";
import { useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { register } from "../services/AuthService";
import Register from "../types/Register";
import RadioButtons from "../components/common/RadioButtonsComponent";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { toast } from "react-toastify";

interface RegisterPage {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>(""); // Temporary, just to make it easier with roles
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState<boolean>(false);

  const navigate: NavigateFunction = useNavigate();
  const radioOptions: string[] = ["Visitor", "Author", "Admin"]; // Temporary, just to make it easier with roles

  const fieldErrors = (fieldName: string) => {
    if (fieldName) {
      return errors?.[fieldName]?.map((message: string, index: number) => (
        <li className="text-red-600 list-none	" key={index}>
          {message}
        </li>
      ));
    } else {
      return errors;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset error state
    setErrors({});
    setLoading(true);

    const account: Register = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      role: selectedRole, // Temporary, just to make it easier with roles
    };

    try {
      const response = await register(account);

      if (response.isAuthSuccessful) {
        navigate("/");
        toast.success("Successfully registered.");
      }
    } catch (err) {
      setErrors(err);
    } finally {
      setLoading(false);
    }
  };

  // Temporary, just to make it easier with roles
  const handleOptionChange = (value: string): void => {
    setSelectedRole(value);
  };

  return (
    <>
      <AuthCardComponent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-6">
            <input
              className="p-4 rounded rounded border border-2"
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <div>{fieldErrors("FirstName")}</div>
          </div>

          <div className="flex flex-col mb-6">
            <input
              className="p-4 rounded border border-2"
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <div>{fieldErrors("LastName")}</div>
          </div>

          <div className="flex flex-col">
            <input
              className="p-4 rounded border border-2"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div>{fieldErrors("Email")}</div>
          </div>

          <div className="flex justify-end mt-6">
            <CiCircleQuestion
              size={25}
              title="Password must include special characters, numbers and a capital letter"
              className="text-right"
            />
          </div>

          <div className="flex items-center w-full">
            <input
              className="flex-grow p-4 mr-2 rounded border border-2 "
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              {showPassword ? (
                <FiEyeOff size="25" onClick={() => setShowPassword(false)} />
              ) : (
                <FiEye size="25" onClick={() => setShowPassword(true)} />
              )}
            </div>
          </div>

          <div className="mb-6">{fieldErrors("Password")}</div>

          <div className="flex items-center">
            <input
              className="flex-grow p-4 mr-2 rounded border border-2"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div>
              {showConfirmPassword ? (
                <FiEyeOff
                  size="25"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <FiEye size="25" onClick={() => setShowConfirmPassword(true)} />
              )}
            </div>
          </div>

          <div className="mb-6">{fieldErrors("ConfirmPassword")}</div>

          {/*  Temporary, just to make it easier with roles*/}
          <div className="flex flex-col mt-2">
            <h1 className="text-sm font-semibold mb-4">
              Role (Temporary functionality)
            </h1>
            <RadioButtons
              options={radioOptions}
              selectedValue={selectedRole}
              onChange={handleOptionChange}
            />
          </div>

          {Array.isArray(errors) &&
            errors.map((er, index) => (
              <div className="mt-6 text-red-600" key={index}>
                {er}
              </div>
            ))}

          <hr className="my-8 h-1 border-t-1dark:bg-white/10" />

          <div className="flex">
            <button
              type="submit"
              className="bg-lime-500 text-white w-52 p-4 mx-auto rounded"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>
      </AuthCardComponent>
    </>
  );
};

export default RegisterPage;
