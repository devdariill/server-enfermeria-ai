import api from '@/api'
import { Card, Flex, Metric, ProgressBar, Text } from '@tremor/react'

const CardComponent = async () => {
  const data = await api.stats.countByTable({ table: 'terceros' })
  const finalProgress = 100
  const actualProgressPercentage = data / finalProgress * 100
  const actualYear = new Date().getFullYear()

  return (
    <Card className='max-w-sm mx-auto'>
      <Text>Cant</Text>
      <Metric>Pacientes {data}</Metric>
      <Flex className='mt-4'>
        <Text>{actualProgressPercentage}% of annual target</Text>
        <Text>{actualYear}</Text>
      </Flex>
      <ProgressBar value={data} className='mt-2' />
    </Card>
  )
}

export default CardComponent
