import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'http://192.168.18.21:3001',
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