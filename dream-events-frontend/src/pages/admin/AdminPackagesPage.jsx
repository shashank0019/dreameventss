import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { packageApi } from '../../api/packageApi'
import { categoryApi } from '../../api/categoryApi'
import { useToast } from '../../components/common/ToastProvider'
import { usePagination } from '../../hooks/usePagination'
import { formatPrice } from '../../utils/formatters'
import { PACKAGE_TIERS, PACKAGE_STATUSES } from '../../utils/constants'
import { packageSchema } from '../../utils/validators'
import Pagination from '../../components/common/Pagination'
import { HiPlus, HiPencil, HiTrash, HiOutlineCloudArrowUp, HiXMark } from 'react-icons/hi2'

export default function AdminPackagesPage() {
  const { showSuccess, showError } = useToast()
  
  const [packages, setPackages] = useState([])
  const [categories, setCategories] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)
  const { page, size, setPage, goToPage } = usePagination(0, 6)

  // Modal control states
  const [isOpen, setIsOpen] = useState(false)
  const [editingPkg, setEditingPkg] = useState(null)
  
  // File upload states
  const [newImageFiles, setNewImageFiles] = useState([])
  const [newImagePreviews, setNewImagePreviews] = useState([])
  
  // Keep track of existing images to retain during edits
  const [retainedImages, setRetainedImages] = useState([])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(packageSchema)
  })

  // Load packages
  const fetchPackages = () => {
    setLoading(true)
    packageApi.getPackages({ page, size })
      .then((data) => {
        setPackages(data.content || [])
        setTotalPages(data.totalPages || 0)
      })
      .catch((err) => showError('Failed to load packages.'))
      .finally(() => setLoading(false))
  }

  // Load categories
  useEffect(() => {
    categoryApi.getCategories()
      .then(setCategories)
      .catch(console.error)
  }, [])

  useEffect(() => {
    fetchPackages()
  }, [page])

  // Setup form fields for additions or edits
  const handleOpenModal = (pkg = null) => {
    setEditingPkg(pkg)
    setNewImageFiles([])
    setNewImagePreviews([])

    if (pkg) {
      setValue('name', pkg.name)
      setValue('description', pkg.description)
      setValue('price', pkg.price)
      setValue('tier', pkg.tier)
      setValue('status', pkg.status)
      setValue('categoryId', pkg.category?.id)
      setRetainedImages(pkg.images || [])
    } else {
      reset({
        name: '',
        description: '',
        price: '',
        tier: 'BRONZE',
        status: 'ACTIVE',
        categoryId: ''
      })
      setRetainedImages([])
    }
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    setEditingPkg(null)
  }

  // Handle multiple files uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const validFiles = []
    const newPreviews = []

    files.forEach((file) => {
      if (file.size > 10 * 1024 * 1024) {
        showError(`${file.name} is too large. Max limit is 10MB.`)
        return
      }
      validFiles.push(file)
      newPreviews.push(URL.createObjectURL(file))
    })

    setNewImageFiles((prev) => [...prev, ...validFiles])
    setNewImagePreviews((prev) => [...prev, ...newPreviews])
  }

  const handleRemoveNewImage = (idx) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== idx))
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== idx))
  }

  const handleRemoveExistingImage = (id) => {
    setRetainedImages((prev) => prev.filter((img) => img.id !== id))
  }

  const onSubmit = async (data) => {
    try {
      const packageRequest = {
        name: data.name,
        description: data.description || 'Premium event decoration package.',
        price: data.price,
        tier: data.tier,
        status: data.status,
        categoryId: data.categoryId,
        existingImageIds: editingPkg ? retainedImages.map((img) => img.id) : []
      }

      const formData = new FormData()
      formData.append(
        'package',
        new Blob([JSON.stringify(packageRequest)], { type: 'application/json' })
      )

      newImageFiles.forEach((file) => {
        formData.append('images', file)
      })

      if (editingPkg) {
        await packageApi.updatePackage(editingPkg.id, formData)
        showSuccess('Package updated successfully!')
      } else {
        await packageApi.createPackage(formData)
        showSuccess('Package created successfully!')
      }

      handleCloseModal()
      fetchPackages()
    } catch (err) {
      showError(err.message || 'Failed to save package.')
    }
  }

  const handleDeletePackage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this package?')) return
    try {
      await packageApi.deletePackage(id)
      showSuccess('Package deleted.')
      fetchPackages()
    } catch (err) {
      showError(err.message || 'Failed to delete package.')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-3xl text-dark-850 dark:text-brand-100 font-normal">
            Packages Manager
          </h1>
          <p className="text-xs text-dark-400 mt-1">Configure pricing tiers, decors features, and show images.</p>
        </div>
        <button
          onClick={() => handleOpenModal(null)}
          className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors shadow-md flex items-center gap-2"
        >
          <HiPlus className="w-4 h-4" /> Add Package
        </button>
      </div>

      {/* Packages Listings Table */}
      <div className="bg-white dark:bg-dark-800 border border-brand-100 dark:border-dark-700/50 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-dark-450 animate-pulse">Loading packages...</div>
        ) : packages.length === 0 ? (
          <div className="p-12 text-center text-dark-400 text-sm font-light">No packages available.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-brand-100 dark:border-dark-700/50 text-dark-400 text-xs uppercase tracking-wider font-semibold bg-gray-50 dark:bg-dark-900/55">
                  <th className="py-4 px-6 font-medium">Package Details</th>
                  <th className="py-4 px-6 font-medium">Category</th>
                  <th className="py-4 px-6 font-medium">Price</th>
                  <th className="py-4 px-6 font-medium">Tier</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-100/50 dark:divide-dark-700/50">
                {packages.map((pkg) => {
                  const statusInfo = PACKAGE_STATUSES[pkg.status] || { label: pkg.status, color: 'bg-gray-100 text-gray-800' }
                  const tierInfo = PACKAGE_TIERS[pkg.tier] || { label: pkg.tier, color: 'bg-brand-100 text-brand-850' }
                  return (
                    <tr key={pkg.id} className="text-dark-750 dark:text-dark-250">
                      <td className="py-4.5 px-6">
                        <div className="font-semibold text-dark-900 dark:text-brand-100">{pkg.name}</div>
                        <div className="text-xs text-dark-400 mt-1 line-clamp-1 max-w-sm">{pkg.description}</div>
                      </td>
                      <td className="py-4.5 px-6">{pkg.category?.name}</td>
                      <td className="py-4.5 px-6 font-serif font-medium text-brand-500">{formatPrice(pkg.price)}</td>
                      <td className="py-4.5 px-6">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${tierInfo.color}`}>
                          {tierInfo.label}
                        </span>
                      </td>
                      <td className="py-4.5 px-6">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="py-4.5 px-6 text-right space-x-1.5">
                        <button
                          onClick={() => handleOpenModal(pkg)}
                          className="p-2 border border-brand-200 dark:border-dark-700 hover:bg-brand-100 dark:hover:bg-dark-900 text-brand-500 rounded-lg inline-flex"
                        >
                          <HiPencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePackage(pkg.id)}
                          className="p-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg inline-flex"
                        >
                          <HiTrash className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>

      {/* Edit Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseModal} />
          
          <div className="relative bg-white dark:bg-dark-800 rounded-[2rem] border border-brand-100 dark:border-dark-700/50 shadow-xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 z-10 space-y-6">
            <h2 className="font-serif text-2xl text-dark-850 dark:text-brand-100 font-normal">
              {editingPkg ? 'Edit Package' : 'Create Package'}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Package Name *</label>
                <input
                  type="text"
                  {...register('name')}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                />
                {errors.name && <p className="text-xs text-rose-500">{errors.name.message}</p>}
              </div>



              <div className="grid grid-cols-2 gap-4">
                {/* Price */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Starting Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price')}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                  />
                  {errors.price && <p className="text-xs text-rose-500">{errors.price.message}</p>}
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Category *</label>
                  <select
                    {...register('categoryId')}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  {errors.categoryId && <p className="text-xs text-rose-500">{errors.categoryId.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Tier */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Package Tier *</label>
                  <select
                    {...register('tier')}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                  >
                    <option value="BRONZE">Bronze</option>
                    <option value="SILVER">Silver</option>
                    <option value="GOLD">Gold</option>
                    <option value="PLATINUM">Platinum</option>
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Status *</label>
                  <select
                    {...register('status')}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="DRAFT">Draft</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                </div>
              </div>

              {/* Existing Images retain panel */}
              {editingPkg && retainedImages.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Retained Images</label>
                  <div className="flex flex-wrap gap-2">
                    {retainedImages.map((img) => (
                      <div key={img.id} className="relative w-16 h-16 rounded-lg overflow-hidden border border-brand-100">
                        <img src={img.imageUrl} alt="preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingImage(img.id)}
                          className="absolute top-1 right-1 p-0.5 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
                        >
                          <HiXMark className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Multiple Upload files */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Add New Images</label>
                <label className="flex flex-col items-center justify-center border border-dashed border-brand-200 dark:border-dark-700 rounded-xl p-4 cursor-pointer hover:bg-brand-50/50 dark:hover:bg-dark-900/50 transition-colors">
                  <HiOutlineCloudArrowUp className="w-6 h-6 text-brand-400 mb-1" />
                  <span className="text-[10px] text-dark-500">Choose images to upload</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {/* Previews */}
                {newImagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {newImagePreviews.map((src, i) => (
                      <div key={i} className="relative w-16 h-16 rounded-lg overflow-hidden border border-brand-100">
                        <img src={src} alt="preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(i)}
                          className="absolute top-1 right-1 p-0.5 bg-black/60 text-white rounded-full hover:bg-black transition-colors"
                        >
                          <HiXMark className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit panel */}
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
