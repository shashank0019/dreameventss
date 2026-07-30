import React from 'react'

export default function LoadingSkeleton({ count = 3, type = 'card' }) {
  const skeletons = Array.from({ length: count })

  if (type === 'list') {
    return (
      <div className="space-y-4 w-full">
        {skeletons.map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 bg-white dark:bg-dark-800 rounded-2xl animate-pulse shadow-sm">
            <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-dark-700" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-brand-100 dark:bg-dark-700 rounded-full w-1/4" />
              <div className="h-3 bg-brand-100 dark:bg-dark-700 rounded-full w-3/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  // Card Skeleton (default)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {skeletons.map((_, i) => (
        <div key={i} className="bg-white dark:bg-dark-800 border border-brand-100 dark:border-dark-700/50 rounded-2xl overflow-hidden shadow-sm animate-pulse flex flex-col h-[400px]">
          <div className="h-48 bg-brand-100 dark:bg-dark-700 w-full" />
          <div className="p-6 flex-grow flex flex-col justify-between">
            <div className="space-y-3">
              <div className="h-6 bg-brand-100 dark:bg-dark-700 rounded-full w-2/3" />
              <div className="h-3 bg-brand-100 dark:bg-dark-700 rounded-full w-full" />
              <div className="h-3 bg-brand-100 dark:bg-dark-700 rounded-full w-5/6" />
            </div>
            <div className="flex justify-between items-center mt-6">
              <div className="h-8 bg-brand-100 dark:bg-dark-700 rounded-lg w-20" />
              <div className="h-8 bg-brand-100 dark:bg-dark-700 rounded-lg w-28" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
