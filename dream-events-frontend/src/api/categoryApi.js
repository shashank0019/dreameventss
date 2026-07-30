import axiosInstance from './axiosInstance'

export const categoryApi = {
  getCategories: () => {
    return axiosInstance.get('/api/categories')
  },
  createCategory: (data) => {
    return axiosInstance.post('/api/admin/categories', data)
  },
  updateCategory: (id, data) => {
    return axiosInstance.put(`/api/admin/categories/${id}`, data)
  },
  deleteCategory: (id) => {
    return axiosInstance.delete(`/api/admin/categories/${id}`)
  }
}
