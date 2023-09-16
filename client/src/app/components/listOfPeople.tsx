'use client'

import { People } from '@/app/types'
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
import { Fragment, useState, type FormEvent, type FormEventHandler } from 'react'
import Header from './Header'

export const ListOfPeople = ({ people }: { people: People[] }) => {
  const router = useRouter()
  const [filterData, setFilterData] = useState<People[]>(people)
  // const filterPeople = people.filter((item) => item.nursing_records.length > 0)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const search = data.get('search')?.toString().toLowerCase() ?? ''
    if (search !== '' && search.length > 0) {
      const filterPeople = people.filter((item) => item.name.toLowerCase().includes(search))
      setFilterData(filterPeople)
    } else {
      setFilterData(people)
    }
  }

  return (
    <Card className='my-5'>
      <Header />

      <Info length={people.length} handleSubmit={handleSubmit} />

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Edad</TableHeaderCell>
            <TableHeaderCell>Diagnostico</TableHeaderCell>
            <TableHeaderCell className='text-center'>Acción</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filterData?.map((item) => (
            <Fragment key={item.patient_id}>
              <TableRow className='transition-colors cursor-pointer hover:bg-sky-300'>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>{item.diagnosis}</TableCell>
                <TableCell className='text-center'>
                  <Button onClick={() => router.push(`/${item.patient_id}`)}>
                    Revisar Historial ({item.nursing_records.length})
                  </Button>
                </TableCell>
              </TableRow>
            </Fragment>
          ))}
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
