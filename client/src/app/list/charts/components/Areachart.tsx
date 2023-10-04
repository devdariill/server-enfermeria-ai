'use client'
import { useStats } from '@/context/statsContext'
import { AreaChart, Card, Title } from '@tremor/react'
import { useEffect, useState } from 'react'

// const chartdata = [
//   {
//     date: 'Jan',
//     2022: 2890,
//     2023: 2338
//   },
//   {
//     date: 'Feb',
//     2022: 2756,
//     2023: 2103
//   },
//   {
//     date: 'Mar',
//     2022: 3322,
//     2023: 2194
//   },
//   {
//     date: 'Apr',
//     2022: 3470,
//     2023: 2108
//   },
//   {
//     date: 'May',
//     2022: 3475,
//     2023: 1812
//   },
//   {
//     date: 'Jun',
//     2022: 3129,
//     2023: 1726
//   }
// ]

const dataFormatter = (number: number) => {
  // return '# ' + Intl.NumberFormat('us').format(number).toString()
  return Intl.NumberFormat('us').format(number).toString()
}

// let toChart: Map<number, ToChart> = new Map()

// Ensure that you call fetchData somewhere in your code to populate the 'toChart' Map.
const AreaChartCard = () => {
  const { data, areaChart } = useStats()
  useEffect(() => {
    areaChart()
  }, [])

  const [chartData, setChartData] = useState<JSONData[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!data) return
    const a: JSONData[] = []

    setLoading(true)
    data.forEach((value, key) => {
      a.push({ date: key.toString(), terceros: value.terceros, historias: value.historias })
    })
    const sorted = a.sort((a, b) => +a.date - +b.date)
    const namingMonths = sorted.map((item) => {
      const date = new Date(Date.UTC(2023, +item.date - 1, 1))
      const monthName = date.toLocaleString('en-US', { month: 'short' })
      return { date: monthName, terceros: item.terceros, historias: item.historias }
    })
    setChartData(namingMonths)
    setLoading(false)
  }, [])

  // const chartData: JSONData[] = []
  // const categories: string[] = []

  if (loading) return <>Loading...</>
  // console.log('🚀 ~ file: Areachart.tsx:70 ~ AreaChartCard ~ data:', data)
  const actualYear = new Date().getFullYear()
  return (
    <Card>
      <Title>Registros de historias vs pacientes {actualYear - 1}-{actualYear}</Title>
      <AreaChart
        className='h-72 mt-4'
        data={chartData}
        index='date'
        categories={['terceros', 'historias']}
        colors={['indigo', 'cyan']}
        valueFormatter={dataFormatter}
      />
    </Card>
  )
}
export default AreaChartCard

interface JSONData {
  date: string
  terceros: number
  historias: number
}
