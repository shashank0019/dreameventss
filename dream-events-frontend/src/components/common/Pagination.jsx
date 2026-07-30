import React from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    for (let i = 0; i < totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="p-2.5 rounded-xl border border-brand-200 dark:border-dark-700 hover:bg-brand-100 dark:hover:bg-dark-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        aria-label="Previous Page"
      >
        <HiChevronLeft className="w-5 h-5" />
      </button>

      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`w-10 h-10 rounded-xl flex items-center justify-center font-medium transition-all ${
            currentPage === pageNum
              ? 'bg-brand-500 text-white shadow-md'
              : 'border border-brand-200 dark:border-dark-700 hover:bg-brand-100 dark:hover:bg-dark-800'
          }`}
        >
          {pageNum + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="p-2.5 rounded-xl border border-brand-200 dark:border-dark-700 hover:bg-brand-100 dark:hover:bg-dark-800 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        aria-label="Next Page"
      >
        <HiChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}
