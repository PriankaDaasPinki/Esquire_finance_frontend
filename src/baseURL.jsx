
import axios from "axios";

// local url 
//  export const baseURL = 'http://10.20.2.22:8000'
//  export const baseURL = 'http://10.20.2.65:8000'

// live url
export const baseURL = 'http://10.20.2.39'


export const authAxios = axios.create({
  baseURL: baseURL,
});

authAxios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `token ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



