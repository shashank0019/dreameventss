export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Packages', path: '/packages' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

export const PACKAGE_TIERS = {
  BRONZE: { label: 'Bronze', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300' },
  SILVER: { label: 'Silver', color: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300' },
  GOLD: { label: 'Gold', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' },
  PLATINUM: { label: 'Platinum', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' }
}

export const BOOKING_STATUSES = {
  PENDING: { label: 'Pending', color: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300' },
  APPROVED: { label: 'Approved', color: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300' },
  COMPLETED: { label: 'Completed', color: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300' },
  CANCELLED: { label: 'Cancelled', color: 'bg-rose-100 text-rose-800 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300' }
}

export const PACKAGE_STATUSES = {
  ACTIVE: { label: 'Active', color: 'bg-emerald-100 text-emerald-800' },
  DRAFT: { label: 'Draft', color: 'bg-amber-100 text-amber-800' },
  ARCHIVED: { label: 'Archived', color: 'bg-gray-100 text-gray-800' }
}
