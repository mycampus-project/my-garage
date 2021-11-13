import React, { createContext, useMemo } from 'react';
import { User } from '@my-garage/common/lib';
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import apiClient from 'src/common/api';
import useLocalStorage from '../hooks/useLocalStorage';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  error: AxiosError | null;
}

const defaultValue: AuthContextValue = {
  user: null,
  isLoading: false,
  error: null,
};

const AuthContext = createContext(defaultValue);

const AuthContextProvider: React.FC = ({ children }) => {
  const [token] = useLocalStorage('auth_token');

  const { data, error, isLoading } = useQuery<AxiosResponse<User> | null, AxiosError>(
    ['auth', token],
    () => {
      if (!token) return Promise.resolve(null);
      return apiClient.get<User>('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
    },
    {
      retry: 1,
    },
  );

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({ user: data?.data ?? null, isLoading, error }),
        [data, isLoading, error],
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthContextProvider;
