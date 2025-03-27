import { IconType } from "react-icons/lib";
import { Link } from "react-router-dom";

type DropdownLinkItemProp = {
  path: string;
  icon: IconType;
  text: string;
  state?: Record<string, any>;
};

const DropdownLinkItemComponent = ({
  path,
  icon: Icon,
  text,
  state,
}: DropdownLinkItemProp) => {
  return (
    <Link to={path} state={state}>
      <li className="px-4 py-2 hover:bg-gray-100">
        <div className="flex items-center">
          <Icon className="mr-2" size={20} /> {text}
        </div>
      </li>
    </Link>
  );
};

export default DropdownLinkItemComponent;
