import { QueryClient } from '@tanstack/react-query';
import api from "../api";
import { deleteAuth, storeAuthToken, storeAuthUser } from './token';

export const queryClient = new QueryClient();

export async function login({ formData }) {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/login`, {
    method: 'post',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while updating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }
  const responseJson = await response.json()

  const { user, access_token } = responseJson.data
  const { access_token: accessToken, refresh_token: refreshToken, expires_at: expiresAt } = access_token

  await storeAuthToken({ accessToken, refreshToken, expiresAt })
  await storeAuthUser(user)

  return user;
}

export async function logout() {
  const loginReq = await api.post('/admin/logout');
  await deleteAuth()
  console.log(loginReq)
}