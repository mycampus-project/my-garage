import React, { createContext, useMemo } from 'react';
import { User, useLocalStorage, apiClient } from '@my-garage/common';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  error: AxiosError | null;
  setAuthToken: (token: string) => void;
  token: string | null;
}

const defaultValue: AuthContextValue = {
  user: null,
  isLoading: false,
  error: null,
  setAuthToken: () => {},
  token: null,
};

const AuthContext = createContext(defaultValue);

const AuthContextProvider: React.FC = ({ children }) => {
  const [token, setAuthToken] = useLocalStorage('auth_token');

  const { data, error, isLoading } = useQuery<AxiosResponse<User> | null, AxiosError>(
    ['auth', token],
    () => {
      if (!token) return Promise.resolve(null);
      return apiClient.get<User>('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
    },
    {
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({ user: data?.data ?? null, isLoading, error, setAuthToken, token }),
        [data, isLoading, error, setAuthToken, token],
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContextProvider;
