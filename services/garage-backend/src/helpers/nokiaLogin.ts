import axios from 'axios';

const nokiaAuthApi = axios.create({
  baseURL: 'https://mycampus-server.karage.fi/auth',
});

// eslint-disable-next-line import/prefer-default-export
export const validateToken = async (token: string) => {
  return true; // TODO: remove after testing

  const verifyRequest = await nokiaAuthApi.post('/verify', { token });

  return verifyRequest.status === 200;
};
