import axios from 'axios';
import { commonErrorHandler } from './apiError';

export interface paginatedData {
  count: number;
  next: string | null;
  previous: string | null;
}

export interface userFolder {
  id: number;
  name: string;
  user: number;
  created_at: string;
  updated_at: string;
}

export interface tags {
  id: number;
  name: string;
  user: number;
}

export interface userFolderLinks {
  id: number;
  name: string;
  url: string;
  description: string;
  tags: tags[];
}

export interface paginatedFolderData extends paginatedData {
  results: userFolder[];
}

export interface paginatedLinkData extends paginatedData {
  results: userFolderLinks[];
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

export const getAllUserFolders = async (
  page: number = 1
): Promise<paginatedFolderData> => {
  const DATA_ENDPOINT = `folders?page=${page}`;

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
    console.error('Context: Top Links request failed:', error);
    throw error;
  }
};

export const getAllFolderLinks = async (
  id: number,
  page: number = 1
) => {
  const DATA_ENDPOINT = `folders/${id}/links?page=${page}`;
  try {
    const response = await apiDataClient.get(DATA_ENDPOINT);
    console.debug(
      'All folder links request successful. Status:',
      response.status,
      'Data:',
      response.data
    );
    return response.data;
  } catch (error) {
    console.error('Context: All links request failed:', error);
    throw error;
  }
};
