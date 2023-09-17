import { deleteById, getById, update } from '@/app/api/historias/controller'
import { NextResponse } from 'next/server'
import { create } from '../controller'

export async function POST (request: Request, { params: { id } }: { params: { id: string } }) {
  const data = await request.json()

  try {
    const tercero = await create(id, data)
    console.log('🚀 ~ file: route.ts:54 ~ tercero:', tercero)
    return NextResponse.json(tercero)
  } catch (e) {
    console.log(e)
    return new Response('Error Historys', { status: 404 })
  }

  // const data = await request.formData()
}

export async function GET (_request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    console.log('🚀 ~ file: route.ts:23 ~ GET ~ id:', id)
    const tercero = await getById(id)

    if (tercero.id == null) {
      return NextResponse.json({ message: 'History not found' }, { status: 404 })
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
    return new Response('Error Historys', { status: 404 })
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
