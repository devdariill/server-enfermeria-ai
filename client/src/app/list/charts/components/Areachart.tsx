'use client'
import { AreaChart, Card, Title } from '@tremor/react'

const chartdata = [
  {
    date: 'Jan',
    2022: 2890,
    2023: 2338
  },
  {
    date: 'Feb',
    2022: 2756,
    2023: 2103
  },
  {
    date: 'Mar',
    2022: 3322,
    2023: 2194
  },
  {
    date: 'Apr',
    2022: 3470,
    2023: 2108
  },
  {
    date: 'May',
    2022: 3475,
    2023: 1812
  },
  {
    date: 'Jun',
    2022: 3129,
    2023: 1726
  }
]

const dataFormatter = (number: number) => {
  return '# ' + Intl.NumberFormat('us').format(number).toString()
}

const AreaChartCard = () => (
  <Card>
    <Title>Registros de historias 2022-2023</Title>
    <AreaChart
      className='h-72 mt-4'
      data={chartdata}
      index='date'
      categories={['2022', '2023']}
      colors={['indigo', 'cyan']}
      valueFormatter={dataFormatter}
    />
  </Card>
)
export default AreaChartCard
