import {get, post} from './RequestService';

const BEARER_AUTH =
  'Bearer 72774da46b9d62c91d27fd62e34c90de35b04b92aa9d9eaef8ee167683757cc6';
const BASE_URL = 'https://gorest.co.in/public-api';

export const getConfig = () => ({
  headers: {
    Authorization: BEARER_AUTH,
  },
});

export const findUserById = (id) => {
  const url = `${BASE_URL}/users/${id}`;
  const config = getConfig();
  return get({url, config});
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
  return post({url, config, data});
};

export const findPostsByUser = (id) => {
  console.log(id);
  const url = `${BASE_URL}/users/${id}/posts`;
  const config = getConfig();
  return get({url, config});
};

export const createPost = ({userId, title, body}) => {
  const url = `${BASE_URL}/users/${userId}/posts`;
  const config = getConfig();
  const data = {
    title,
    body,
  };
  return post({url, config, data});
};
