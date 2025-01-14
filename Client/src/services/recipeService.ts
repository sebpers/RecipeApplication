import axios from "axios";

import { CreateRecipeProp } from "../interfaces/CreateRecipe.ts";
import Recipe from "../types/Recipe";

const API_PREFIX = "http://localhost:5098/api/recipes";

//! For later use
// export const getRecipes = async () => {
//   const recipeList = await axios.get(API_PREFIX)
//     .then(response => {console.log(response.data)})
//     .catch(error => {console.log(error)})

//   return recipeList;
// };

export const getMyRecipes = async (userId: string) => {
  try {
    const res = await axios.get(`${API_PREFIX}/my-recipes/${userId}`, {
      withCredentials: true, // Ensures cookies are included in the request
    });

    return res.data;
  } catch (err) {
    console.error("Error retrieving users recipe:", err);
    throw err;
  }
};

export const getRecipesListInformation = async () => {
  const recipeList = await axios
    .get(`${API_PREFIX}/list-information`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  return recipeList;
};

export const getById = async (id: string): Promise<Recipe> => {
  const recipe = await axios
    .get(`${API_PREFIX}/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });

  if (!recipe) {
    throw new Error(`Recipe with id ${id} not found.`);
  }

  return recipe;
};

export const createRecipe = async (body: CreateRecipeProp) => {
  const createdRecipe: Recipe = await axios
    .post(`${API_PREFIX}`, body, { withCredentials: true })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });

  return createdRecipe;
};

export const deleteRecipe = async (id: number) => {
  try {
    const res = await axios.delete(`${API_PREFIX}/${id}`, {
      withCredentials: true, // Ensures cookies are included in the request
    });

    return res.data;
  } catch (err) {
    console.error("Error deleting recipe:", err);
    throw err;
  }
};
