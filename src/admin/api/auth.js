import api from '../utils/api';
import { deleteAuth, storeAuthToken, storeAuthUser } from '../utils/token';

export async function login(formData) {
  const response = await api.post('/admin/login', JSON.stringify(formData));

  if (response.status >= 500) {
    throw new Error(response.data.message);
  }
  else if (response.status === 422 || response.status === 401) {
    throw response.data.data;
  }
  else if (response.status >= 400) {
    throw new Error(response.data.data.message);
  }

  const { user, access_token } = response.data.data
  const { access_token: accessToken, refresh_token: refreshToken, expires_at: expiresAt } = access_token

  await storeAuthToken({ accessToken, refreshToken, expiresAt })
  await storeAuthUser(user)

  // return user;
}

export async function logout() {
  await api.post('/admin/logout');
  await deleteAuth()
}