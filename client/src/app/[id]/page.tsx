import api from '@/app/api'
import Card from '../components/Card'
// import data from '../mock/data.json'
const data = api.data.people()

export default function Page ({ params }: { params: { id: string } }) {
  const person = data.filter((item) => item.patient_id === +params.id)[0]
  return (
    <div className='h-full'>
      {/* My Post: {params.id} */}
      <Card name={person.name} records={person.nursing_records} />
    </div>
  )
}
