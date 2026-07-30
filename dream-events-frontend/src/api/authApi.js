import axiosInstance from './axiosInstance'

export const authApi = {
  login: (username, password) => {
    return axiosInstance.post('/api/auth/login', { username, password })
  }
}
