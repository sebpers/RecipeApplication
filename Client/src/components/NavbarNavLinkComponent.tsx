import { IconType } from "react-icons/lib";
import { NavLink } from "react-router-dom";

type NavbarNavLinkProp = {
  path: string;
  icon: IconType;
  text: string;
};

const NavbarNavLinkComponent = ({
  path,
  icon: Icon,
  text,
}: NavbarNavLinkProp) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `${
          isActive ? "bg-blue-100 px-2 py-1 rounded-lg" : ""
        } text-lg hover:text-gray-900`
      }
    >
      <li className="flex items-start text-lg text-gray-600 hover:text-gray-900">
        <Icon size="25" className="mr-1" /> {text}
      </li>
    </NavLink>
  );
};

export default NavbarNavLinkComponent;
