'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { validateAdminToken } from '@/services/admin'

interface AdminAuthContextType {
  isAuthenticated: boolean
  loading: boolean
  login: (token: string) => Promise<boolean>
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      validateAdminToken(token).then((isValid) => {
        setIsAuthenticated(isValid)
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (token: string) => {
    const isValid = await validateAdminToken(token)
    if (isValid) {
      localStorage.setItem('adminToken', token)
      setIsAuthenticated(true)
    }
    return isValid
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    setIsAuthenticated(false)
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}

