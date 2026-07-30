import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { galleryApi } from '../../api/galleryApi'
import { categoryApi } from '../../api/categoryApi'
import { useToast } from '../../components/common/ToastProvider'
import useFetch from '../../hooks/useFetch'
import { HiPlus, HiTrash, HiOutlineCloudArrowUp, HiXMark } from 'react-icons/hi2'

export default function AdminGalleryPage() {
  const { showSuccess, showError } = useToast()
  
  const [categories, setCategories] = useState([])
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('')
  
  // Upload states
  const [isOpen, setIsOpen] = useState(false)
  const [caption, setCaption] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [uploading, setUploading] = useState(false)

  // Fetch gallery items
  const { data: items, loading, error, execute: fetchGallery } = useFetch(
    () => galleryApi.getGallery(selectedCategoryFilter),
    true
  )

  // Refetch when category filter changes
  useEffect(() => {
    fetchGallery()
  }, [selectedCategoryFilter, fetchGallery])

  // Load categories
  useEffect(() => {
    categoryApi.getCategories()
      .then(setCategories)
      .catch(console.error)
  }, [])

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

  const handleOpenModal = () => {
    setCaption('')
    setCategoryId('')
    setSelectedFile(null)
    setFilePreview(null)
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!selectedFile) {
      showError('Please choose a photo to upload.')
      return
    }
    if (!categoryId) {
      showError('Please select a category.')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append(
        'gallery',
        new Blob(
          [JSON.stringify({ caption, categoryId: parseInt(categoryId, 10) })],
          { type: 'application/json' }
        )
      )

      await galleryApi.createGalleryItem(formData)
      showSuccess('Photo uploaded successfully to gallery!')
      handleCloseModal()
      fetchGallery()
    } catch (err) {
      showError(err.message || 'Failed to upload image.')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteItem = async (id) => {
    if (!window.confirm('Are you sure you want to delete this photo from the gallery?')) return
    try {
      await galleryApi.deleteGalleryItem(id)
      showSuccess('Photo deleted from gallery.')
      fetchGallery()
    } catch (err) {
      showError(err.message || 'Failed to delete photo.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl text-dark-850 dark:text-brand-100 font-normal">
            Gallery Portfolio
          </h1>
          <p className="text-xs text-dark-400 mt-1">Upload and manage visual inspiration photos.</p>
        </div>
        <button
          onClick={handleOpenModal}
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors shadow-md flex items-center gap-2"
        >
          <HiPlus className="w-4 h-4" /> Upload Photo
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex gap-4 items-center bg-white dark:bg-dark-800 p-4 rounded-2xl border border-brand-100 dark:border-dark-700/50 shadow-sm">
        <select
          value={selectedCategoryFilter}
          onChange={(e) => setSelectedCategoryFilter(e.target.value)}
          className="w-full sm:w-64 px-4 py-2.5 rounded-xl bg-gray-50 dark:bg-dark-900 border border-brand-200 dark:border-dark-700/60 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-250 dark:bg-dark-850 rounded-2xl" />
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12 text-rose-500">Failed to load gallery.</div>
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-dark-400 text-sm font-light bg-white dark:bg-dark-800 border border-brand-100 dark:border-dark-700/50 rounded-2xl">
          No portfolio photos match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm bg-white border border-brand-100 dark:border-dark-700/50 dark:bg-dark-800"
            >
              <img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover" />
              
              {/* Overlay with Delete button */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white z-10">
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-2 bg-rose-500 hover:bg-rose-600 rounded-lg text-white ml-auto"
                  title="Delete Photo"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
                <div>
                  <span className="text-[10px] uppercase text-brand-300 font-semibold">{item.category?.name}</span>
                  <p className="text-xs font-light line-clamp-2 mt-0.5">{item.caption || 'Exquisite setup'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseModal} />
          
          <div className="relative bg-white dark:bg-dark-800 rounded-[2rem] border border-brand-100 dark:border-dark-700/50 shadow-xl max-w-md w-full p-6 sm:p-8 z-10 space-y-6">
            <h2 className="font-serif text-2xl text-dark-850 dark:text-brand-100 font-normal">
              Upload Portfolio Photo
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Category */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Category *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Caption */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Caption / Description</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="E.g., Elegant floral wedding backdrop drapes"
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                />
              </div>

              {/* Image upload */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Photo Asset *</label>
                
                {!filePreview ? (
                  <label className="flex flex-col items-center justify-center border border-dashed border-brand-200 dark:border-dark-700 rounded-xl p-6 cursor-pointer hover:bg-brand-50/50 dark:hover:bg-dark-900/50 transition-colors">
                    <HiOutlineCloudArrowUp className="w-8 h-8 text-brand-400 mb-1" />
                    <span className="text-[10px] text-dark-500">Choose image file</span>
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

              {/* Submit CTA */}
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
                  disabled={uploading}
                  className="flex-1 py-3 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 text-white rounded-xl text-center text-xs tracking-wider uppercase font-semibold transition-colors shadow-md shadow-brand-500/10"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  )
}
