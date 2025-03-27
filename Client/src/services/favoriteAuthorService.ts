import axios from "axios";
import AuthorLimitedInfo from "../types/authorLimitedInfo";

const API_PREFIX = "http://localhost:5098/api/authors/favorite-authors";

export const getFavoriteAuthors = async (userId: string) => {
  try {
    const favoriteRecipes = await axios.get(`${API_PREFIX}/${userId}`, {
      withCredentials: true,
    });

    return favoriteRecipes.data;
  } catch (error: unknown) {
    return error.response.data;
  }
};

export const addAuthorToFavorites = async (
  authorId: string,
  userId: string
) => {
  const favoredAuthor = await axios
    .post(`${API_PREFIX}/${authorId}`, userId, {
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

  return favoredAuthor;
};

export const getAllFavoriteAuthorsToFavorites = async (): Promise<
  AuthorLimitedInfo[]
> => {
  const allFavoredAuthors: AuthorLimitedInfo[] = await axios
    .get(`${API_PREFIX}`, {
      withCredentials: true,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
  return allFavoredAuthors;
};
