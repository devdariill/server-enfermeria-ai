import type { Tercero } from '@/types'
import { axios } from '../axios'

const PAGE = '/terceros/'
const BASE_URL = 'http://localhost:3001' + PAGE

export async function getAll ({ search }: { search?: string }): Promise<Tercero[]> {
  if (search) {
    return await axios<Tercero[]>(`${BASE_URL}?search=${search}`)
  }
  return await axios<Tercero[]>(BASE_URL)
}

export async function create (tercero: Tercero): Promise<Tercero> {
  return await axios<Tercero>(BASE_URL, 'POST', tercero)
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
