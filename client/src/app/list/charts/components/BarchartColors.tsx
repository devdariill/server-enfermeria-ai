'use client'
import { useStats } from '@/context/statsContext'
import { Card, BarChart as Chart, Title } from '@tremor/react'
import { useEffect, useState } from 'react'

const dataFormatter = (number: number) => {
  return '# ' + Intl.NumberFormat('us').format(number).toString()
}
// const chartdata2 = [
//   {
//     name: '2022',
//     'Group A': 890,
//     'Group B': 338,
//     'Group C': 538,
//     'Group D': 396,
//     'Group E': 138,
//     'Group F': 436
//   },
//   {
//     name: '2023',
//     'Group A': 289,
//     'Group B': 233,
//     'Group C': 253,
//     'Group D': 333,
//     'Group E': 133,
//     'Group F': 533
//   }
// ]

export const BarChartColors = () => {
  const { colorsChart } = useStats()

  const [data, setData] = useState()
  useEffect(() => {
    colorsChart({ setData })
  }, [])
  if (!data) return null
  const categories = Object.keys(data[0]).filter((key) => key !== 'name')
  return (
    <Card>
      <Title>Resumen de todas las tablas</Title>
      <Chart
        className='mt-6'
        data={data}
        index='name'
        categories={categories}
        colors={['blue', 'teal', 'amber', 'rose', 'indigo', 'emerald']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </Card>
  )
}
