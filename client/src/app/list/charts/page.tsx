import AreaChartCard from './components/Areachart'
import { BarChart } from './components/Barchart'
import { BarChartColors } from './components/BarchartColors'
import CardComponent from './components/Card'

// export const dynamic = 'force-dynamic'
export const revalidate = 60 * 10

function Page () {
  return (
    <section className='p-5'>
      <div className='grid gap-5'>
        <CardComponent />
        <AreaChartCard />
        <BarChart />
        <BarChartColors />
      </div>
    </section>
  )
}

export default Page
