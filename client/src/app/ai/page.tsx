import { ListOfPeople } from './components/listOfPeople'

export default async function Home () {
  return (
    <main className='mx-auto px-4 max-w-[1500px] pb-24'>
      <ListOfPeople />
    </main>
  )
}
