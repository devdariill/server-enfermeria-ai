import type { Tercero } from '@/types'
import { axios } from '../axios'

const PAGE = '/terceros/'
const BASE_URL = 'http://localhost:3000' + PAGE

export async function getAll (id?: string): Promise<Tercero[]> {
  return await axios<Tercero[]>(BASE_URL)
}

export async function create (id: string, tercero: Tercero): Promise<Tercero> {
  return await axios<Tercero>(BASE_URL + id, 'POST', tercero)
}

export async function getById (id: string): Promise<Tercero> {
  return await axios<Tercero>(BASE_URL + id)
}

export async function deleteById (id: string): Promise<Tercero> {
  return await axios<Tercero>(BASE_URL + id, 'DELETE')
}

export async function update (id: string, tercero: Tercero): Promise<Tercero> {
  return await axios<Tercero>(BASE_URL + id, 'PATCH', tercero)
}
