import axios from 'axios';

const API_PREFIX = "http://localhost:5098/api/users";

export const getById = async (id: number) => {
  try {
    const response = await axios.get(`${API_PREFIX}/${id}`, {
        withCredentials: true
    })

    return response.data;
  } catch (error: any) {
    throw error.response?.data?.errors || error.response?.data;
  }
};

export const getVisitedAuthorById = async (id: number) => {
  try {
    const response = await axios.get(`${API_PREFIX}/visit/${id}`, {
      withCredentials: true
    })
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.errors || error.response?.data;
  }
};

//! Ongoing
// export const updateDescription = async (body, id: string) => {
//   try {
//     if (id) {
//       const result = await axios.put(`${API_PREFIX}/edit-description/${id}`, body, {
//         withCredentials: true
//       });

//       return result;
//     }
//   } catch (error) {
//     console.error('ERROR: ', error)
//   }
// }