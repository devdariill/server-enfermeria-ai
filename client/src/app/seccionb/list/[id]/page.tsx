
'use client'
import { useIndex } from '@/context/IndexContext'
import type { Planificacion } from '@/types'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Page ({ searchParams: { name }, params: { id } }: { searchParams: { name: string }, params: { id: string } }) {
  const { planificaciones, loadPlanificaciones } = useIndex()
  console.log('🚀 ~ file: page.tsx:14 ~ Page ~ planificaciones:', planificaciones)
  useEffect(() => {
    loadPlanificaciones({ id })
  }, [])
  return (
    <AiView planificaciones={planificaciones} id={id} name={name.split('%').join(' ')} />
  )
}

function AiView ({ name, id, planificaciones }: { name: string, id: string, planificaciones: Planificacion[] }) {
  // const name = searchParams.name

  return (
    <section aria-labelledby='feature-five' id='feature-five' className='h-full'>
      <div className='px-8 pt-5 pb-24 mx-auto max-w-xl'>
        <header className='flex items-center'>
          <p className='text-2xl font-medium tracking-tight text-black sm:text-4xl mr-auto'>
            {name}
          </p>
          <Link href={`/planificacion/${id}`} id='buttonCss'>
            Agregar Seccion B
          </Link>
        </header>
        <ListSeccionB planificaciones={planificaciones} name={name} />
      </div>
    </section>
  )
}

function ListSeccionB ({ planificaciones, name }: { planificaciones: Planificacion[], name: string }) {
  return (
    <article className='flex-shrink-0'>
      <ul className='grid grid-cols-1 gap-5 mt-6 list-none ' role='list'>
        {planificaciones?.map((item) => (
          <Item key={item.id} name={name} {...item} />
        ))}
      </ul>
    </article>
  )
}

const Item = ({ id, fecha, name }: Planificacion & { name: string }) => {
  return (
    <li className='flex items-center'>
      <Link href={`/planificacion?id=${id}&name=${name}`} className='flex items-center justify-center w-12 h-12 text-black bg-white rounded-xl hover:cursor-pointer hover:scale-105'>
        ❖ {id}
      </Link>
      <span className='ml-auto'>
        {fecha} - length
      </span>
    </li>
  )
}
