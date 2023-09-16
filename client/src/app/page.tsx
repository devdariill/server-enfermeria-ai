import api from '@/app/api'
import { ListOfPeople } from './components/listOfPeople'

const data = api.data.people()

export default async function Home () {
  return (
    <main className='mx-auto px-4 max-w-[1500px] pb-24'>
      <ListOfPeople people={data} />
    </main>
  )
}
