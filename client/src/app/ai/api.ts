import DATA from '@/app/ai/mock/data.json'
import type { People, Tercero } from '@/types'

const api = {
  data: {
    people: () => DATA as unknown as People[],
    terceros: async () => {
      const res = await fetch('/api/terceros')
      const terceros = await res.json() as Tercero[]
      return terceros
    }

  }
}
export default api
