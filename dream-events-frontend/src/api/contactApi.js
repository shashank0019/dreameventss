import axiosInstance from './axiosInstance'

export const contactApi = {
  getContactInfo: () => {
    return axiosInstance.get('/api/contact-info')
  },
  updateContactInfo: (data) => {
    return axiosInstance.put('/api/admin/contact-info', data)
  }
}
