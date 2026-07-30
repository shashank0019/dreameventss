import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { testimonialApi } from '../../api/testimonialApi'
import { useToast } from '../../components/common/ToastProvider'
import { testimonialSchema } from '../../utils/validators'
import { FaStar } from 'react-icons/fa'
import { HiPlus, HiPencil, HiTrash, HiOutlineCloudArrowUp, HiXMark } from 'react-icons/hi2'

export default function AdminTestimonialsPage() {
  const { showSuccess, showError } = useToast()
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)

  // Modal control states
  const [isOpen, setIsOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState(null)
  
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
    resolver: zodResolver(testimonialSchema)
  })

  const fetchTestimonials = () => {
    setLoading(true)
    testimonialApi.getTestimonials()
      .then((data) => setTestimonials(data || []))
      .catch((err) => showError('Failed to load testimonials.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const handleOpenModal = (testimonial = null) => {
    setEditingTestimonial(testimonial)
    setSelectedFile(null)
    setFilePreview(null)

    if (testimonial) {
      setValue('clientName', testimonial.clientName)
      setValue('reviewText', testimonial.reviewText)
      setValue('rating', testimonial.rating)
      setValue('eventType', testimonial.eventType || '')
      setFilePreview(testimonial.clientImageUrl)
    } else {
      reset({ clientName: '', reviewText: '', rating: 5, eventType: '' })
    }
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setEditingTestimonial(null)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showError('File is too large. Max limit is 5MB.')
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
      const testimonialData = {
        clientName: data.clientName,
        reviewText: data.reviewText,
        rating: data.rating,
        eventType: data.eventType || ''
      }

      const formData = new FormData()
      formData.append(
        'testimonial',
        new Blob([JSON.stringify(testimonialData)], { type: 'application/json' })
      )
      if (selectedFile) {
        formData.append('clientImage', selectedFile)
      }

      if (editingTestimonial) {
        await testimonialApi.updateTestimonial(editingTestimonial.id, formData)
        showSuccess('Testimonial updated successfully!')
      } else {
        await testimonialApi.createTestimonial(formData)
        showSuccess('Testimonial created successfully!')
      }

      handleCloseModal()
      fetchTestimonials()
    } catch (err) {
      showError(err.message || 'Failed to save testimonial.')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) return
    try {
      await testimonialApi.deleteTestimonial(id)
      showSuccess('Testimonial deleted.')
      fetchTestimonials()
    } catch (err) {
      showError(err.message || 'Failed to delete testimonial.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl text-dark-850 dark:text-brand-100 font-normal">
            Client Testimonials
          </h1>
          <p className="text-xs text-dark-400 mt-1">Configure and manage client reviews displayed on the homepage.</p>
        </div>
        <button
          onClick={() => handleOpenModal(null)}
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors shadow-md flex items-center gap-2"
        >
          <HiPlus className="w-4 h-4" /> Add Review
        </button>
      </div>

      {/* Testimonials table */}
      <div className="bg-white dark:bg-dark-800 border border-brand-100 dark:border-dark-700/50 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-dark-400 animate-pulse">Loading reviews...</div>
        ) : testimonials.length === 0 ? (
          <div className="p-12 text-center text-dark-400 text-sm font-light">No client reviews have been logged.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-brand-100 dark:border-dark-700/50 text-dark-400 text-xs uppercase tracking-wider font-semibold bg-gray-50 dark:bg-dark-900/55">
                  <th className="py-4 px-6 font-medium">Client Info</th>
                  <th className="py-4 px-6 font-medium">Review</th>
                  <th className="py-4 px-6 font-medium">Rating</th>
                  <th className="py-4 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100/50 dark:divide-dark-700/50">
                {testimonials.map((test) => (
                  <tr key={test.id} className="text-dark-750 dark:text-dark-250">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={test.clientImageUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'}
                          alt={test.clientName}
                          className="w-10 h-10 rounded-full object-cover border border-brand-100"
                        />
                        <div>
                          <div className="font-semibold text-dark-900 dark:text-brand-100">{test.clientName}</div>
                          {test.eventType && <div className="text-xs text-dark-400 mt-0.5">{test.eventType}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-xs max-w-md line-clamp-2 leading-relaxed italic">"{test.reviewText}"</p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-1 text-yellow-400">
                        {Array.from({ length: test.rating }).map((_, i) => (
                          <FaStar key={i} className="w-3.5 h-3.5" />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right space-x-1.5">
                      <button
                        onClick={() => handleOpenModal(test)}
                        className="p-2 border border-brand-200 dark:border-dark-700 hover:bg-brand-100 dark:hover:bg-dark-900 text-brand-500 rounded-lg inline-flex"
                      >
                        <HiPencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(test.id)}
                        className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg inline-flex"
                      >
                        <HiTrash className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseModal} />
          
          <div className="relative bg-white dark:bg-dark-800 rounded-[2rem] border border-brand-100 dark:border-dark-700/50 shadow-xl max-w-md w-full p-6 sm:p-8 z-10 space-y-6">
            <h2 className="font-serif text-2xl text-dark-850 dark:text-brand-100 font-normal">
              {editingTestimonial ? 'Edit Testimonial' : 'Create Testimonial'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Client Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Client Name *</label>
                <input
                  type="text"
                  {...register('clientName')}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                />
                {errors.clientName && <p className="text-xs text-rose-500">{errors.clientName.message}</p>}
              </div>

              {/* Event Type */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Event Type (e.g. Wedding Decor)</label>
                <input
                  type="text"
                  {...register('eventType')}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                />
              </div>

              {/* Review Text */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Review Text *</label>
                <textarea
                  rows={3}
                  {...register('reviewText')}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                />
                {errors.reviewText && <p className="text-xs text-rose-500">{errors.reviewText.message}</p>}
              </div>

              {/* Rating */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Rating (1 to 5 Stars) *</label>
                <select
                  {...register('rating')}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
                {errors.rating && <p className="text-xs text-rose-500">{errors.rating.message}</p>}
              </div>

              {/* Image upload */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Client Portrait Photo</label>
                
                {!filePreview ? (
                  <label className="flex flex-col items-center justify-center border border-dashed border-brand-200 dark:border-dark-700 rounded-xl p-4 cursor-pointer hover:bg-brand-50/50 dark:hover:bg-dark-900/50 transition-colors">
                    <HiOutlineCloudArrowUp className="w-6 h-6 text-brand-400 mb-1" />
                    <span className="text-[10px] text-dark-500">Choose portrait photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border border-brand-105 w-20 h-20 mx-auto shadow-sm bg-black">
                    <img src={filePreview} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={handleClearFile}
                      className="absolute top-1 right-1 p-0.5 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
                    >
                      <HiXMark className="w-3.5 h-3.5" />
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
