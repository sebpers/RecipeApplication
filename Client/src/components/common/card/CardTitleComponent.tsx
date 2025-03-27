import { FaHeart } from "react-icons/fa";
import useAuth from "../../../hooks/auth/useAuth";
import { addRecipeToFavorites } from "../../../services/favoriteRecipeService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { addAuthorToFavorites } from "../../../services/favoriteAuthorService";
import Recipe from "../../../types/Recipe";

type PropTitle = {
  title: string | undefined;
  h1Class?: string;
  recipeId?: number;
  authorId?: string;
  isFavorited?: boolean;
};

const CardTitleComponent = (props: PropTitle) => {
  const { user, isAuthenticated } = useAuth();
  const { title, h1Class, recipeId, authorId, isFavorited } = props;

  const [favored, setFavored] = useState<boolean | undefined>(isFavorited);

  useEffect(() => {}, [recipeId, isFavorited]);

  const isFavoredItem = (isFavored: boolean | Recipe): void => {
    if (isFavored) {
      setFavored(true);
    } else {
      setFavored(false);
    }
  };

  const handleAddToFavorites = async (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault(); // Prevent navigating to recipe when icon is clicked

    try {
      if (recipeId && user?.id) {
        const isFavored = await addRecipeToFavorites(recipeId, user.id);
        isFavoredItem(isFavored);
      } else if (authorId && user?.id) {
        const isFavored = await addAuthorToFavorites(authorId, user.id);
        isFavoredItem(isFavored);
      }
    } catch (error) {
      toast.error("Error, could not save item");
    }
  };

  return (
    <h1 className={`flex justify-between p-3 font-semibold ${h1Class}`}>
      {title}

      {isAuthenticated && (
        <FaHeart
          id={`heart-icon ${recipeId ? recipeId : authorId}`}
          title={favored ? "Remove from favorites" : "Add to favorites"}
          size="20"
          className={`inline-block cursor-pointer ${
            favored ? "text-red-500" : "text-grey-600"
          }`}
          onClick={handleAddToFavorites}
        />
      )}
    </h1>
  );
};

export default CardTitleComponent;
