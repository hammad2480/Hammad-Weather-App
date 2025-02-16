import { BASE_URI } from '@env';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:BASE_URI,
    headers:{
        "Content-Type":'application/json',
    }
})

axiosInstance.interceptors.response.use(
   (response) =>{
    return response
   },

   (error) =>{
    console.error('API Error:', error);
    return Promise.reject(error);
   }
)

export default axiosInstance