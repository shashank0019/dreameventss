import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { serviceApi } from '../../api/serviceApi'
import { useToast } from '../../components/common/ToastProvider'
import { serviceSchema } from '../../utils/validators'
import { HiPlus, HiPencil, HiTrash, HiOutlineCloudArrowUp, HiXMark } from 'react-icons/hi2'

export default function AdminServicesPage() {
  const { showSuccess, showError } = useToast()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal control states
  const [isOpen, setIsOpen] = useState(false)
  const [editingService, setEditingService] = useState(null)
  
  // File upload states
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(serviceSchema)
  })

  const fetchServices = () => {
    setLoading(true)
    serviceApi.getServices()
      .then((data) => setServices(data || []))
      .catch((err) => showError('Failed to load services.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleOpenModal = (service = null) => {
    setEditingService(service)
    setSelectedFile(null)
    setFilePreview(null)

    if (service) {
      setValue('title', service.title)
      setValue('description', service.description)
      setFilePreview(service.imageUrl)
    } else {
      reset({ title: '', description: '' })
    }
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setEditingService(null)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        showError('File is too large. Max limit is 10MB.')
        return
      }
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setFilePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleClearFile = () => {
    setSelectedFile(null)
    setFilePreview(null)
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      formData.append(
        'service',
        new Blob([JSON.stringify({ title: data.title, description: data.description })], { type: 'application/json' })
      )
      if (selectedFile) {
        formData.append('image', selectedFile)
      }

      if (editingService) {
        await serviceApi.updateService(editingService.id, formData)
        showSuccess('Service updated successfully!')
      } else {
        await serviceApi.createService(formData)
        showSuccess('Service created successfully!')
      }

      handleCloseModal()
      fetchServices()
    } catch (err) {
      showError(err.message || 'Failed to save service.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return
    try {
      await serviceApi.deleteService(id)
      showSuccess('Service deleted.')
      fetchServices()
    } catch (err) {
      showError(err.message || 'Failed to delete service.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl text-dark-850 dark:text-brand-100 font-normal">
            Services Manager
          </h1>
          <p className="text-xs text-dark-400 mt-1">Configure business decoration and design offerings.</p>
        </div>
        <button
          onClick={() => handleOpenModal(null)}
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors shadow-md flex items-center gap-2"
        >
          <HiPlus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="p-12 text-center text-dark-400 animate-pulse">Loading services...</div>
      ) : services.length === 0 ? (
        <div className="p-12 text-center text-dark-400 text-sm font-light bg-white dark:bg-dark-800 border border-brand-100 dark:border-dark-700/50 rounded-2xl">
          No services have been configured.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.id} className="bg-white dark:bg-dark-800 border border-brand-100 dark:border-dark-700/50 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between h-[380px]">
              
              {/* Image */}
              <div className="h-40 overflow-hidden relative">
                <img
                  src={service.imageUrl || 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80'}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Body */}
              <div className="p-5 flex-grow flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-medium text-dark-850 dark:text-brand-100">{service.title}</h3>
                  <p className="text-xs text-dark-500 dark:text-dark-300 font-light line-clamp-3 leading-relaxed">{service.description}</p>
                </div>

                <div className="flex gap-2 justify-end border-t border-brand-100 dark:border-dark-700/50 pt-3">
                  <button
                    onClick={() => handleOpenModal(service)}
                    className="p-2 border border-brand-200 dark:border-dark-700 hover:bg-brand-100 dark:hover:bg-dark-900 text-brand-500 rounded-lg inline-flex"
                  >
                    <HiPencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(service.id)}
                    className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg inline-flex"
                  >
                    <HiTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Edit Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseModal} />
          
          <div className="relative bg-white dark:bg-dark-800 rounded-[2rem] border border-brand-100 dark:border-dark-700/50 shadow-xl max-w-md w-full p-6 sm:p-8 z-10 space-y-6">
            <h2 className="font-serif text-2xl text-dark-850 dark:text-brand-100 font-normal">
              {editingService ? 'Edit Service' : 'Create Service'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Title */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Service Title *</label>
                <input
                  type="text"
                  {...register('title')}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                />
                {errors.title && <p className="text-xs text-rose-500">{errors.title.message}</p>}
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Description *</label>
                <textarea
                  rows={4}
                  {...register('description')}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                />
                {errors.description && <p className="text-xs text-rose-500">{errors.description.message}</p>}
              </div>

              {/* Image upload */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Service Cover Photo</label>
                
                {!filePreview ? (
                  <label className="flex flex-col items-center justify-center border border-dashed border-brand-200 dark:border-dark-700 rounded-xl p-4 cursor-pointer hover:bg-brand-50/50 dark:hover:bg-dark-900/50 transition-colors">
                    <HiOutlineCloudArrowUp className="w-6 h-6 text-brand-400 mb-1" />
                    <span className="text-[10px] text-dark-500">Choose cover image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-brand-100 aspect-video w-full shadow-sm bg-black">
                    <img src={filePreview} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={handleClearFile}
                      className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
                    >
                      <HiXMark className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Actions panel */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-3 bg-brand-50 hover:bg-brand-100 dark:bg-dark-900 dark:hover:bg-dark-750 rounded-xl text-center text-xs tracking-wider uppercase font-semibold text-dark-700 dark:text-brand-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-center text-xs tracking-wider uppercase font-semibold transition-colors shadow-md shadow-brand-500/10"
                >
                  Save Changes
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}
