'use client'
import { ButtonLink } from '@/app/components/button-link'
import type { Tercero } from '@/types'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const thousandRegex = (value: any) => {
  const number = Number(value) || 0
  const fixedNumber = (Math.round(number))
  return fixedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function Page () {
  const [terceros, setTerceros] = useState<Tercero[]>([])

  // const handleClick = async (id: string) => {
  //   setLoading(prevState => ({
  //     ...prevState,
  //     [id]: true
  //   }))

  //   const res = await fetch(`/api/terceros?id=${id}`, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })

  //   const tercero = await res.json() as Tercero[]
  //   console.log(tercero)

  //   setTerceros(prevState => ({
  //     ...prevState,
  //     tercero
  //   }))

  //   setLoading(prevState => ({
  //     ...prevState,
  //     [id]: false
  //   }))
  // }
  useEffect(() => {
    const getTerceros = async () => {
      const res = await fetch('/api/terceros')
      const tercero = await res.json() as Tercero[]
      setTerceros(tercero)
    }
    getTerceros()
  }, [])

  // console.log('🚀 ~ file: page.tsx:8 ~ Page ~ terceros:', terceros)
  return (
    <section className='grid gap-5'>
      <header className='flex'>
        <label className='font-bold flex items-center mr-auto'>Terceros</label>
        <ButtonLink href={LINK_URL({ path: 'add' })} className>Crear Tercero</ButtonLink>
      </header>

      <article className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-3'>

        {terceros.length > 0
          ? terceros?.map(tercero => {
            const date = new Date(tercero.fecha_ingreso)
            const birth = new Date(tercero.fecha_nacimiento)
            return (
              <Link href={LINK_URL({ path: tercero.id.toString() })} key={tercero.id} id='buttonCss' className='hover:cursor-pointer'>
                <h1>{tercero.nombres} {tercero.apellidos}</h1>
                <h3>{tercero.celular}</h3>
                <h4>{birth.toDateString()}</h4>
                <h5>{date.toDateString()}</h5>
                <h6>{thousandRegex(tercero.id_nacional)}</h6>
              </Link>
            )
          })
          : <h1>No hay terceros</h1>}
      </article>
    </section>
  )
}

export default Page

const LINK_URL = ({ path }: { path: string }) => `/enfermeria/tercero/${path}`