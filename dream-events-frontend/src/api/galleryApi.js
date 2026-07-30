import axiosInstance from './axiosInstance'

export const galleryApi = {
  getGallery: (categoryId) => {
    const params = categoryId ? { category: categoryId } : {}
    return axiosInstance.get('/api/gallery', { params })
  },
  createGalleryItem: (formData) => {
    return axiosInstance.post('/api/admin/gallery', formData)
  },
  deleteGalleryItem: (id) => {
    return axiosInstance.delete(`/api/admin/gallery/${id}`)
  }
}
