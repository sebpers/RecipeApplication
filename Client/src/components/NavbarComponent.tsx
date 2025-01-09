import { Link, NavigateFunction, NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import useAuth from "../hooks/auth/useAuth";
import { GiNewspaper } from "react-icons/gi";
import { TbToolsKitchen3 } from "react-icons/tb";
import { PiChefHatLight } from "react-icons/pi";

const NavbarComponent = () => {
  const navigate: NavigateFunction = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
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
    navigate("/");
  };

  return (
    <nav className="shadow-md flex justify-center h-20 mb-5 bg-slate-100">
      <ul className="md:px-10 h-auto flex space-x-6 justify-center items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-100 px-2 py-1 rounded-lg" : ""
            } text-lg hover:text-gray-900`
          }
        >
          <li className="flex items-start text-lg text-gray-600 hover:text-gray-900">
            <GiNewspaper size="25" className="mr-1" /> News
          </li>
        </NavLink>

        <NavLink
          to="/recipes"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-100 px-2 py-1 rounded-lg" : ""
            } text-lg hover:text-gray-900`
          }
        >
          <li className="flex items-start text-lg text-gray-600 hover:text-gray-900">
            <TbToolsKitchen3 size="25" className="mr-1" /> Recipes
          </li>
        </NavLink>

        <NavLink
          to="/authors"
          className={({ isActive }) =>
            `${
              isActive ? "bg-blue-100 px-2 py-1 rounded-lg" : ""
            } text-lg hover:text-gray-900`
          }
        >
          <li className="flex items-start text-lg text-gray-600 hover:text-gray-900">
            <PiChefHatLight size="25" className="mr-1" /> Chefs
          </li>
        </NavLink>

        {/* User Dropdown shown if Logged In */}
        {isAuthenticated ? (
          <li className="relative mt-1">
            <button
              onClick={toggleDropdown}
              className="text-gray-600 hover:text-gray-800 font-semibold"
            >
              <VscAccount size="25" />
            </button>

            {isDropdownOpen && (
              <div
                className="z-50 absolute top-8 right-0 w-48 bg-white shadow-lg rounded-md py-2"
                ref={dropdownRef}
              >
                <ul onClick={toggleDropdown}>
                  {(user?.roles?.includes("Author") ||
                    user?.roles?.includes("Admin")) && (
                    <Link to="/my">
                      <li className="px-4 py-2 hover:bg-gray-100">Account</li>
                    </Link>
                  )}

                  <Link to="/favorites">
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

export default NavbarComponent;
