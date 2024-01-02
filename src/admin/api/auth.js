import api from '../utils/api';
import { deleteAuth, storeAuthToken, storeAuthUser } from '../utils/token';

export async function login({ formData }) {
  const response = await api.post('/admin/login', JSON.stringify(formData));

  if (response.data.status === 'fail') {
    return response.data
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