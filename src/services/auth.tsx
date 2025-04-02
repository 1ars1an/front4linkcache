import React from 'react';
import axios from 'axios';

export interface AuthContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  registerUser: (
    userData: userRegisterData
  ) => Promise<string | Error>;
  loginUser: (userData: userData) => Promise<string | Error>;
  logout: () => Promise<void>;
  user: string | null;
}

export interface userData {
  username: string;
  password: string;
}

export interface userRegisterData extends userData {
  email?: string;
  confirmPassword?: string;
}

const AuthContext = React.createContext<AuthContext | null>(null);

const apiAuthClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/auth',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const registerUser = async (userData: userRegisterData) => {
  const REGISTRATION_ENDPOINT = '/registration/';

  const requestUserData = {
    username: userData.username,
    email: userData.email,
    password1: userData.password,
    password2: userData.confirmPassword,
  };

  try {
    console.debug(
      `Attempting registration at ${apiAuthClient.defaults.baseURL}${REGISTRATION_ENDPOINT} with data:`,
      requestUserData
    );

    const response = await apiAuthClient.post(
      REGISTRATION_ENDPOINT,
      requestUserData
    );

    //logging the successful response
    console.debug(
      'Registration successful. Status:',
      response.status,
      'Data:',
      response.data
    );

    return response.data.key;
  } catch (error) {
    // logging the raw error object for detailed debugging.
    console.error('Registration failed:', error);

    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data;
      const errorMessage = `Registration failed with status ${status}. ${
        JSON.stringify(responseData) ||
        'Server responded with an error.'
      }`;

      console.error(`API Error: ${status}`, responseData);

      const apiError = new Error(errorMessage) as Error & {
        response?: any; //type assertion to extend error to include response
      };
      // attaching original axios error response to the new error object.
      // gives access to detailed errors (specific validation field errors)
      apiError.response = error.response;
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
      // --- setup error ---
      // something went wrong in setting up the request that triggered an error
      // (e.g., error in an Axios interceptor, invalid configuration)
      console.error('Axios Setup Error:', error.message);

      throw new Error(
        `An unexpected error occurred while setting up the registration request: ${error.message}`
      );
    }
  }
};

export const loginUser = async (userData: userData) => {
  const REGISTRATION_ENDPOINT = '/login/';

  try {
    console.debug(
      `Attempting registration at ${apiAuthClient.defaults.baseURL}${REGISTRATION_ENDPOINT} with data:`,
      userData
    );

    const response = await apiAuthClient.post(
      REGISTRATION_ENDPOINT,
      userData
    );

    console.debug(
      'Login successful. Status:',
      response.status,
      'Data:',
      response.data
    );

    return response.data.key;
  } catch (error) {
    console.error('Login failed:', error);

    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data;
      const errorMessage = `Login failed with status ${status}. ${
        JSON.stringify(responseData) ||
        'Server responded with an error.'
      }`;

      console.error(`API Error: ${status}`, responseData);

      const apiError = new Error(errorMessage) as Error & {
        response?: any; //type assertion to extend error to include response
      };
      apiError.response = error.response;
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
        `An unexpected error occurred while setting up the registration request: ${error.message}`
      );
    }
  }
};

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] =
    React.useState<boolean>(false);

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {};

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        registerUser,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
