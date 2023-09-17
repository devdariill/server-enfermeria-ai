import type { Tercero } from '@/types'

const PAGE = '/terceros'
const BASE_URL = 'http://localhost:3000' + PAGE

export async function getAll (id?: string) {
  const res = await fetch(BASE_URL, {
    headers: {
      'Content-Type': 'application/json'
      // Authorization: `Basic ${infojobsToken}`
    }
  })
  const data = await res.json()
  return data
}
export async function create (tercero: TerceroPost) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tercero)
  })
  const data = await res.json()
  return data
}

export async function getById (id: string) {
  const res = await fetch(BASE_URL + `/${id}`, {
    headers: {
      'Content-Type': 'application/json'
      // Authorization: `Basic ${infojobsToken}`
    }
  })
  const data = await res.json()
  console.log('🚀 ~ file: route.ts:13 ~ getById ~ data:', data)
  return data
}

export async function deleteById (id: string) {
  console.log('🚀 ~ file: route.ts:19 ~ deleteById ~ id:', id)
  const res = await fetch(BASE_URL + `/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await res.json()
  console.log('🚀 ~ file: route.ts:13 ~ getById ~ data:', data)
  return data
}
export async function update (id: string, tercero: TerceroPost) {
  const res = await fetch(BASE_URL + `/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tercero)
  })
  const data = await res.json()
  return data
}
type TerceroPost = Omit<Tercero, 'id' | 'fecha_ingreso'>
