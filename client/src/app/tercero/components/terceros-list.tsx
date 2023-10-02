'use client'
import { useIndex } from '@/context/IndexContext'
import type { Tercero } from '@/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

const thousandRegex = (value: any) => {
  const number = Number(value) || 0
  const fixedNumber = (Math.round(number))
  return fixedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
const LINK_URL = ({ path }: { path: string }) => `/tercero/${path}`

function Page () {
  const { terceros, loadTerceros } = useIndex()

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
    loadTerceros()
  }, [])
  const path = usePathname()
  console.log(path)
  return (
    <article className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-3'>

      {terceros.length > 0
        ? terceros?.map(tercero => {
          return (
            <PathComponent path={path === '/tercero'} tercero={tercero} key={tercero.id} />
          )
        })
        : <h1>No hay terceros</h1>}
    </article>
  )
}

export default Page

const PathComponent = ({ path, tercero }: { path: boolean, tercero: Tercero }) => {
  const toURL = path ? LINK_URL({ path: tercero.id.toString() }) : `/list/${tercero.id}`
  return (
    <Link href={toURL} key={tercero.id} id='buttonCss'>
      <Card tercero={tercero} />
    </Link>
  )
}

const Card = ({ tercero }: { tercero: Tercero }) => {
  const date = new Date(tercero.created_at)
  const birth = new Date(tercero.fecha_nacimiento)
  return (
    <>
      <h1>{tercero.nombres} {tercero.apellidos}</h1>
      <h6>{thousandRegex(tercero.id_nacional)}</h6>
      <h4>{birth.toDateString()}</h4>
      <h5>{date.toDateString()}</h5>
      <h3>+57 {tercero.celular}</h3>
    </>
  )
}
