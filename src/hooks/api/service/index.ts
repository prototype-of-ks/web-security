import axios from 'axios';

const instance = axios.create({
  baseURL: 'localhost:8080',
  timeout: 5 * 60 * 60
});

export default instance;