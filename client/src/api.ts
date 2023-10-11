import DATA from '@/app/list/mock/data.json'
import type { HistoriaClinica, People, Tercero } from '@/types'

const MODE = process.env.NODE_ENV === 'development'
const api = {
  get: {
    people: () => DATA as unknown as People[],
    terceros: async ({ search }: { search?: string }) => {
      if (search) {
        const res = await fetch(`/api/terceros?search=${search}`)
        const terceros = await res.json() as Tercero[]
        return terceros
      }
      const res = await fetch('/api/terceros')
      const terceros = await res.json() as Tercero[]
      return terceros
    },
    historias: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/historias?id=${id}`)
      const historias = await res.json() as HistoriaClinica[]
      return historias
    },
    historia: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/historias/${id}`)
      const historia = await res.json() as HistoriaClinica
      if (historia.id == null) return undefined
      console.log('1🚀 ~ file: api.ts:26 ~ list-terceros : ~ historia:', historia)
      return historia
    },
    parsedHistoria: async ({ id }: { id: string }) => {
      // if (!MODE) throw new Error('🚀 ~ file: api.ts:33 ~ parsedHistoria: ~ Error: Not implemented fetch')
      if (!MODE) console.error('🚀 ~ file: api.ts:33 ~ parsedHistoria: ~ Error: Not implemented fetch')

      const res = await fetch(`/api/historias?id=${id}`)
      const historias = await res.json() as HistoriaClinica[]

      const parsedHistoria = historias.map(historia => {
        const { programa, codigo, eps, id_tercero, talla, piel_faneras, cabeza, ojos, nariz, oidos, boca, cuello, torax, corazon, pulmones, abdomen, extremidades, genitourinario, e_neurologico_elemental, firma, acudiemte, ...rest } = historia

        const filteredRest = Object.fromEntries(
          Object.entries(rest).filter(([_key, value]) => value !== 'None' && value !== null)
        )
        return { ...filteredRest }
      })
      return parsedHistoria
    },
    summaryAi: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/check-description?id=${id}`)
      const data = await res.json()
      return data
    },
    planificaciones: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/planificaciones?id=${id}`)
      const planificaciones = await res.json()
      return planificaciones
    },
    planificacion: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/planificaciones/${id}`)
      const planificacion = await res.json()
      return planificacion
    },
    seccionesB: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/seccionb?id=${id}`)
      const secciones = await res.json()
      return secciones
    },
    seccionB: async ({ id }: { id: string }) => {
      const res = await fetch(`/api/seccionb/${id}`)
      const seccion = await res.json()
      return seccion
    }
  },
  stats: {
    countByTable: async ({ table }: { table: string }) => {
      const res = await fetch(`${URL_BACK}?name=${table}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      return data
    },
    countByMonth: async ({ table }: { table: string }) => {
      const res = await fetch(`${URL_BACK}/bymonth?name=${table}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const data = await res.json()
      return data
    },
    all: async () => {
      const res = await fetch(`${URL_BACK}/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const now = await res.json()

      const res2 = await fetch(`${URL_BACK}/all?prev_year=1`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const prev = await res2.json()

      return [now, prev]
    }

  }
}
export default api

const URL_BACK = process.env.NODE_ENV === 'production' ? process.env.URL_BACK! + '/informes' : 'http://localhost:3001/informes'
