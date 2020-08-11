import axios from 'axios';

const get = ({ url, config }) => axios.get(url, config);

const post = ({ url, config, data }) => axios.post(url, data, config);

export { get, post };
