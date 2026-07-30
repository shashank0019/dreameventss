import axiosInstance from './axiosInstance'

export const bookingApi = {
  createBooking: (formData) => {
    return axiosInstance.post('/api/bookings', formData)
  },
  getBookings: (params) => {
    return axiosInstance.get('/api/admin/bookings', { params })
  },
  getBookingById: (id) => {
    return axiosInstance.get(`/api/admin/bookings/${id}`)
  },
  updateStatus: (id, status) => {
    return axiosInstance.patch(`/api/admin/bookings/${id}/status`, null, {
      params: { status }
    })
  },
  deleteBooking: (id) => {
    return axiosInstance.delete(`/api/admin/bookings/${id}`)
  },
  getDashboardStats: () => {
    return axiosInstance.get('/api/admin/dashboard')
  }
}
