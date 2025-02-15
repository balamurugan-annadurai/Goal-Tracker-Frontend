import { TOKEN_COOKIE } from "@/utils/constants/cookie";
import axios from "axios";
import Cookie from "js-cookie";


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_BASE_URL, 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    
    if (config.url?.includes('/goal') || config.url?.includes('/user/profile') ){
      const token = Cookie.get(TOKEN_COOKIE);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    
    
    return config; 
  },
  (error) => {
    return Promise.reject(error); 
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response; 
  },
  (error) => {
    
    return Promise.reject(error); 
  }
);

export default axiosInstance;
