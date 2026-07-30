import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import SEO from '../../components/common/SEO'
import { useAuth } from '../../hooks/useAuth'
import { loginSchema } from '../../utils/validators'
import { useToast } from '../../components/common/ToastProvider'

export default function AdminLoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const { showSuccess, showError } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await login(data.username, data.password)
      showSuccess('Welcome back!')
      navigate('/admin/dashboard')
    } catch (err) {
      showError(err.message || 'Invalid username or password.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEO 
        title="Admin Login Portal" 
        description="Secure administrator panel sign-in page." 
      />
      <div className="min-h-screen flex items-center justify-center bg-brand-50 dark:bg-dark-900 py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 glass-card p-8 sm:p-10 rounded-[2rem] border border-brand-100 dark:border-dark-700/50 bg-white/70 dark:bg-dark-800/70"
        >
          <div className="text-center">
            <h2 className="font-serif text-3xl text-dark-850 dark:text-brand-100 font-normal tracking-wide">
              ADMIN PORTAL
            </h2>
            <p className="mt-2 text-xs text-dark-400 uppercase tracking-widest">
              Dream Events Management
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              {/* Username */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Username</label>
                <input
                  type="text"
                  {...register('username')}
                  className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm ${errors.username ? 'border-rose-500' : 'border-brand-200 dark:border-dark-700/60'}`}
                />
                {errors.username && <p className="text-xs text-rose-500">{errors.username.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold uppercase tracking-wider text-dark-500 block">Password</label>
                <input
                  type="password"
                  {...register('password')}
                  className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-dark-900 focus:outline-none focus:ring-2 focus:ring-brand-400 text-sm ${errors.password ? 'border-rose-500' : 'border-brand-200 dark:border-dark-700/60'}`}
                />
                {errors.password && <p className="text-xs text-rose-500">{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 disabled:bg-brand-350 text-white font-semibold tracking-widest uppercase rounded-xl transition-all shadow-md shadow-brand-500/10 text-xs"
              >
                {submitting ? 'Authenticating...' : 'Sign In'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </>
  )
}
