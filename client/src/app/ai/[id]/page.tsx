
'use client'
import ListHistorias from '@/app/enfermeria/historia/components/ListHistorias'
import { useIndex } from '@/context/IndexContext'
import type { HistoriaClinica } from '@/types'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// import data from '../mock/data.json'

export default function Page ({ params: { id } }: { params: { id: string } }) {
  const { historias, loadHistorias } = useIndex()
  useEffect(() => {
    loadHistorias({ id })
  }, [])
  return (
    <div className='h-full'>
      {/* My Post: {params.id} */}
      <AiView historias={historias} id={id} />
    </div>
  )
}

export function AiView ({ id, historias }: { id: string, historias: HistoriaClinica[] }) {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')?.toString().split('%').join(' ') ?? ''

  return (
    <section aria-labelledby='feature-five' id='feature-five' className='lg:h-screen '>
      <div className='px-8 py-24 mx-auto lg:px-16 max-w-7xl md:px-12 xl:px-36 lg:flex'>
        <SummaryAi name={name} id={id} />
        <ListHistorias historias={historias} />
      </div>
    </section>
  )
}

const SummaryAi = ({ name, id }: { name: string, id: string }) => {
  return (
    <article className='lg:w-1/2'>
      <div className='top-0 pt-8 pb-16 lg:sticky'>
        <div>
          <div className='lg:pr-24 md:pr-12'>
            <div>
              <header className='flex items-center'>
                <p className='text-2xl font-medium tracking-tight text-black sm:text-4xl mr-auto'>
                  {name}
                </p>
                <Link href={`/enfermeria/historia/${id}`} id='buttonCss'>
                  Agregar Historia
                </Link>
              </header>
              <p className='max-w-xl mt-4 text-lg tracking-tight text-gray-600'>
                You are not your mistakes, you are not your struggles, and you are here NOW with
                the power to shape your day and your future
              </p>
            </div>
            <div className='flex flex-col items-center justify-center gap-3 mt-10 lg:flex-row lg:justify-start'>
              <a
                id='buttonCss'
                className='buttonCss w-full'
                href='#'
              >
                Generar Resumen por AI
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
