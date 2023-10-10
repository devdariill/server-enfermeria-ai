import type { SeccionB } from '@/types'
import { axios } from '../axios'

const PAGE = '/seccionb'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.URL_BACK! + PAGE : 'http://localhost:3001' + PAGE
// const BASE_URL = 'http://localhost:3001' + PAGE
// const URL_BACK = process.env.NODE_ENV === 'production' ? process.env.URL_BACK! + '/informes' : 'http://localhost:3001/informes'

export async function getAll (id: string): Promise<SeccionB[]> {
  return await axios<SeccionB[]>(BASE_URL + '?id=' + id)
}

export async function create (id: string, planificacion: SeccionB): Promise<SeccionB> {
  return await axios<SeccionB>(BASE_URL + '/' + id, 'POST', planificacion)
}

export async function getById (id: string): Promise<SeccionB> {
  return await axios<SeccionB>(BASE_URL + '/' + id)
}

export async function deleteById (id: string): Promise<SeccionB> {
  return await axios<SeccionB>(BASE_URL + '/' + id, 'DELETE')
}

export async function update (id: string, planificacion: SeccionB): Promise<SeccionB> {
  return await axios<SeccionB>(BASE_URL + '/' + id, 'PATCH', planificacion)
}
