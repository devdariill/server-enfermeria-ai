
'use client'
import { useIndex } from '@/context/IndexContext'
import type { HistoriaClinica } from '@/types'
import Link from 'next/link'
// import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import api from '../../../api'

export const dynamic = 'force-dynamic'

export default function Page ({ searchParams: { name }, params: { id } }: { searchParams: { name: string }, params: { id: string } }) {
  const idTercero = id
  const { historias, loadHistorias } = useIndex()
  useEffect(() => {
    loadHistorias({ id: idTercero })
  }, [])
  return (
    <div className='h-full'>
      <AiView historias={historias} idTercero={idTercero} name={name.split('%').join(' ')} />
    </div>
  )
}

function AiView ({ name, idTercero, historias }: { name: string, idTercero: string, historias: HistoriaClinica[] }) {
  return (
    <section aria-labelledby='feature-five' id='feature-five' className='h-full'>
      <div className='px-8 py-5 mx-auto lg:px-16 max-w-7xl md:px-12 xl:px-36 lg:flex'>
        <SummaryAi name={name} idTercero={idTercero} />
        <ListHistorias historias={historias} name={name} />
      </div>
    </section>
  )
}

const SummaryAi = ({ name, idTercero }: { name: string, idTercero: string }) => {
  const [summary, setSummary] = useState()
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {
    setLoading(true)
    if (summary) {
      console.log('🚀 ~ file: page.tsx:47 ~ handleClick ~ summary:', summary)
      await new Promise(resolve => {
        const timeout = setTimeout(resolve, 500)
        return () => clearTimeout(timeout)
      })
      return setLoading(false)
    } else {
      const { data } = await api.get.summaryAi({ id: idTercero })
      setSummary(data)
      setLoading(false)
    }
  }
  return (
    <article className='lg:w-1/2'>
      <div className='top-0 pt-8 pb-5 lg:sticky'>
        <div>
          <div className='lg:pr-24 md:pr-12 grid gap-5'>
            <header className='flex items-center'>
              <p className='text-2xl font-medium tracking-tight text-black sm:text-4xl mr-auto'>
                {name}
              </p>
              <Link href={`/historia/${idTercero}?name=${name}`} id='buttonCss'>
                Agregar Historia
              </Link>
            </header>
            {loading && (
              <div className='flex items-center justify-center my-5'>
                <div className='w-16 h-16 border-t-4 border-b-4 border-gray-900 rounded-full animate-spin' />
              </div>
            )}
            {!loading && summary && (
              <p className='max-w-xl text-lg tracking-tight text-gray-600'>
                {summary}
              </p>
            )}
            <div className='flex flex-col items-center justify-center gap-3 lg:flex-row lg:justify-start'>
              <button
                id='buttonCss'
                className='buttonCss w-full'
                onClick={handleClick}
                type='button'
              >
                Generar Resumen por AI
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

function ListHistorias ({ historias, name }: { historias: HistoriaClinica[], name: string }) {
  return (
    <article className='lg:w-1/2'>
      <div className='flex-shrink-0'>
        <div>
          <ul className='grid grid-cols-1 gap-12 mt-6 list-none lg:mt-0 lg:gap-24' role='list'>
            {historias?.map((item) => (
              <Item key={item.id} name={name} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </article>

  )
}
const Item = ({ id, motivo_consulta, firma, enfermedad_actual, impresion_diagnostica, name }: HistoriaClinica & { name: string }) => {
  return (
    <li>
      <div>
        <div className='flex items-center'>
          <Link href={`/historia?id=${id}&name=${name}`} className='flex items-center justify-center w-12 h-12 text-black bg-white rounded-xl hover:cursor-pointer hover:scale-105'>
            ❖
          </Link>
          <div className='ml-auto'>
            {enfermedad_actual} - {firma}
          </div>
        </div>
        <p className='mt-5 text-lg font-medium leading-6 text-black'>{impresion_diagnostica}</p>
      </div>
      <div className='mt-2 text-base text-gray-600'>{motivo_consulta}</div>
    </li>
  )
}
