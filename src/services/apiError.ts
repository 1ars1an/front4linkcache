import { AxiosError } from 'axios';

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

export function commonErrorHandler(error: AxiosError): ApiError {
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
