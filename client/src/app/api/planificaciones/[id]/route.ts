import { deleteById, getById, update } from '@/app/api/planificaciones/controller'
import { NextResponse } from 'next/server'
import { create } from '../controller'

export async function POST (request: Request, { params: { id } }: { params: { id: string } }) {
  const data = await request.json()
  try {
    const planificacion = await create(data)
    return NextResponse.json(planificacion)
  } catch (e) {
    console.log(e)
    return new Response('Error Planificaciones', { status: 404 })
  }
}

export async function GET (_request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const planificacion = await getById(id)
    if (planificacion.id == null) return NextResponse.json({ message: 'Planificacion not found' }, { status: 404 })
    return NextResponse.json(planificacion)
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}

export async function PATCH (request: Request, { params: { id } }: { params: { id: string } }) {
  const data = await request.json()
  try {
    const planificacion = await update(id, data)
    return NextResponse.json(planificacion)
  } catch (e) {
    console.log(e)
    return new Response('Error Planificaciones', { status: 404 })
  }
}

export async function DELETE (_request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const planificacion = await deleteById(id)
    return NextResponse.json(planificacion)
  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
