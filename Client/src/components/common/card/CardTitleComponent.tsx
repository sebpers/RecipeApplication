import { FaHeart } from "react-icons/fa";
import useAuth from "../../../hooks/auth/useAuth";
import { addFavoriteRecipe } from "../../../services/favoriteRecipeService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

type PropTitle = {
  title: string | undefined;
  h1Class?: string;
  recipeId?: number;
  favoritedBy?: {
    recipeId: number;
    userId: string;
  };
  updateList?: () => void;
};

const CardTitleComponent = (props: PropTitle) => {
  const { user, isAuthenticated } = useAuth();
  const { title, h1Class, recipeId, favoritedBy, updateList } = props;
  const [favored, setFavored] = useState("text-grey-600");

  useEffect(() => {
    if (user?.id && favoritedBy) {
      // If the user has favorited this recipe, update the color
      if (
        user.id === favoritedBy?.userId &&
        recipeId === favoritedBy?.recipeId
      ) {
        setFavored("text-red-500");
      } else {
        setFavored("text-grey-600");
      }
    }
  }, [user, favoritedBy, recipeId]);

  const handleAddToFavorites = async (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault(); // Prevent navigating to recipe when icon is clicked

    try {
      if (recipeId && user?.id) {
        const isFavored = await addFavoriteRecipe(recipeId, user.id);

        if (isFavored) {
          setFavored("text-red-500");
        } else {
          setFavored("text-grey-600");

          if (updateList !== undefined) {
            updateList();
          }
        }
      }
    } catch (error) {
      toast.error("Error, could not save recipe");
      console.error("ERROR: ", error);
    }
  };

  return (
    <h1 className={`flex justify-between p-3 font-semibold ${h1Class}`}>
      {title}
      {isAuthenticated && (
        <FaHeart
          id={`heart-icon ${recipeId}`}
          title={favored ? "Remove from favorites" : "Add to favorites"}
          size="20"
          className={`text-grey-600 inline-block cursor-pointer ${favored}`}
          onClick={handleAddToFavorites}
        />
      )}
    </h1>
  );
};

export default CardTitleComponent;
