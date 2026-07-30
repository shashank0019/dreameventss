import React from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function AdminNavbar() {
  const { logout, user } = useAuth()

  return (
    <nav className="bg-white dark:bg-dark-800 shadow px-6 py-4 flex justify-between items-center">
      <div>Welcome, {user?.username || 'Admin'}</div>
      <button onClick={logout} className="px-4 py-2 bg-rose-500 text-white rounded-lg">Logout</button>
    </nav>
  )
}
