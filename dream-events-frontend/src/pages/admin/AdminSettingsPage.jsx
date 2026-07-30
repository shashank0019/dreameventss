import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactApi } from '../../api/contactApi'
import { useToast } from '../../components/common/ToastProvider'
import { contactSchema } from '../../utils/validators'

export default function AdminSettingsPage() {
  const { showSuccess, showError } = useToast()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(contactSchema)
  })

  useEffect(() => {
    contactApi.getContactInfo()
      .then((data) => {
        if (data) {
          reset({
            email: data.email,
            phone: data.phone,
            address: data.address,
            whatsappNumber: data.whatsappNumber,
            instagramUrl: data.instagramUrl || '',
            facebookUrl: data.facebookUrl || '',
            googleMapsEmbedUrl: data.googleMapsEmbedUrl || ''
          })
        }
      })
      .catch((err) => showError('Failed to load contact settings.'))
      .finally(() => setLoading(false))
  }, [reset, showError])

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await contactApi.updateContactInfo(data)
      showSuccess('Contact configurations updated successfully!')
    } catch (err) {
      showError(err.message || 'Failed to update contact settings.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="p-12 text-center text-dark-400 animate-pulse">Loading settings...</div>
    )
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl text-dark-850 dark:text-brand-100 font-normal">
          Business Settings
        </h1>
        <p className="text-xs text-dark-400 mt-1">Configure contact info, social links, and Google Maps embed.</p>
      </div>

      <div className="bg-white dark:bg-dark-800 border border-brand-100 dark:border-dark-700/50 p-6 sm:p-8 rounded-[2rem] shadow-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Contact Email */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Contact Email *</label>
              <input
                type="email"
                {...register('email')}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
              />
              {errors.email && <p className="text-xs text-rose-500">{errors.email.message}</p>}
            </div>

            {/* Support Phone */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Phone Number *</label>
              <input
                type="text"
                {...register('phone')}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
              />
              {errors.phone && <p className="text-xs text-rose-500">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* WhatsApp Number */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">WhatsApp Number *</label>
              <input
                type="text"
                placeholder="+15551234567"
                {...register('whatsappNumber')}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
              />
              {errors.whatsappNumber && <p className="text-xs text-rose-500">{errors.whatsappNumber.message}</p>}
            </div>

            {/* Address */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Business Address *</label>
              <input
                type="text"
                {...register('address')}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
              />
              {errors.address && <p className="text-xs text-rose-500">{errors.address.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Instagram */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Instagram Profile URL</label>
              <input
                type="text"
                placeholder="https://instagram.com/..."
                {...register('instagramUrl')}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
              />
              {errors.instagramUrl && <p className="text-xs text-rose-500">{errors.instagramUrl.message}</p>}
            </div>

            {/* Facebook */}
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Facebook Page URL</label>
              <input
                type="text"
                placeholder="https://facebook.com/..."
                {...register('facebookUrl')}
                className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm"
              />
              {errors.facebookUrl && <p className="text-xs text-rose-500">{errors.facebookUrl.message}</p>}
            </div>
          </div>

          {/* Google Maps Embed iframe URL */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Google Maps Embed URL (Iframe src link)</label>
            <textarea
              rows={3}
              placeholder="https://google.com/maps/embed?..."
              {...register('googleMapsEmbedUrl')}
              className="w-full px-4 py-2.5 rounded-xl border border-brand-200 dark:border-dark-700/60 bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm font-mono text-[11px]"
            />
          </div>

          {/* Save Action */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-350 text-white font-semibold tracking-widest uppercase rounded-xl transition-all shadow-md shadow-brand-500/10 text-xs"
            >
              {submitting ? 'Saving Configurations...' : 'Save Settings'}
            </button>
          </div>

        </form>
      </div>

    </div>
  )
}
