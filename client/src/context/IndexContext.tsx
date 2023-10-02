'use client'
import api from '@/api'
import type { HistoriaClinica, Planificacion, SeccionB, Tercero } from '@/types'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'

export const IndexContext = createContext< TerceroContextType | undefined >(undefined)

export function useIndex () {
  const context = useContext(IndexContext)
  if (context === undefined) {
    throw new Error('useIndex must be used within a IndexProvider')
  }
  return context
}

export function IndexProvider ({ children }: { children: ReactNode }) {
  // const [localSession, setLocalSession] = useState<Session | null>(null)
  // Terceros
  const [terceros, setTerceros] = useState<Tercero[]>([])
  async function loadTerceros () {
    // const res = await fetch('/api/terceros')
    // const terceros = await res.json() as Tercero[]
    const terceros = await api.get.terceros({})
    setTerceros(terceros)
  }

  async function getTercerosByValue ({ search }: { search: string }) {
    const terceros = await api.get.terceros({ search })
    setTerceros(terceros)
  }

  // Historias
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
    if (!historia) return toast.error('No se encontró la historia')
    setHistoria(historia)
  }

  // Planificaciones
  const [planificaciones, setPlanificaciones] = useState<Planificacion[]>([])
  async function loadPlanificaciones ({ id }: { id: string }) {
    const planificaciones = await api.get.planificaciones({ id })
    setPlanificaciones(planificaciones)
  }

  const [planificacion, setPlanificacion] = useState<Planificacion>()
  async function getPlanificacion ({ id }: { id: string }) {
    const planificacion = await api.get.planificacion({ id })
    if (!planificacion) return toast.error('No se encontró la planificacion')
    setPlanificacion(planificacion)
  }

  // Seccion B
  const [seccionesB, setSeccionesB] = useState<SeccionB[]>()
  async function loadSeccionesB ({ id }: { id: string }) {
    const seccionesB = await api.get.seccionesB({ id })
    setSeccionesB(seccionesB)
  }

  const [seccionB, setSeccionB] = useState<SeccionB>()
  async function getSeccionB ({ id }: { id: string }) {
    const seccionB = await api.get.seccionB({ id })
    if (!seccionB) return toast.error('No se encontró la seccionB')
    setSeccionB(seccionB)
  }

  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session?.user == null) {
      router.push('/')
    }
  }, [session])

  return (
    <IndexContext.Provider value={{
      terceros,
      setTerceros,
      loadTerceros,
      historias,
      loadHistorias,
      historia,
      getHistoria,
      getTercerosByValue,
      planificaciones,
      loadPlanificaciones,
      planificacion,
      getPlanificacion,
      seccionesB,
      loadSeccionesB,
      seccionB,
      getSeccionB
      // localSession,
      // setLocalSession
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
  getHistoria: ({ id }: { id: string }) => Promise<string | number | undefined>
  getTercerosByValue: ({ search }: { search: string }) => Promise<void>
  planificaciones: Planificacion[]
  loadPlanificaciones: ({ id }: { id: string }) => Promise<void>
  planificacion: Planificacion | undefined
  getPlanificacion: ({ id }: { id: string }) => Promise<string | number | undefined>
  seccionesB: SeccionB[] | undefined
  loadSeccionesB: ({ id }: { id: string }) => Promise<void>
  seccionB: SeccionB | undefined
  getSeccionB: ({ id }: { id: string }) => Promise<string | number | undefined>
  // localSession: Session | null
  // setLocalSession: React.Dispatch<React.SetStateAction<Session | null>>
}
