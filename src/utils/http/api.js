import axios from "axios";
import { getAuthRefreshToken, getAuthToken, storeAuthToken } from "./admin/token";

const baseURL = import.meta.env.VITE_API_BASE_URL

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
      if (err.response.status === 401 && originalConfig.url !== '/admin/refresh-token') {
        try {
          const rs = await api.post("/admin/refresh-token");
          const data = rs.data;
          const { access_token: accessToken, refresh_token: refreshToken, expires_at: expiresAt } = data.data.access_token;
      
          await storeAuthToken({ accessToken, refreshToken, expiresAt });

          return api(originalConfig);
        } catch (_error) {
          return _error;
        }
      }
    }
    return err.response;
  }
);
export default api;