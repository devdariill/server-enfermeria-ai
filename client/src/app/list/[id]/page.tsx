
'use client'
import ListHistorias from '@/app/historia/components/ListHistorias'
import { useIndex } from '@/context/IndexContext'
import type { HistoriaClinica } from '@/types'
import Link from 'next/link'
// import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import api from '../api'

// import data from '../mock/data.json'

export default function Page ({ searchParams: { name }, params: { id } }: { searchParams: { name: string }, params: { id: string } }) {
  const { historias, loadHistorias } = useIndex()
  useEffect(() => {
    loadHistorias({ id })
  }, [])
  return (
    <div className='h-full'>
      <AiView historias={historias} id={id} name={name.split('%').join(' ')} />
    </div>
  )
}

function AiView ({ name, id, historias }: { name: string, id: string, historias: HistoriaClinica[] }) {
  // const name = searchParams.name

  return (
    <section aria-labelledby='feature-five' id='feature-five' className='h-full'>
      <div className='px-8 py-5 mx-auto lg:px-16 max-w-7xl md:px-12 xl:px-36 lg:flex'>
        <SummaryAi name={name} id={id} />
        <ListHistorias historias={historias} />
      </div>
    </section>
  )
}

const SummaryAi = ({ name, id }: { name: string, id: string }) => {
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
      const { data } = await api.get.summaryAi({ id })
      setSummary(data)
      setLoading(false)
    }
  }
  return (
    <article className='lg:w-1/2'>
      <div className='top-0 pt-8 pb-16 lg:sticky'>
        <div>
          <div className='lg:pr-24 md:pr-12 grid gap-5'>
            <header className='flex items-center'>
              <p className='text-2xl font-medium tracking-tight text-black sm:text-4xl mr-auto'>
                {name}
              </p>
              <Link href={`/historia/${id}`} id='buttonCss'>
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
