import axios from 'axios';
import Login from '../types/Login';
import Register from '../pages/RegisterPage';
import { Me } from '../interfaces/Me';

const API_PREFIX = "http://localhost:5098/api/accounts";

export const login = async (account: Login) => {
  const token = await axios.post(`${API_PREFIX}/authenticate`, account, {
      withCredentials: true
    })
    .then((response) => {
        return response.data;
    })
    .catch(error => {
        throw error;
    });

  return token;
};

export const register = async (account: Register) => {
  try {
    const response = await axios.post(`${API_PREFIX}/register`, account, {
        withCredentials: true
    });

    return response.data;
  } catch (error: any) {
      throw error.response?.data?.errors || error.response?.data;
  }
};

export const getMe = async () => {
  try {
    return await axios.get<Me>(`${API_PREFIX}/me`, { withCredentials: true });
  } catch (error) {
    throw error.response;
  }
};

export const logoutUser = async () => {
    await axios.post(`${API_PREFIX}/logout`, {}, { withCredentials: true });
};

export const validateUserToken = async () => {
  try {
    const response = await axios.get(`${API_PREFIX}/validate`, {
        withCredentials: true
    });

    return response;
  } catch (error: any) {
    throw error?.response;
  }
}