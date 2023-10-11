import type { HistoriaClinica } from '@/types'
import { axios } from '../axios'

const PAGE = '/historias'
const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.URL_BACK! + PAGE : 'http://localhost:3001' + PAGE
// const BASE_URL = 'http://localhost:3001' + PAGE
// const URL_BACK = process.env.NODE_ENV === 'production' ? process.env.URL_BACK! + '/informes' : 'http://localhost:3001/informes'

export async function getAll (id: string): Promise<HistoriaClinica[]> {
  return await axios<HistoriaClinica[]>(BASE_URL + '?id=' + id)
}

export async function create (id: string, tercero: HistoriaClinica): Promise<HistoriaClinica> {
  return await axios<HistoriaClinica>(BASE_URL + '/' + id, 'POST', tercero)
}

export async function getById (id: string): Promise<HistoriaClinica> {
  return await axios<HistoriaClinica>(BASE_URL + '/' + id)
}

export async function deleteById (id: string): Promise<HistoriaClinica> {
  return await axios<HistoriaClinica>(BASE_URL + '/' + id, 'DELETE')
}

export async function update (id: string, tercero: HistoriaClinica): Promise<HistoriaClinica> {
  return await axios<HistoriaClinica>(BASE_URL + '/' + id, 'PATCH', tercero)
}
