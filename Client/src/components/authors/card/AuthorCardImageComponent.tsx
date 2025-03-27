import { useEffect, useState } from "react";
import useAuth from "../../../hooks/auth/useAuth";
import { hasRole } from "../../../helpers/role";
import CardMenuComponent from "../../recipes/card/CardMenuComponent";
import profile1 from "../../../assets/profile1.png";

interface AuthorCardImageComponentProps {
  authorId?: string;
  authorName: string;
}

const AuthorCardImageComponent = (props: AuthorCardImageComponentProps) => {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user } = useAuth();

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent Link navigation when the menu is clicked
    e.preventDefault();

    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOutsideClick = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  // Attach the event listener to handle clicks outside
  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const result = hasRole(user, ["admin"], props.authorId);

    setIsAdmin(result);
  }, [user]);

  //! Only admin should have access
  const handleEdit = () => {
    console.log("Action not implemented yet");
  };

  //! Only admin should have access
  const handleDelete = async () => {
    console.log("Action not implemented yet");
  };

  return (
    <div className="relative">
      <img
        src={profile1}
        alt="Image of the recipes author"
        className="w-full h-auto max-w-60"
        title={`${props.authorName}`}
      />

      {isAdmin && (
        <button
          id="dropdownMenuIconButton"
          onClick={handleMenuClick}
          className="absolute top-2 right-2 inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          type="button"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 4 15"
          >
            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
        </button>
      )}

      {isAdmin && isDropdownOpen && (
        <div className="absolute top-10 right-2" onClick={handleMenuClick}>
          <CardMenuComponent onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default AuthorCardImageComponent;
