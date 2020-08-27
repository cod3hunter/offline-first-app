import axios from 'axios';

export const get = ({url, config}) =>
  axios.get(url, {...config, timeout: 2000});
export const post = ({url, config, data}) =>
  axios.post(url, data, {...config, timeout: 2000});
export const put = ({url, config, data}) =>
  axios.put(url, data, {...config, timeout: 2000});
