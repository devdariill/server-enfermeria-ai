import { deleteById, getById, update } from '@/app/api/terceros/controller'
import { NextResponse } from 'next/server'

export async function GET (_request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const tercero = await getById(id)

    if (tercero.id == null) {
      return NextResponse.json({ message: 'Tercero not found' }, { status: 404 })
    }

    return NextResponse.json(tercero)
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function PATCH (request: Request, { params: { id } }: { params: { id: string } }) {
  const data = await request.json()
  try {
    const tercero = await update(id, data)
    console.log('🚀 ~ file: route.ts:54 ~ tercero:', tercero)
    return NextResponse.json(tercero)
  } catch (e) {
    console.log(e)
    return new Response('Error Terceros', { status: 404 })
  }
}

export async function DELETE (_request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const tercero = await deleteById(id)
    return NextResponse.json(tercero)
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
