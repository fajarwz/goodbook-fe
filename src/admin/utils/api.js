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
    const token = config.url === '/admin/refresh-token' ? getAuthRefreshToken() : getAuthToken();
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
      `/admin/login`,
    ];

    if (!globalUrl.includes(originalConfig.url) && err.response) {
      console.log("Access Token was expired");
      // Access Token was expired
      if (err.response.status === 401) {
        if (originalConfig.url !== '/admin/refresh-token') {
          try {
            const response = await api.post("/admin/refresh-token");

            if (response.status >= 500) {
              throw new Error(response.data.message);
            }
            else if (response.status === 403) {
              throw new Error(response.data.data.message, { cause: 'REFRESH_TOKEN_EXPIRED' });
            }
            else if (response.status >= 400) {
              throw new Error(response.data.data.message);
            }

            const data = response.data;
            const { access_token: accessToken, refresh_token: refreshToken, expires_at: expiresAt } = data.data.access_token;
        
            await storeAuthToken({ accessToken, refreshToken, expiresAt });
  
            return api(originalConfig);
          } catch (_error) {
            if (_error.cause !== undefined && _error.cause === 'REFRESH_TOKEN_EXPIRED') {
              deleteAuth()
            }

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