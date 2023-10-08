'use client'

import { SearchTerceros } from '@/app/tercero/components/search-terceros'
import { useIndex } from '@/context/IndexContext'
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
import { Fragment, useEffect } from 'react'

export const dynamic = 'force-dynamic'

export default function Home () {
  return (
    <main className='mx-auto px-4 max-w-[1500px] pb-24'>
      <TablePeopleAi />
    </main>
  )
}

const TablePeopleAi = () => {
  const { terceros, loadTerceros } = useIndex()
  useEffect(() => {
    loadTerceros()
  }, [])
  const router = useRouter()

  return (
    <Card className='my-5'>

      <Info length={terceros.length} />

      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nombre</TableHeaderCell>
            <TableHeaderCell>Edad</TableHeaderCell>
            <TableHeaderCell className='text-center'>Historias</TableHeaderCell>
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
                      <Button onClick={() => router.push(`/list/${item.id}?name=${item.apellidos}%${item.nombres}`)}>
                        Ver
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

const Info = ({ length }: { length: number }) => {
  return (
    <header className='flex gap-5'>
      <h1 className='text-2xl font-bold min-w-max'>Ultimos Pacientes {length}</h1>

      <SearchTerceros />
    </header>
  )
}
