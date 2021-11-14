import { useMutation } from 'react-query';
import axios, { AxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import apiClient from 'src/common/api';
import { AuthContext } from 'src/contexts/AuthContext';

const useLogin = () => {
  const { setAuthToken } = useContext(AuthContext);
  const {
    mutate: onSubmit,
    data: nokiaLoginData,
    isLoading: isLoadingNokiaLogin,
    error: nokiaLoginError,
  } = useMutation<
    {
      token: string;
      email: string;
      exp: string;
      username: string;
    },
    AxiosError,
    { email: string; password: string }
  >('nokia-login', ({ email, password }) =>
    axios
      .post('https://mycampus-server.karage.fi/auth/login', {
        email,
        password,
      })
      .then((response) => response.data),
  );

  const {
    mutate: submitGarageLogin,
    isLoading: isLoadingGarageLogin,
    error: garageError,
    data: garageLoginData,
  } = useMutation<{ token: string; user: string }, AxiosError, NonNullable<typeof nokiaLoginData>>(
    'garage-login',
    ({ token, email, username, exp }) =>
      apiClient
        .post('/auth/login', {
          token,
          email,
          fullName: username,
          exp,
        })
        .then((response) => response.data),
  );

  useEffect(() => {
    if (!nokiaLoginData) return;
    submitGarageLogin(nokiaLoginData);
  }, [nokiaLoginData, submitGarageLogin]);

  useEffect(() => {
    if (!garageLoginData) return;
    setAuthToken(garageLoginData.token);
  }, [garageLoginData, setAuthToken]);

  return {
    onSubmit,
    isLoading: isLoadingNokiaLogin || isLoadingGarageLogin,
    error: nokiaLoginError ?? garageError,
  };
};

export default useLogin;
