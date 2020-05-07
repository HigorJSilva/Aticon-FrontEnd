import axios from 'axios';
import {config} from '../_helpers/config'

const api = axios.create({
    baseURL: config.baseURL,
});

api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('jwtToken');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

export default api;