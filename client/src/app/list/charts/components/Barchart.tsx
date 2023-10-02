'use client'
import { Card, BarChart as Chart, Subtitle, Title } from '@tremor/react'

const chartdata = [
  {
    name: 'Agosto',
    'Cantidad de Historias': 2488
  },
  {
    name: 'Septiembre',
    'Cantidad de Historias': 1445
  },
  {
    name: 'Octubre',
    'Cantidad de Historias': 743
  }
]

const dataFormatter = (number: number) => {
  return '# ' + Intl.NumberFormat('us').format(number).toString()
}

export const BarChart = () => (
  <Card>
    <Title>Registro de Historias (2023)</Title>
    <Subtitle>
      The IUCN Red List has assessed only a small share of the total known species in the world.
    </Subtitle>
    <Chart
      className='mt-6'
      data={chartdata}
      index='name'
      categories={['Cantidad de Historias']}
      colors={['blue']}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
      color='#fff'
    />
  </Card>
)
