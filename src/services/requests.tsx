import axios, { AxiosError } from 'axios';

export interface ApiErrorResponse {
  status: number;
  data: any;
}

export class ApiError extends Error {
  response?: ApiErrorResponse;

  constructor(message: string, response?: ApiErrorResponse) {
    super(message);
    this.name = 'ApiError'; // custom error name
    this.response = response;
  }
}

const apiDataClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiDataClient.interceptors.response.use(
  (response) => response, //success, pass response directly
  (error: AxiosError) => {
    console.error('API Call Failed via Interceptor:', error); //log raw error

    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data;
      const errorMessage = `Request failed with status ${status}. ${
        JSON.stringify(responseData) ||
        'Server responded with an error.'
      }`;

      console.error(`API Error: ${status}`, responseData);

      // create and throw custom, structured error
      const apiError = new ApiError(errorMessage, {
        status,
        data: responseData,
      });
      // we are throwing the error here, so the original promise from the axios call will reject with THIS error.
      throw apiError;
    } else if (error.request) {
      console.error(
        'Network Error: No response received.',
        error.request
      );
      throw new Error(
        'Unable to connect to the server. Please check your network connection and try again.'
      );
    } else {
      console.error('Axios Setup Error:', error.message);
      throw new Error(
        `An unexpected error occurred while setting up the request: ${error.message}`
      );
    }
  }
);

export const getAllUserFolders = async () => {
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
