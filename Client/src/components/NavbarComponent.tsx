import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { VscAccount } from "react-icons/vsc";
import useAuth from "../hooks/auth/useAuth";
import { GiNewspaper } from "react-icons/gi";
import { TbToolsKitchen3 } from "react-icons/tb";
import { PiChefHatLight } from "react-icons/pi";
import { LiaBookSolid } from "react-icons/lia";
import { MdLogout } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import DropdownLinkItemComponent from "./DropdownLinkItemComponent";
import NavbarNavLinkComponent from "./NavbarNavLinkComponent";

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
        <NavbarNavLinkComponent path={"/"} icon={GiNewspaper} text={"News"} />
        <NavbarNavLinkComponent
          path={"/recipes"}
          icon={TbToolsKitchen3}
          text={"Recipes"}
        />
        <NavbarNavLinkComponent
          path={"/authors"}
          icon={PiChefHatLight}
          text={"Chefs"}
        />

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
                    <DropdownLinkItemComponent
                      path={"/my"}
                      icon={VscAccount}
                      text={"Account"}
                    />
                  )}

                  {user?.roles?.includes("Admin") && (
                    <DropdownLinkItemComponent
                      path={"/dashboard/users"}
                      icon={LuLayoutDashboard}
                      text={"Dashboard"}
                    />
                  )}

                  <DropdownLinkItemComponent
                    path={"my/favorite-recipes"}
                    state={{ userId: user?.id }}
                    icon={LiaBookSolid}
                    text={"Favorited Recipes"}
                  />

                  <DropdownLinkItemComponent
                    path={"my/favorite-authors"}
                    state={{ userId: user?.id }}
                    icon={PiChefHatLight}
                    text={"Favorited Authors"}
                  />

                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    <div className="flex items-center">
                      <MdLogout className="mr-2" size={20} /> Logout
                    </div>
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
