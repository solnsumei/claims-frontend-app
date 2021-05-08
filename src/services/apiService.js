import client from './axiosClient';
import { removeToken } from '../utils/tokenHelper';


const checkAuthenticationError = error => {
  if (error.response && error.response.status === 401) {
    removeToken();
  }
}

export const fetchData = async (url) => {
  try {
    const response = await client.get(url);
    return response.data;
  } catch(error) {
    checkAuthenticationError(error);
    throw error;
  }
}

export const fetchUser = async () => {
  try {
    const response = await client.get('/user');
    return response.data.user;
  } catch(error) {
    checkAuthenticationError(error);
    throw error;
  }
}

export const saveTeamMember = async ({ id, data }) => {
  try {
    const response = await client.put(`/projects/${id}/assign-team`, data);
    return response.data;
  } catch(error) {
    checkAuthenticationError(error);
    throw error;
  }
}

export const uploadFile = async ({ id, data }) => {
  const uploadClient = {...client};
  try {
    const response = await uploadClient.post(`/claims/${id}/upload-file`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    return response.data;
  } catch(error) {
    checkAuthenticationError(error);
    throw error;
  }
}

export const updatePassword = async ({ url, isUpdate = false, data }) => {
  try {
    const response = await client.post(`${url}?update=${isUpdate}`, data);
    return response.data;
  } catch(error) {
    checkAuthenticationError(error);
    throw error;
  }
}

export const saveData = async ({ url, data, id }) => {
  let apiUrl = url;
  if (id) {
    apiUrl = `${url}/${id}`;
  }

  try {
    let response = null;

    if (id) {
      response = await client.put(apiUrl, data);
    } else {
      response = await client.post(`${apiUrl}/`, data);
    }
    return response.data;
  } catch(error) {
    checkAuthenticationError(error);
    throw error;
  }
}


export const updateClaim = async ({ url, data, initialApproval=false }) => {
  try {
    const response = await client.put(initialApproval ? `${url}/update` : url, data);
    return response.data;
  } catch(error) {
    checkAuthenticationError(error);
    throw error;
  }
}


export const deleteItem = async (url) => {
  try {
    const response = await client.delete(url);
    return response.data;
  } catch(error) {
    checkAuthenticationError(error);
    throw error;
  }
}