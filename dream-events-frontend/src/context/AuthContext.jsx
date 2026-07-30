import React, { createContext, useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'
import { authApi } from '../api/authApi'

export const AuthContext = createContext(null)

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (token) {
      const decoded = parseJwt(token)
      // Check expiration
      if (decoded && decoded.exp * 1000 > Date.now()) {
        setUser({
          username: decoded.sub,
          role: decoded.role || 'ROLE_ADMIN'
        })
        // Attach token to axios instance
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
      } else {
        // Expired
        logout()
      }
    } else {
      setUser(null)
      delete axiosInstance.defaults.headers.common['Authorization']
    }
    setLoading(false)
  }, [token])

  const login = async (username, password) => {
    setLoading(true)
    try {
      const response = await authApi.login(username, password)
      const jwtToken = response.token
      localStorage.setItem('token', jwtToken)
      setToken(jwtToken)
      return response
    } catch (error) {
      logout()
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete axiosInstance.defaults.headers.common['Authorization']
  }

  const value = {
    token,
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
