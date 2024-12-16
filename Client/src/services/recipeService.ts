import axios from 'axios';

import Recipe from "../types/recipe.tsx";
import { CreateRecipeProp } from '../interfaces/createRecipe.ts';

const API_PREFIX = "http://localhost:5098/api/recipes";

export const getRecipes = () => {
  const recipeList = axios.get(API_PREFIX)
    .then(response => {console.log(response.data)})
    .catch(error => {console.log(error)})

  return recipeList;
};

export const getRecipesListInformation = async () => {
  const recipeList = await axios.get(`${API_PREFIX}/list-information`)
    .then(response => {
        console.log(response.data)
        return response.data;
    })
    .catch(error => {console.log(error)})

  return recipeList;
};

export const getById = async (id: string): Promise<Recipe> => {
  const recipe = await axios.get(`${API_PREFIX}/${id}`)
    .then(response => {
        console.log(response.data)
        return response.data;
    })
    .catch(error => {console.log(error)});

  if (!recipe) { throw new Error(`Recipe with id ${id} not found.`); }

  return recipe;
};

// Add

export const createRecipe = async (body: CreateRecipeProp) => {
  const createdRecipe: Recipe = await axios.post(`${API_PREFIX}`, body)
    .then((res) => {
        console.log('res', res)
        return res.data;
    })
    .catch(error => {
        console.error('ERROR!! ', error)
        return error.response.data;
    })

    return createdRecipe;
}

export const deleteRecipe = async (id: number) => {
  try {
    const res = await axios.delete(`${API_PREFIX}/${id}`, {
      withCredentials: true, // Ensures cookies are included in the request
    });
    
    console.log('Recipe deleted:', res.data);
    return res.data; // Return the response data if deletion is successful
  } catch (err) {
    console.error('Error deleting recipe:', err);
    // You can throw the error or return a custom error message depending on your needs
    throw err; // Optionally rethrow the error to handle it elsewhere
  }
};
