import { GOREST_TOKEN } from 'react-native-dotenv';
import { get } from './RequestService';

const BEARER_AUTH = `Bearer ${GOREST_TOKEN}`;
const BASE_URL = 'https://gorest.co.in/public-api';

const getAllUsers = () => {
  const url = `${BASE_URL}/users`;
  const config = {
    headers: {
      Authorization: BEARER_AUTH,
    }
  };
  return get({ url, config }).then((response) => {
    return response.data?.result || [];
  }).catch((err) => {
    console.error(err);
    return [];
  });
};

export { getAllUsers };
