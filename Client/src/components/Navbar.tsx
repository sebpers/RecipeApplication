import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useRole from "../hooks/useRole";
import { VscAccount } from "react-icons/vsc";
import useAuth from "../hooks/auth/useAuth";
import { GiNewspaper } from "react-icons/gi";
import { TbToolsKitchen3 } from "react-icons/tb";
import { PiChefHatLight } from "react-icons/pi";

const Navbar = () => {
  const navigate: NavigateFunction = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { role, provideRole } = useRole();
  const { isAuthenticated, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference to the dropdown menu

  // Toggle the dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown if click is outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = (): void => {
    logout();
    provideRole([""]);
    navigate("/");
  };

  return (
    <nav className="shadow-md flex justify-center h-20 mb-5 bg-slate-100">
      <div>{role && role}</div>
      <div>{isAuthenticated}</div>

      <ul className="px-10 h-auto flex space-x-6 justify-center items-center">
        <Link to="/">
          <li className="flex items-start text-lg text-gray-600 hover:text-gray-900">
            <GiNewspaper size="25" className="mr-1" /> News
          </li>
        </Link>

        <Link to="/recipes">
          <li className="flex items-start text-lg text-gray-600 hover:text-gray-900">
            <TbToolsKitchen3 size="25" className="mr-1" /> Recipes
          </li>
        </Link>

        <Link to="/authors">
          <li className="flex items-start text-lg text-gray-600 hover:text-gray-900">
            <PiChefHatLight size="25" className="mr-1" /> Chefs
          </li>
        </Link>

        {/* User Dropdown if Logged In */}
        {isAuthenticated ? (
          <li className="relative mt-1">
            <button
              onClick={toggleDropdown}
              className="text-gray-600 hover:text-gray-800 font-semibold"
            >
              <VscAccount size="25" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute top-8 right-0 w-48 bg-white shadow-lg rounded-md py-2"
                ref={dropdownRef}
              >
                <ul>
                  <Link to="/my">
                    <li className="px-4 py-2 hover:bg-gray-100">Account</li>
                  </Link>

                  <Link to="/settings">
                    <li className="px-4 py-2 hover:bg-gray-100">Favorites</li>
                  </Link>

                  <Link to="/settings">
                    <li className="px-4 py-2 hover:bg-gray-100">Settings</li>
                  </Link>

                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
