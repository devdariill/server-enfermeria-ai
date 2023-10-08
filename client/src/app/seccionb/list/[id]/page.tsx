
'use client'
import { useIndex } from '@/context/IndexContext'
import type { SeccionB } from '@/types'
import Link from 'next/link'
import { useEffect } from 'react'

export const dynamic = 'force-dynamic'

export default function Page ({ searchParams: { name }, params: { id } }: { searchParams: { name: string }, params: { id: string } }) {
  const idPlanificacion = id
  const { seccionesB, loadSeccionesB } = useIndex()
  console.log('🚀 ~ file: page.tsx:11 ~ Page ~ seccionesB:', seccionesB)
  useEffect(() => {
    loadSeccionesB({ id: idPlanificacion })
  }, [])
  if (!seccionesB) return <div>loading...</div>
  return (
    <AiView seccionesB={seccionesB} id={id} name={name.split('%').join(' ')} />
  )
}

function AiView ({ name, id, seccionesB }: { name: string, id: string, seccionesB: SeccionB[] }) {
  // const name = searchParams.name

  return (
    <section aria-labelledby='feature-five' id='feature-five' className='h-full'>
      <div className='px-8 pt-5 pb-24 mx-auto max-w-xl'>
        <header className='flex items-center'>
          <p className='text-2xl font-medium tracking-tight text-black sm:text-4xl mr-auto'>
            {name}
          </p>
          <Link href={`/seccionb/${id}?name=${name}`} id='buttonCss'>
            Agregar Seccion B
          </Link>
        </header>
        <ListSeccionB seccionesB={seccionesB} name={name} />
      </div>
    </section>
  )
}

function ListSeccionB ({ seccionesB, name }: { seccionesB: SeccionB[], name: string }) {
  return (
    <article className='flex-shrink-0'>
      <ul className='grid grid-cols-1 gap-5 mt-6 list-none ' role='list'>
        {seccionesB?.map((item) => (
          <Item key={item.id} name={name} {...item} />
        ))}
      </ul>
    </article>
  )
}

const Item = ({ id, name, created_at }: SeccionB & { name: string }) => {
  const date = new Date(created_at)
  return (
    <li className='flex items-center'>
      <Link href={`/seccionb?id=${id}&name=${name}`} className='flex items-center justify-center w-12 h-12 text-black bg-white rounded-xl hover:cursor-pointer hover:scale-105'>
        ❖ {id}
      </Link>
      <span className='ml-auto'>
        {date.toLocaleString()}
      </span>
    </li>
  )
}
