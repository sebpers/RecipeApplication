import { FaHeart } from "react-icons/fa";
import useAuth from "../../../hooks/auth/useAuth";
import { addAuthorToFavorites } from "../../../services/favoriteAuthorService";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

type AuthorTabComponent = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  isFavorited?: boolean;
};

const AuthorTabComponent = (props: AuthorTabComponent) => {
  const { setActiveTab, activeTab, isFavorited } = props;
  const { isAuthenticated, user } = useAuth();
  const { id } = useParams();

  const [isFavored, setIsFavored] = useState<boolean | undefined>(isFavorited);
  const [isMyPage, seIsMyPage] = useState<boolean>(false);

  const location = useLocation();

  useEffect(() => {
    const isMyInUrl = location.pathname.includes("/my");

    seIsMyPage(isMyInUrl);
    setIsFavored(isFavorited);
  }, [location, isFavorited]);

  const classes = {
    button: "focus:outline-none",
    active: "text-purple-600",
    inactive: "hover:text-gray-600",
    isFavored: "text-red-500",
  };

  const addFavoriteAuthor = async () => {
    const authorId = id;

    if (authorId && user) {
      const res = await addAuthorToFavorites(authorId, user?.id);
      setIsFavored(res);
    }
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
              onClick={() => setActiveTab("message")}
              className={`${classes.button} ${
                activeTab === "message" ? classes.active : classes.inactive
              }`}
            >
              Contact
            </button>

            {!isMyPage && (
              <button
                onClick={addFavoriteAuthor}
                className={`${classes.button} ${
                  isFavored ? classes.isFavored : classes.inactive
                }`}
              >
                <FaHeart size="20" title="Follow" />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthorTabComponent;
