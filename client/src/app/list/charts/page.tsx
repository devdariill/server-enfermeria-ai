import Header from '../components/Header'
import AreaChartCard from './components/Areachart'
import { BarChart } from './components/Barchart'
import { BarChartColors } from './components/BarchartColors'
import CardComponent from './components/Card'

function Page () {
  return (
    <section className='p-5'>
      <Header />

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
