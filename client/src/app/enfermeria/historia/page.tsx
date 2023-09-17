'use client'

import { useIndex } from '@/context/IndexContext'
import { useEffect } from 'react'

function Page (params: any) {
  console.log('🚀 ~ file: page.tsx:3 ~ Page ~ params:', params.searchParams.id)
  const { historia, getHistoria } = useIndex()
  useEffect(() => {
    getHistoria({ id: params.searchParams.id })
  }, [])
  return (
    <div>Page</div>
  )
}

export default Page
