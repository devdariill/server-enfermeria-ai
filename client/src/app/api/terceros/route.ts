import { NextResponse } from 'next/server'
import { create, getAll } from './controller'

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const search = searchParams.get('search')
  if (search) {
    const terceros = await getAll({ search })
    console.log('🚀 ~ file: route.ts:9 ~ GET ~ terceros:', terceros)
    return NextResponse.json(terceros)
  }
  // if (search == null) {
  //   return new Response('Missing search', { status: 400 })
  // }

  try {
    const terceros = await getAll({})

    // json = JSON.parse(data)
    // return NextResponse.json(json)
    return NextResponse.json(terceros)
  } catch (e) {
    console.log(e)
    return new Response('Error Terceros', { status: 404 })
  }
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
