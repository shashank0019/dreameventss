import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required')
})

export const bookingSchema = z.object({
  clientName: z.string().min(1, 'Full name is required').max(100, 'Name is too long'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required').regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  eventDate: z.string().min(1, 'Event date is required').refine((dateStr) => {
    const date = new Date(dateStr)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date >= today
  }, 'Event date must be today or in the future'),
  guestCount: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number({ required_error: 'Guest count is required' }).positive('Guest count must be greater than 0').int()
  ),
  location: z.string().min(1, 'Event location/venue is required'),
  packageId: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number({ required_error: 'Please select a package' })
  ),
  customNotes: z.string().optional()
})

export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required').max(50, 'Name is too long'),
  description: z.string().optional()
})

export const packageSchema = z.object({
  name: z.string().min(1, 'Package name is required').max(100, 'Name is too long'),
  description: z.string().optional(),
  price: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number({ required_error: 'Price is required' }).positive('Price must be greater than 0')
  ),
  tier: z.enum(['BRONZE', 'SILVER', 'GOLD', 'PLATINUM'], {
    errorMap: () => ({ message: 'Please select a valid tier' })
  }),
  status: z.enum(['ACTIVE', 'DRAFT', 'ARCHIVED'], {
    errorMap: () => ({ message: 'Please select a valid status' })
  }),
  categoryId: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number({ required_error: 'Please select a category' })
  )
})

export const serviceSchema = z.object({
  title: z.string().min(1, 'Service title is required').max(100, 'Title is too long'),
  description: z.string().min(1, 'Description is required')
})

export const testimonialSchema = z.object({
  clientName: z.string().min(1, 'Client name is required').max(100, 'Name is too long'),
  reviewText: z.string().min(1, 'Review text is required'),
  rating: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number({ required_error: 'Rating is required' }).min(1).max(5)
  ),
  eventType: z.string().optional()
})

export const contactSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  whatsappNumber: z.string().min(1, 'WhatsApp number is required'),
  instagramUrl: z.string().url('Invalid URL').or(z.literal('')),
  facebookUrl: z.string().url('Invalid URL').or(z.literal('')),
  googleMapsEmbedUrl: z.string().optional()
})
