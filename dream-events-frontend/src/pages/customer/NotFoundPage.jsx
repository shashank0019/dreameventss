import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="container mx-auto px-6 py-24 text-center">
      <h1 className="text-6xl font-serif mb-4 text-brand-500">404</h1>
      <p className="mb-6">The page you are looking for does not exist.</p>
      <Link to="/" className="px-6 py-3 bg-brand-500 text-white rounded-xl">Go Home</Link>
    </div>
  )
}
