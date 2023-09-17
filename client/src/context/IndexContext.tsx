'use client'
import api from '@/app/ai/api'
import type { HistoriaClinica, Tercero } from '@/types'
import type { ReactNode } from 'react'
import { createContext, useContext, useState } from 'react'
import { Toaster } from 'sonner'

export const IndexContext = createContext< TerceroContextType | undefined >(undefined)

export function useIndex () {
  const context = useContext(IndexContext)
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}

export function IndexProvider ({ children }: { children: ReactNode }) {
  const [terceros, setTerceros] = useState<Tercero[]>([])
  async function loadTerceros () {
    const res = await fetch('/api/terceros')
    const terceros = await res.json() as Tercero[]
    setTerceros(terceros)
  }

  const [historias, setHistorias] = useState<HistoriaClinica[]>([])
  async function loadHistorias ({ id }: { id: string }) {
    console.log('🚀 ~ file: IndexContext.tsx:30 ~ loadHistorias ~ id:', id)
    const historias = await api.get.historias({ id })
    console.log('🚀 ~ file: IndexContext.tsx:31 ~ loadHistorias ~ historias:', historias)
    setHistorias(historias)
  }

  const [historia, setHistoria] = useState<HistoriaClinica>()
  async function getHistoria ({ id }: { id: string }) {
    const historia = await api.get.historia({ id })
    setHistoria(historia)
  }

  return (
    <IndexContext.Provider value={{
      terceros,
      setTerceros,
      loadTerceros,
      historias,
      loadHistorias,
      historia,
      getHistoria
    }}
    >
      <Toaster expand={false} richColors />
      {children}
    </IndexContext.Provider>
  )
}

interface TerceroContextType {
  terceros: Tercero[]
  setTerceros: React.Dispatch<React.SetStateAction<Tercero[]>>
  loadTerceros: () => Promise<void>
  historias: HistoriaClinica[]
  loadHistorias: ({ id }: { id: string }) => Promise<void>
  historia: HistoriaClinica | undefined
  getHistoria: ({ id }: { id: string }) => Promise<void>
}
