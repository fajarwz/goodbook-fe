import axios from "axios";
import config from "./config";
import { deleteAuth, getAuthRefreshToken, getAuthToken, storeAuthToken } from "./token";

const baseURL = config.api.host

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = config.url === '/member/refresh-token' ? getAuthRefreshToken() : getAuthToken();
    if (token) {
      config.headers["Authorization"] = 'Bearer ' + token; 
    }
    return config;
  },
  (error) => {
    return error;
  }
);
api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    
    const globalUrl = [
      `/member/login`,
    ];

    if (!globalUrl.includes(originalConfig.url) && err.response) {
      console.log("Access Token was expired");
      // Access Token was expired
      if (err.response.status === 401) {
        if (originalConfig.url !== '/member/refresh-token') {
          try {
            const rs = await api.post("/member/refresh-token");
            const data = rs.data;
            const { access_token: accessToken, refresh_token: refreshToken, expires_at: expiresAt } = data.data.access_token;
        
            await storeAuthToken({ accessToken, refreshToken, expiresAt });
  
            return api(originalConfig);
          } catch (_error) {
            return _error;
          }
        }

        deleteAuth()
      }
    }
    return err.response;
  }
);
export default api;