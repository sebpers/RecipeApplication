import axios from "axios";

const API_PREFIX = "http://localhost:5098/api/authors";

export const getAllAuthorsWithLimitedInfo = async () => {
  try {
    const result = await axios.get(`${API_PREFIX}/author-list`);
    return result.data;
  } catch (error) {
    console.error('Error deleting recipe:', error);
  }
}