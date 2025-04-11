import axios from 'axios';
import { commonErrorHandler } from './apiError';

export interface userFolder {
  id: number;
  name: string;
  user: number;
  created_at: string;
  updated_at: string;
}

const apiDataClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

apiDataClient.interceptors.response.use(
  (response) => response, //success, pass response directly
  commonErrorHandler
);

export const getAllUserFolders = async (): Promise<userFolder[]> => {
  const DATA_ENDPOINT = 'folders';

  try {
    const response = await apiDataClient.get(DATA_ENDPOINT);
    console.debug(
      'Folders request successful. Status:',
      response.status,
      'Data:',
      response.data
    );
    return response.data;
  } catch (error) {
    console.error('Context: Folders request failed:', error); //log 4 functions's context
    throw error; //rethrow so calling code handles it
  }
};

export const getUserFolder = async (id: number) => {
  const DATA_ENDPOINT = `folders/${id}`;

  try {
    const response = await apiDataClient.get(DATA_ENDPOINT);
    console.debug(
      'Folder request successful. Status:',
      response.status,
      'Data:',
      response.data
    );
    return response.data;
  } catch (error) {
    console.error('Context: Folder request failed:', error);
    throw error;
  }
};

export const getTopUserLinks = async (id: number) => {
  const DATA_ENDPOINT = `folders/retrieve/${id}`;

  try {
    const response = await apiDataClient.get(DATA_ENDPOINT);
    console.debug(
      "Folder's top links request successful. Status:",
      response.status,
      'Data:',
      response.data
    );
    return response.data;
  } catch (error) {
    console.error('Context: Folder request failed:', error);
    throw error;
  }
};
