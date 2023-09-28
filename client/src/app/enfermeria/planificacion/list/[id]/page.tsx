
'use client'
import ListHistorias from '@/app/enfermeria/planificacion/components/ListHistorias'
import { useIndex } from '@/context/IndexContext'
import type { Planificacion } from '@/types'
import Link from 'next/link'
// import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// import data from '../mock/data.json'

export default function Page ({ searchParams: { name }, params: { id } }: { searchParams: { name: string }, params: { id: string } }) {
  const { planificaciones, loadPlanificaciones } = useIndex()
  console.log('🚀 ~ file: page.tsx:14 ~ Page ~ planificaciones:', planificaciones)
  useEffect(() => {
    loadPlanificaciones({ id })
  }, [])
  return (
    <div className='h-full'>
      <AiView planificaciones={planificaciones} id={id} name={name.split('%').join(' ')} />
    </div>
  )
}

function AiView ({ name, id, planificaciones }: { name: string, id: string, planificaciones: Planificacion[] }) {
  // const name = searchParams.name

  return (
    <section aria-labelledby='feature-five' id='feature-five' className='lg:h-screen '>
      <div className='px-8 py-24 mx-auto max-w-7xl'>
        <SummaryAi name={name} id={id} />
        <ListHistorias planificaciones={planificaciones} />
      </div>
    </section>
  )
}

const SummaryAi = ({ name, id }: { name: string, id: string }) => {
  return (
    <header className='flex items-center'>
      <p className='text-2xl font-medium tracking-tight text-black sm:text-4xl mr-auto'>
        {name}
      </p>
      <Link href={`/enfermeria/historia/${id}`} id='buttonCss'>
        Agregar Historia
      </Link>
    </header>
  )
}
