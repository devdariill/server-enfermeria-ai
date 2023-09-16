import type { Tercero } from '@/types'
import { NextResponse } from 'next/server'

const BASE_URL = 'http://localhost:3000'

async function getAll (id?: string) {
  const res = await fetch(BASE_URL + '/terceros', {
    headers: {
      'Content-Type': 'application/json'
      // Authorization: `Basic ${infojobsToken}`
    }
  })
  const data = await res.json()
  return data
}
export async function GET (request: Request) {
  // const { searchParams } = new URL(request.url)
  // const id = searchParams.get('id')
  // if (id == null) {
  //   return new Response('Missing id', { status: 400 })
  // }

  try {
    const terceros = await getAll()

    // json = JSON.parse(data)
    // return NextResponse.json(json)
    return NextResponse.json(terceros)
  } catch (e) {
    console.log(e)
    return new Response('Error Terceros', { status: 404 })
  }
}

type TerceroPost = Omit<Tercero, 'id' | 'fecha_ingreso'>
async function create (tercero: TerceroPost) {
  const res = await fetch(BASE_URL + '/terceros', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(tercero)
  })
  const data = await res.json()
  return data
}
export async function POST (request: Request) {
  const data = await request.json()

  try {
    const tercero = await create(data)
    console.log('🚀 ~ file: route.ts:54 ~ tercero:', tercero)
    return NextResponse.json(tercero)
  } catch (e) {
    console.log(e)
    return new Response('Error Terceros', { status: 404 })
  }

  // const data = await request.formData()
}
