import React, { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import SEO from '../../components/common/SEO'
import SectionHeading from '../../components/common/SectionHeading'
import { bookingApi } from '../../api/bookingApi'
import { packageApi } from '../../api/packageApi'
import { bookingSchema } from '../../utils/validators'
import { useToast } from '../../components/common/ToastProvider'
import { HiCloudArrowUp, HiXMark } from 'react-icons/hi2'

export default function BookingPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { showSuccess, showError } = useToast()
  
  const [packages, setPackages] = useState([])
  const [loadingPackages, setLoadingPackages] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [filePreview, setFilePreview] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)

  // Package pre-selection from URL queries
  const preselectedPackageId = searchParams.get('packageId')

  // Setup validation react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      packageId: preselectedPackageId ? Number(preselectedPackageId) : ''
    }
  })

  // Fetch package list for selector
  useEffect(() => {
    packageApi.getPackages({ size: 100 })
      .then((data) => {
        setPackages(data.content || [])
        // If pre-selected id is verified, set it
        if (preselectedPackageId) {
          setValue('packageId', Number(preselectedPackageId))
        }
      })
      .catch((err) => {
        showError('Failed to load packages. Please refresh.')
      })
      .finally(() => {
        setLoadingPackages(false)
      })
  }, [preselectedPackageId, setValue, showError])

  // Handle files preview and drop
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
    setSubmitting(true)
    try {
      const bookingData = {
        clientName: data.clientName,
        email: data.email,
        phone: data.phone,
        eventDate: data.eventDate,
        guestCount: data.guestCount,
        location: data.location,
        packageId: data.packageId,
        customNotes: data.customNotes || ''
      }

      // Pack as multipart
      const formData = new FormData()
      formData.append(
        'booking',
        new Blob([JSON.stringify(bookingData)], { type: 'application/json' })
      )
      if (selectedFile) {
        formData.append('referenceImage', selectedFile)
      }

      await bookingApi.createBooking(formData)
      showSuccess('Your booking request was submitted successfully!')
      navigate('/booking/success')
    } catch (error) {
      showError(error.message || 'An error occurred during submission. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEO 
        title="Book Your Event" 
        description="Book your next wedding, birthday party, corporate gala, or custom celebration. Fill in the form and attach reference screenshots." 
      />
      <div className="py-24 bg-brand-50 dark:bg-dark-900 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <SectionHeading 
            title="Book Your Event" 
            subtitle="Submit Inquiry" 
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 sm:p-10 rounded-[2rem] border border-brand-100 dark:border-dark-700/50 shadow-md bg-white/70 dark:bg-dark-800/70"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Full Name *</label>
                  <input
                    type="text"
                    {...register('clientName')}
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm ${errors.clientName ? 'border-rose-500' : 'border-brand-200 dark:border-dark-700/60'}`}
                  />
                  {errors.clientName && <p className="text-xs text-rose-500">{errors.clientName.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Email Address *</label>
                  <input
                    type="email"
                    {...register('email')}
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm ${errors.email ? 'border-rose-500' : 'border-brand-200 dark:border-dark-700/60'}`}
                  />
                  {errors.email && <p className="text-xs text-rose-500">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Phone Number *</label>
                  <input
                    type="text"
                    placeholder="+1234567890"
                    {...register('phone')}
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm ${errors.phone ? 'border-rose-500' : 'border-brand-200 dark:border-dark-700/60'}`}
                  />
                  {errors.phone && <p className="text-xs text-rose-500">{errors.phone.message}</p>}
                </div>

                {/* Event Date */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Event Date *</label>
                  <input
                    type="date"
                    {...register('eventDate')}
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm ${errors.eventDate ? 'border-rose-500' : 'border-brand-200 dark:border-dark-700/60'}`}
                  />
                  {errors.eventDate && <p className="text-xs text-rose-500">{errors.eventDate.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Location */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Venue / Location *</label>
                  <input
                    type="text"
                    placeholder="Grand Plaza Hall, NY"
                    {...register('location')}
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm ${errors.location ? 'border-rose-500' : 'border-brand-200 dark:border-dark-700/60'}`}
                  />
                  {errors.location && <p className="text-xs text-rose-500">{errors.location.message}</p>}
                </div>

                {/* Guest Count */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Estimated Guests *</label>
                  <input
                    type="number"
                    placeholder="100"
                    {...register('guestCount')}
                    className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm ${errors.guestCount ? 'border-rose-500' : 'border-brand-200 dark:border-dark-700/60'}`}
                  />
                  {errors.guestCount && <p className="text-xs text-rose-500">{errors.guestCount.message}</p>}
                </div>
              </div>

              {/* Package Selector */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Select Package *</label>
                <select
                  {...register('packageId')}
                  disabled={loadingPackages}
                  className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm ${errors.packageId ? 'border-rose-500' : 'border-brand-200 dark:border-dark-700/60'}`}
                >
                  <option value="">-- Choose a package tier --</option>
                  {packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} ({pkg.category?.name})
                    </option>
                  ))}
                </select>
                {errors.packageId && <p className="text-xs text-rose-500">{errors.packageId.message}</p>}
              </div>

              {/* Custom Notes */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Custom Notes / Theme details</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your colors, specific themes, or special wishes..."
                  {...register('customNotes')}
                  className="w-full px-4 py-3 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
                />
              </div>

              {/* Reference Image Upload */}
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Reference Image (Optional)</label>
                
                {!filePreview ? (
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-brand-200 dark:border-dark-700 rounded-2xl p-6 cursor-pointer hover:bg-brand-50/50 dark:hover:bg-dark-900/50 transition-colors">
                    <HiCloudArrowUp className="w-8 h-8 text-brand-400 mb-2" />
                    <span className="text-xs text-dark-600 dark:text-dark-300">Drag & drop or click to upload reference</span>
                    <span className="text-[10px] text-dark-400 mt-1">PNG, JPG or JPEG up to 10MB</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative rounded-2xl overflow-hidden border border-brand-200 dark:border-dark-700 aspect-video max-w-sm mx-auto shadow-sm">
                    <img src={filePreview} alt="Reference upload preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={handleClearFile}
                      className="absolute top-2 right-2 p-1.5 bg-black/60 hover:bg-black text-white rounded-full transition-colors"
                      aria-label="Remove image"
                    >
                      <HiXMark className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-300 text-white font-semibold tracking-widest uppercase rounded-xl transition-all shadow-md shadow-brand-500/20 text-sm flex items-center justify-center gap-2"
                >
                  {submitting ? 'Submitting Details...' : 'Submit Inquiry'}
                </button>
              </div>

            </form>
          </motion.div>

        </div>
      </div>
    </>
  )
}
