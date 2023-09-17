import type { NursingRecord } from '@/types'

function ListHistorias ({ records }: { records: NursingRecord[] }) {
  return (

    <article className='lg:w-1/2'>
      <div className='flex-shrink-0'>
        <div>
          <ul className='grid grid-cols-1 gap-12 mt-6 list-none lg:mt-0 lg:gap-24' role='list'>
            {records?.map((item) => (
              <Item key={item.record_id} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </article>

  )
}

export default ListHistorias

const Item = ({ record_id, date, nurse_name, procedure, notes }: NursingRecord) => {
  return (
    <li>
      <div>
        <div className='flex items-center'>
          <div className='flex items-center justify-center w-12 h-12 text-black bg-white rounded-xl'>
            ❖
          </div>
          <div className='ml-auto'>
            {String(date)} - {nurse_name}
          </div>
        </div>
        <p className='mt-5 text-lg font-medium leading-6 text-black'>{procedure}</p>
      </div>
      <div className='mt-2 text-base text-gray-600'>{notes}</div>
    </li>
  )
}
