import { getFavoriteRecipes } from "../services/favoriteRecipeService";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Recipe from "../components/recipes/Recipe";
import RecipeListInformation from "../types/RecipeListInformation";

const FavoriteRecipesPage = () => {
  const location = useLocation();
  const { userId } = location.state ?? null;
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const fetchFavoriteRecipes = async (userId: string) => {
    if (!userId) {
      return;
    }

    try {
      const res = await getFavoriteRecipes(userId);
      setFavoriteRecipes(res);
    } catch (error) {
      console.error("ERROR: ", error);
    }
  };

  useEffect(() => {
    fetchFavoriteRecipes(userId);
  }, [userId]);

  const updateFavoriteRecipeList = () => {
    fetchFavoriteRecipes(userId);
  };

  return (
    <div className="container">
      <div className="flex flex-wrap justify-center items-start md:space-x-10 min-w-full max-w-screen-md min-w-80">
        {favoriteRecipes?.length ? (
          favoriteRecipes.map((r: RecipeListInformation) => (
            <Recipe
              classes="!w-60"
              recipe={r}
              key={r.id}
              updateList={updateFavoriteRecipeList}
            />
          ))
        ) : (
          <p className="mt-5 italic">No recipes favored yet...</p>
        )}
      </div>
    </div>
  );
};

export default FavoriteRecipesPage;
