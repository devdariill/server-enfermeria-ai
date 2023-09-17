import DATA from '@/app/ai/mock/data.json'
import type { HistoriaClinica, People, Tercero } from '@/types'

const api = {
  get: {
    people: () => DATA as unknown as People[],
    terceros: async () => {
      const res = await fetch('/api/terceros')
      const terceros = await res.json() as Tercero[]
      return terceros
    },
    historias: async ({ id }: { id: string }) => {
      console.log('🚀 ~ file: api.ts:13 ~ historias: ~ id:', id)
      const res = await fetch(`/api/historias?id=${id}`)
      const historias = await res.json() as HistoriaClinica[]
      return historias
    }

  }
}
export default api
