import { redirect } from 'react-router-dom';

export function storeAuthToken({ accessToken, refreshToken, expiresAt }) {
  localStorage.setItem('access_token', accessToken)
  localStorage.setItem('refresh_token', refreshToken)
  const expiration = new Date(expiresAt)
  localStorage.setItem('expires_at', expiration.toISOString())

  return true
}

export function storeAuthUser(user) {
  localStorage.setItem('user', JSON.stringify(user))

  return true
}

export function deleteAuth() {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('expires_at')
  localStorage.removeItem('user')

  return true
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expires_at')
  const expirationDate = new Date(storedExpirationDate)
  const now = new Date()
  const duration = expirationDate.getTime() - now.getTime()

  return duration
}

export function getAuthToken() {
  const token = localStorage.getItem('access_token')

  if (!token) {
    return null
  }

  const tokenDuration = getTokenDuration()

  if (tokenDuration < 0) {
    return 'EXPIRED'
  }

  return token
}

export function getAuthRefreshToken() {
  const token = localStorage.getItem('refresh_token')

  if (!token) {
    return null
  }

  return token
}

export function checkAuthLoader() {
  const token = getAuthToken()

  if (!token) {
    return redirect('/')
  }

  return null
}

export function getAuthUser() {
  const user = localStorage.getItem('user')

  if (!user) {
    return null
  }

  return JSON.parse(user)
}