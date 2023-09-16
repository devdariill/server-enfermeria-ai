import DATA from '@/app/mock/data.json'
import { People } from '@/types'

const api = {
  data: {
    people: () => DATA as unknown as People[]
  }
}
export default api
