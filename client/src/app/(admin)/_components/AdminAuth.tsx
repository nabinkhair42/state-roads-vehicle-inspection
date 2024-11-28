'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAdminAuth } from './AdminAuthContext'

export function AdminAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { isAuthenticated, loading } = useAdminAuth()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !loading && !isAuthenticated) {
      router.push('/admin-login')
    }
  }, [mounted, loading, isAuthenticated, router])

  if (loading || !mounted) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? <>{children}</> : null
}

