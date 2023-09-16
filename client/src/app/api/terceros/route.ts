import { NextResponse } from 'next/server'

const BASE_URL = 'http://localhost:3000'

async function getTerceros (id?: string) {
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
    const terceros = await getTerceros()

    // json = JSON.parse(data)
    // return NextResponse.json(json)
    return NextResponse.json(terceros)
  } catch (e) {
    console.log(e)
    return new Response('Error Terceros', { status: 500 })
  }
}

export async function POST (request: Request) {
  const data = await request.formData()
  console.log('🚀 ~ file: route.ts:37 ~ POST ~ data :', data)
}
