import { Card, Flex, Metric, ProgressBar, Text } from '@tremor/react'

const CardComponent = () => (
  <Card className='max-w-sm mx-auto'>
    <Text>Cant</Text>
    <Metric>Pacientes 2</Metric>
    <Flex className='mt-4'>
      <Text>2% of annual target</Text>
      <Text>2023</Text>
    </Flex>
    <ProgressBar value={2} className='mt-2' />
  </Card>
)

export default CardComponent
