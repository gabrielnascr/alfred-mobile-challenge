import axios from 'axios';

const baseURL = 'https://randomuser.me/api/'

const api = axios.create({
  baseURL,
});

export default api;
