import axios from "axios";
import {
  getQueryUsersType,
  queriedUserResponse,
} from "../interfaces/query/userQueries";

const API_PREFIX = "http://localhost:5098/api/users";

export const getQueryUsersParam = async ({
  pageNumber,
  pageSize,
  sortBy,
  sortOrder,
  search,
}: getQueryUsersType): Promise<queriedUserResponse> => {
  try {
    const response = await axios.get(`${API_PREFIX}/dashboard/query-users`, {
      params: {
        pageNumber,
        pageSize,
        sortBy,
        sortOrder,
        search,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data?.errors || error.response?.data || error.message
      );
    }

    throw new Error("An unexpected error occurred");
  }
};

export const getById = async (id: number) => {
  try {
    const response = await axios.get(`${API_PREFIX}/${id}`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data?.errors || error.response?.data || error.message
      );
    }

    throw new Error("An unexpected error occurred");
  }
};

export const getUserStatistics = async () => {
  try {
    const response = await axios.get(
      `${API_PREFIX}/dashboard/users/statistics`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data?.errors || error.response?.data || error.message
      );
    }

    throw new Error("An unexpected error occurred");
  }
};

export const getVisitedAuthorById = async (id: string) => {
  try {
    const response = await axios.get(`${API_PREFIX}/visit/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data?.errors || error.response?.data || error.message
      );
    }

    throw new Error("An unexpected error occurred");
  }
};

export const updateDescription = async (description: string, id: string) => {
  try {
    if (id) {
      const result = await axios.put(
        `${API_PREFIX}/my/edit/description/${id}`,
        description,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return result.data;
    }
  } catch (error) {
    console.error("ERROR: ", error);
    throw error;
  }
};
