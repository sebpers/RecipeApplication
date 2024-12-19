import axios from 'axios';
import { RecipeComment } from '../interfaces/RecipeComment';
import { CommentCreate } from '../interfaces/CommentCreate';

const API_PREFIX = "http://localhost:5098/api/comments";

export const getRecipeComments = async (recipeId: number): Promise<RecipeComment[]> => {
  const comments: RecipeComment[] = await axios.get(`${API_PREFIX}/recipe-comments/${recipeId}`)
    .then(response => {
      return response.data;
    })
    .catch(error => {console.error(error)});

  if (!comments) { throw new Error(`with id ${recipeId} not found.`); }

  return comments;
};

export const addComment = async (body: CommentCreate): Promise<RecipeComment> => {
  const comment: RecipeComment =  await axios.post(`${API_PREFIX}`, body)
    .then(res => {
      return res.data;
    })
    .catch(error => {
      console.error('ERROR: ', error)
    });

  return comment;
};
