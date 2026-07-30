import axios from 'axios'

// During local dev, VITE_API_URL can be left blank (falls back to window.location origin)
// so the Vite dev server proxy routes /api/ requests to localhost:8080.
// In production, VITE_API_URL points directly to the hosted server.
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request Interceptor: Inject JWT token on every secure request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // If request data is FormData, remove Content-Type header to let browser set it with boundary
    if (config.data instanceof FormData) {
      if (config.headers.delete) {
        config.headers.delete('Content-Type')
      } else {
        delete config.headers['Content-Type']
      }
      config.headers['Content-Type'] = undefined
    }
    
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor: Format responses & handle unauthorized requests
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const originalRequest = error.config
    
    // Auto-redirect to login screen on 401 authentication expiration failures
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      localStorage.removeItem('token')
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login'
      }
    }
    return Promise.reject(error.response?.data || error)
  }
)

export default axiosInstance
