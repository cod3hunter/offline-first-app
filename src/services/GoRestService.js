import * as Request from './RequestService';
import {API_TOKEN} from '../constants';

const BEARER_AUTH = `Bearer ${API_TOKEN}`;
const BASE_URL = 'https://gorest.co.in/public-api';

export const getConfig = () => ({
  headers: {
    Authorization: BEARER_AUTH,
  },
});

export const findUserById = (id) => {
  const url = `${BASE_URL}/users/${id}`;
  const config = getConfig();
  return Request.get({url, config});
};

export const createUser = ({name, gender, email}) => {
  const url = `${BASE_URL}/users`;
  const config = getConfig();
  const data = {
    name,
    gender,
    email,
    status: 'Active',
  };
  return Request.post({url, config, data});
};

export const findPostsByUser = (id) => {
  const url = `${BASE_URL}/users/${id}/posts`;
  const config = getConfig();
  return Request.get({url, config});
};

export const createPost = ({userId, title, body}) => {
  const url = `${BASE_URL}/users/${userId}/posts`;
  const config = getConfig();
  const data = {
    title,
    body,
  };
  return Request.post({url, config, data});
};

export const updateUser = ({postId, title, body}) => {
  const url = `${BASE_URL}/posts/${postId}`;
  const config = getConfig();
  const data = {
    title,
    body,
  };
  return Request.put({url, config, data});
};
