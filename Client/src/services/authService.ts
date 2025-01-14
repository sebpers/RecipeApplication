import axios from "axios";
import Login from "../types/Login";
import Register from "../pages/RegisterPage";
import { Me } from "../interfaces/Me";
import { toast } from "react-toastify";

const API_PREFIX = "http://localhost:5098/api/accounts";
const displayedMessages = new Set<string>(); // Only store message once

export const login = async (account: Login) => {
  const token = await axios
    .post(`${API_PREFIX}/authenticate`, account, {
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });

  return token;
};

export const register = async (account: Register) => {
  try {
    const response = await axios.post(`${API_PREFIX}/register`, account, {
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

export const getMe = async () => {
  try {
    return await axios.get<Me>(`${API_PREFIX}/me`, { withCredentials: true });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data?.errors || error.response?.data || error.message
      );
    }

    throw new Error("An unexpected error occurred");
  }
};

export const logoutUser = async () => {
  await axios.post(`${API_PREFIX}/logout`, {}, { withCredentials: true });
};

export const validateUserToken = async () => {
  try {
    const response = await axios.get(`${API_PREFIX}/validate`, {
      withCredentials: true,
    });

    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.statusText || "An error occurred";
      if (window.location.pathname !== "/") {
        // Check if the message has already been shown
        if (!displayedMessages.has(message)) {
          toast.error(message);
          displayedMessages.add(message);

          if (message === "Invalid or expired token") {
            logoutUser();
            toast.error(message);
            displayedMessages.add("Time expired, login again to continue");
          }

          setTimeout(() => {
            displayedMessages.clear(); // Clears the set messages
          }, 3000);
        }
      }
      throw (
        error.response?.data?.errors || error.response?.data || error.message
      );
    }

    throw new Error("An unexpected error occurred");
  }
};
