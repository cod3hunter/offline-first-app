import { get } from './RequestService';

const BEARER_AUTH = 'Bearer A_ojgnHt59fcyNTjXxGxtX9NfQtEz2bi8wTy';
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
