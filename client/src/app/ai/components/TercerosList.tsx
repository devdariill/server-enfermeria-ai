'use client'

import { useTerceros } from '@/context/TerceroContext'
import {
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from '@tremor/react'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, type FormEvent, type FormEventHandler } from 'react'
import Header from './Header'

export const ListOfPeople = () => {
  const { terceros, loadTerceros } = useTerceros()
  console.log('🚀 ~ file: listOfPeople.tsx:21 ~ ListOfPeople ~ terceros:', terceros)
  useEffect(() => {
    loadTerceros()
  }, [])
  const router = useRouter()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const search = data.get('search')?.toString().toLowerCase() ?? ''
    if (search.length > 0) {
      console.log('🚀 ~ file: listOfPeople.tsx:34 ~ ListOfPeople ~ search', search)
    }
  }

  return (
    <Card className='my-5'>
      <Header />

      <Info length={terceros.length} handleSubmit={handleSubmit} />

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Edad</TableHeaderCell>
            <TableHeaderCell className='text-center'>Acción</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody className='hover:cursor-default'>
          {
            terceros?.map((item) => {
              const dateHTML = `${new Date(item.fecha_nacimiento).toISOString().slice(0, 10)}`
              return (
                <Fragment key={item.id}>
                  <TableRow className='transition-colors hover:bg-sky-300'>
                    <TableCell>{item.nombres} {item.apellidos}</TableCell>
                    <TableCell>{dateHTML}</TableCell>
                    {/* <TableCell>{item.diagnosis}</TableCell> */}
                    <TableCell className='text-center'>
                      <Button onClick={() => router.push(`/ai/${item.id}?id=${item.id}&name=${item.apellidos}%${item.nombres}`)}>
                        Revisar Historial
                        {/* ({item.nursing_records.length}) */}
                      </Button>
                    </TableCell>
                  </TableRow>
                </Fragment>
              )
            })
          }
        </TableBody>
      </Table>
    </Card>
  )
}

const Info = ({ length, handleSubmit }: { length: number, handleSubmit: FormEventHandler<HTMLFormElement> }) => {
  return (
    <header className='flex gap-5'>
      <h1 className='text-2xl font-bold min-w-max'>Ultimos Pacientes {length}</h1>

      <form action='' className='w-full flex' onSubmit={handleSubmit}>
        <label className='flex w-full'>
          <img src='/search.svg' alt='' />
          <input
            type='search'
            name='search'
            className='ml-2 bg-white w-full border outline-0 rounded-l-md pl-3'
            placeholder='Search by name'
          />
          <button className='bg-gray-300 px-2 rounded-r-md'>Filter</button>
        </label>
      </form>

    </header>
  )
}
