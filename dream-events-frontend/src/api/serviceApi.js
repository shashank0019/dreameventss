import axiosInstance from './axiosInstance'

export const serviceApi = {
  getServices: () => {
    return axiosInstance.get('/api/services')
  },
  createService: (formData) => {
    return axiosInstance.post('/api/admin/services', formData)
  },
  updateService: (id, formData) => {
    return axiosInstance.put(`/api/admin/services/${id}`, formData)
  },
  deleteService: (id) => {
    return axiosInstance.delete(`/api/admin/services/${id}`)
  }
}
