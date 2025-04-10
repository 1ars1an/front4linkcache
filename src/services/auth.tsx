import React from 'react';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { commonErrorHandler } from './apiError';

export interface AuthContext {
  registerUser: (
    userData: userRegisterData
  ) => Promise<string | Error>;
  loginUser: (userData: userData) => Promise<string | Error>;
  logoutUser: () => Promise<void>;
  isAuthenticated: () => Promise<AxiosResponse<any, any>>;
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
  baseURL: 'http://127.0.0.1:8000/auth/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
});

apiAuthClient.interceptors.response.use(
  (response) => response, //success, pass response directly
  commonErrorHandler
);

export const registerUser = async (userData: userRegisterData) => {
  const REGISTRATION_ENDPOINT = 'registration/';

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
    // error thrown here likely caught by interceptor
    console.error('Context: Registration failed:', error); //log for functions's context
    throw error; //rethrow so calling code handles it
  }
};

export const loginUser = async (userData: userData) => {
  const LOGIN_ENDPOINT = 'login/';

  try {
    console.debug(
      `Attempting registration at ${apiAuthClient.defaults.baseURL}${LOGIN_ENDPOINT} with data:`,
      userData
    );

    const response = await apiAuthClient.post(
      LOGIN_ENDPOINT,
      userData
    );

    console.debug(
      'Login successful. Status:',
      response.status,
      'Data:',
      response.data
    );

    return response.data.key as string;
  } catch (error) {
    console.error('Context: Login failed:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  const LOGOUT_ENDPOINT = 'logout/';

  try {
    const response = await apiAuthClient.post(LOGOUT_ENDPOINT);

    console.debug(
      'Login successful. Status:',
      response.status,
      'Data:',
      response.data
    );

    return response.data;
  } catch (error) {
    console.error('Context: Login failed:', error);
    throw error;
  }
};

export const isAuthenticated = async () => {
  const AUTH_ENDPOINT = 'user/';
  try {
    const response = await apiAuthClient.get(AUTH_ENDPOINT);
    return response;
  } catch (error) {
    console.error('Context: Auth failed:', error);
    throw error;
  }
};

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        logoutUser,
        isAuthenticated,
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
