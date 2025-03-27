import axios from "axios";
import Recipe from "../types/Recipe";

const API_PREFIX = "http://localhost:5098/api/favorite-recipes";

export const getFavoriteRecipes = async (userId: string) => {
  try {
    const favoriteRecipes = await axios.get(`${API_PREFIX}/${userId}`, {
      withCredentials: true,
    });

    return favoriteRecipes.data;
  } catch (error: unknown) {
    return error.response.data;
  }
};

export const addRecipeToFavorites = async (
  recipeId: number,
  userId: string
) => {
  const addedFavoriteRecipe: Recipe = await axios
    .post(`${API_PREFIX}/${recipeId}`, userId, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return addedFavoriteRecipe;
};
