'use client'
import type { Tercero } from '@/types'
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
      console.log(tercero)

      setTerceros(tercero)
    }
    getTerceros()
  }, [])

  console.log('🚀 ~ file: page.tsx:8 ~ Page ~ terceros:', terceros)
  return (
    <section className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-3'>
      {terceros.length > 0
        ? terceros?.map(tercero => {
          const date = new Date(tercero.fecha_ingreso)
          const birth = new Date(tercero.fecha_nacimiento)
          return (
            <div key={tercero.id} id='buttonCss' className='hover:cursor-pointer'>
              <h1>{tercero.nombres} {tercero.apellidos}</h1>
              <h3>{tercero.celular}</h3>
              <h4>{birth.toDateString()}</h4>
              <h5>{date.toDateString()}</h5>
              <h6>{thousandRegex(tercero.id_nacional)}</h6>
            </div>
          )
        })
        : <h1>No hay terceros</h1>}
    </section>
  )
}

export default Page
