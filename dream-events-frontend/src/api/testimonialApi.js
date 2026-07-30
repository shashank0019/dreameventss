import axiosInstance from './axiosInstance'

export const testimonialApi = {
  getTestimonials: () => {
    return axiosInstance.get('/api/testimonials')
  },
  createTestimonial: (formData) => {
    return axiosInstance.post('/api/admin/testimonials', formData)
  },
  updateTestimonial: (id, formData) => {
    return axiosInstance.put(`/api/admin/testimonials/${id}`, formData)
  },
  deleteTestimonial: (id) => {
    return axiosInstance.delete(`/api/admin/testimonials/${id}`)
  }
}
