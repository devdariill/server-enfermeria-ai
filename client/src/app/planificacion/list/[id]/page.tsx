'use client'
import { useIndex } from '@/context/IndexContext'
import type { Planificacion } from '@/types'
import Link from 'next/link'
// import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export const dynamic = 'force-dynamic'

export default function Page ({ searchParams: { name }, params: { id } }: { searchParams: { name: string }, params: { id: string } }) {
  const { planificaciones, loadPlanificaciones } = useIndex()
  const idHistoria = id
  useEffect(() => {
    loadPlanificaciones({ id: idHistoria })
  }, [])
  return (
    <AiView planificaciones={planificaciones} idHistoria={idHistoria} name={name.split('%').join(' ')} />
  )
}

function AiView ({ name, idHistoria, planificaciones }: { name: string, idHistoria: string, planificaciones: Planificacion[] }) {
  // const name = searchParams.name

  return (
    <section aria-labelledby='feature-five' id='feature-five' className='h-full'>
      <div className='px-8 pt-5 pb-24 mx-auto max-w-xl'>
        <header className='flex items-center'>
          <p className='text-2xl font-medium tracking-tight text-black sm:text-4xl mr-auto'>
            {name}
          </p>
          <Link href={`/planificacion/${idHistoria}?name=${name}`} id='buttonCss'>
            Agregar Planificacion
          </Link>
        </header>

        <ListHistorias planificaciones={planificaciones} name={name} />
      </div>
    </section>
  )
}

function ListHistorias ({ planificaciones, name }: { planificaciones: Planificacion[], name: string }) {
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

const Item = ({ id, created_at, name }: Planificacion & { name: string }) => {
  const localDate = new Date(created_at)
  return (
    <li className='flex items-center'>
      <Link href={`/planificacion?id=${id}&name=${name}`} className='flex items-center justify-center w-12 h-12 text-black bg-white rounded-xl hover:cursor-pointer hover:scale-105'>
        ❖ {id}
      </Link>
      <span className='ml-auto'>
        {localDate.toLocaleString()}
      </span>
    </li>
  )
}
