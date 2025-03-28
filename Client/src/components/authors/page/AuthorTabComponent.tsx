import { FaHeart } from "react-icons/fa";
import useAuth from "../../../hooks/auth/useAuth";

type AuthorTabComponent = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
};

const AuthorTabComponent = (props: AuthorTabComponent) => {
  const { setActiveTab, activeTab } = props;
  const { isAuthenticated } = useAuth();

  const classes = {
    button: "focus:outline-none",
    active: "text-red-500",
    inactive: "hover:text-gray-600",
  };

  return (
    <div className="mx-auto mt-5 pb-2 border-b-4 md:w-80 w-full border-indigo-500">
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setActiveTab("description")}
          className={`${classes.button} ${
            activeTab === "description" ? classes.active : classes.inactive
          }`}
        >
          About
        </button>

        <button
          onClick={() => setActiveTab("recipes")}
          className={`${classes.button} ${
            activeTab === "recipes" ? classes.active : classes.inactive
          }`}
        >
          Recipes
        </button>

        {isAuthenticated && (
          <>
            <button
              onClick={() => setActiveTab("messages")}
              className={`${classes.button} ${
                activeTab === "message" ? classes.active : classes.inactive
              }`}
            >
              Contact
            </button>

            <button
              onClick={() => setActiveTab("follow")}
              className={`${classes.button} ${
                activeTab === "follow" ? classes.active : classes.inactive
              }`}
            >
              <FaHeart size="20" title="Follow" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthorTabComponent;
