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
  user: boolean;
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
  baseURL: 'http://localhost:8000/auth/',
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

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<boolean>(false);

  const registerUser = async (userData: userRegisterData) => {
    const REGISTRATION_ENDPOINT = 'registration/';

    const requestUserData = {
      username: userData.username,
      email: userData.email,
      password1: userData.password,
      password2: userData.confirmPassword,
    };

    try {
      const response = await apiAuthClient.post(
        REGISTRATION_ENDPOINT,
        requestUserData
      );
      return response.data.key;
    } catch (error) {
      console.error('Context: Registration failed:', error);
      throw error;
    }
  };

  const loginUser = async (userData: userData) => {
    const LOGIN_ENDPOINT = 'login/';
    try {
      const response = await apiAuthClient.post(
        LOGIN_ENDPOINT,
        userData
      );
      setUser(true); // <- set user on login
      return response.data.key as string;
    } catch (error) {
      console.error('Context: Login failed:', error);
      throw error;
    }
  };

  const logoutUser = async () => {
    const LOGOUT_ENDPOINT = 'logout/';

    try {
      const response = await apiAuthClient.post(
        LOGOUT_ENDPOINT,
        {} // body can stay empty
      );

      setUser(false);
      return response.data;
    } catch (error) {
      console.error('Context: Logout failed:', error);
      setUser(false);
      throw error;
    }
  };

  const isAuthenticated = async () => {
    const AUTH_ENDPOINT = 'user/';
    try {
      const response = await apiAuthClient.get(AUTH_ENDPOINT);
      setUser(true); // <- set user if authenticated
      return response;
    } catch (error) {
      console.error('Context: Auth failed:', error);
      setUser(false);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        logoutUser,
        isAuthenticated,
        user,
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
