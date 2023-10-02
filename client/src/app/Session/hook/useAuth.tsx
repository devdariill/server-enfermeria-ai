'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAuth = () => {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session?.user == null) {
      router.push('Session')
    }
  }, [session])
}
