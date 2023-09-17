import { NextResponse } from 'next/server'
import { create, getAll } from './model'

export async function GET (_request: Request) {
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
