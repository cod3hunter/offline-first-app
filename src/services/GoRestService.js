import {get} from './RequestService';
import Axios from 'axios';

const BEARER_AUTH = 'Bearer A_ojgnHt59fcyNTjXxGxtX9NfQtEz2bi8wTy';
const BASE_URL = 'https://gorest.co.in/public-api';

export const getAllUsers = async () => {
  const url = `${BASE_URL}/users`;
  const config = {
    headers: {
      Authorization: BEARER_AUTH,
    },
  };
  return get({url, config});
};

export const createUser = async ({first_name, last_name, gender, email}) => {
  const url = `${BASE_URL}/users`;
  const config = {
    headers: {
      Authorization: BEARER_AUTH,
    },
  };
  const data = {
    first_name,
    last_name,
    gender,
    email,
  };
  return Axios.post(url, data, config);
};
