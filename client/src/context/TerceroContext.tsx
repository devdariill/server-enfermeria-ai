'use client'
import type { Tercero } from '@/types'
import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import { Toaster } from 'sonner'

export const TerceroContext = createContext< TerceroContextType | undefined >(undefined)

export function useTerceros () {
  const context = useContext(TerceroContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}

export function TerceroProvider ({ children }: { children: ReactNode }) {
  const [terceros, setTerceros] = useState<Tercero[]>([])

  async function loadTerceros () {
    const res = await fetch('/api/terceros')
    const terceros = await res.json() as Tercero[]
    setTerceros(terceros)
  }

  return (
    <TerceroContext.Provider value={{
      terceros,
      setTerceros,
      loadTerceros
    }}
    >
      <Toaster expand={false} richColors />
      {children}
    </TerceroContext.Provider>
  )
}

interface TerceroContextType {
  terceros: Tercero[]
  setTerceros: React.Dispatch<React.SetStateAction<Tercero[]>>
  loadTerceros: () => Promise<void>
}
