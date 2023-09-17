import { NextResponse } from 'next/server'
import { getAll } from './controller'

export async function GET (request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')!
  // if (id == null) {
  //   return new Response('Missing id', { status: 400 })
  // }

  try {
    const terceros = await getAll(id)

    // json = JSON.parse(data)
    // return NextResponse.json(json)
    return NextResponse.json(terceros)
  } catch (e) {
    console.log(e)
    return new Response('Error Terceros', { status: 404 })
  }
}
