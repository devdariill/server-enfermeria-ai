import DATA from '@/app/ai/mock/data.json'
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
      console.log('🚀 ~ file: api.ts:21 ~ historia: ~ historia:', historia)
      return historia
    },
    parsedHistoria: async ({ id }: { id: string }) => {
      if (!MODE) throw new Error('🚀 ~ file: api.ts:33 ~ parsedHistoria: ~ Error: Not implemented fetch')

      const res = await fetch(`http://localhost:3001/api/historias?id=${id}`)
      const historias = await res.json() as HistoriaClinica[]

      const parsedHistoria = historias.map(historia => {
        const { programa, codigo, eps, id_tercero, talla, piel_faneras, cabeza, ojos, nariz, oidos, boca, cuello, torax, corazon, pulmones, abdomen, extremidades, genitourinario, e_neurologico_elemental, firma, acudiemte, ...rest } = historia

        const filteredRest = Object.fromEntries(
          Object.entries(rest).filter(([_key, value]) => value !== 'None' && value !== null)
        )

        return { ...filteredRest }
      })

      return parsedHistoria
    }
  }
}
export default api
