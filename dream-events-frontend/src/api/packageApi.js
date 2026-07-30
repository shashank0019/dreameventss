import axiosInstance from './axiosInstance'

export const packageApi = {
  getPackages: (params) => {
    return axiosInstance.get('/api/packages', { params })
  },
  getPackageById: (id) => {
    return axiosInstance.get(`/api/packages/${id}`)
  },
  getRelatedPackages: (id, limit = 3) => {
    return axiosInstance.get(`/api/packages/${id}/related`, { params: { limit } })
  },
  createPackage: (formData) => {
    return axiosInstance.post('/api/admin/packages', formData)
  },
  updatePackage: (id, formData) => {
    return axiosInstance.put(`/api/admin/packages/${id}`, formData)
  },
  deletePackage: (id) => {
    return axiosInstance.delete(`/api/admin/packages/${id}`)
  },
  updateStatus: (id, status) => {
    return axiosInstance.patch(`/api/admin/packages/${id}/status`, null, {
      params: { status }
    })
  }
}
