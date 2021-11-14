import axios from 'axios';
import jwt from 'jsonwebtoken';

const nokiaAuthApi = axios.create({
  baseURL: 'https://mycampus-server.karage.fi/auth',
});

// eslint-disable-next-line import/prefer-default-export
export const validateToken = async (token: string, email: string) => {
  try {
    const decodedJwt = jwt.decode(token);

    const emailFromJwt = decodedJwt?.sub;
    if (email !== emailFromJwt) return false;

    const verifyRequest = await nokiaAuthApi.get('/verify', { headers: { Authorization: token } });

    return verifyRequest.status === 200;
  } catch {
    return false;
  }
};
