import api from '../api'
import Card from '../components/Card'
// import data from '../mock/data.json'
const data = api.data.people()

export default function Page ({ params }: { params: any }) {
  console.log('🚀 ~ file: page.tsx:7 ~ Page ~ params:', params)
  const person = data.filter((item) => item.patient_id === +params.id)[0]
  return (
    <div className='h-full'>
      {/* My Post: {params.id} */}
      <Card records={person.nursing_records} />
    </div>
  )
}
