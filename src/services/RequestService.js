import axios from 'axios';

export const get = ({url, config}) => axios.get(url, config);
export const post = ({url, config, data}) => axios.post(url, data, config);
export const put = ({url, config, data}) => axios.put(url, data, config);
