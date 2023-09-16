import { type NursingRecord } from '@/app/types'

export function Card ({ name, records }: { name: string, records: NursingRecord[] }) {
  return (
    <section aria-labelledby='feature-five' id='feature-five' className='lg:h-screen '>
      <div className='px-8 py-24 mx-auto lg:px-16 max-w-7xl md:px-12 xl:px-36 lg:flex'>
        <Left name={name} />
        <Right records={records} />
      </div>
    </section>
  )
}

export default Card

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

const Left = ({ name }: { name: string }) => {
  return (
    <article className='lg:w-1/2'>
      <div className='top-0 pt-8 pb-16 lg:sticky'>
        <div>
          <div className='lg:pr-24 md:pr-12'>
            <div>
              <p className='text-2xl font-medium tracking-tight text-black sm:text-4xl'>
                {name}
              </p>
              <p className='max-w-xl mt-4 text-lg tracking-tight text-gray-600'>
                You are not your mistakes, you are not your struggles, and you are here NOW with
                the power to shape your day and your future
              </p>
            </div>
            <div className='flex flex-col items-center justify-center gap-3 mt-10 lg:flex-row lg:justify-start'>
              <a
                id='buttonCss'
                className='buttonCss w-full'
                href='#'
              >
                Generar Resumen por AI
              </a>
              {/* <a
                href='#'
                className='inline-flex items-center justify-center text-sm font-semibold text-black duration-200 hover:text-blue-500 focus:outline-none focus-visible:outline-gray-600'
              >
                Learn more &nbsp; →
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}
const Right = ({ records }: { records: NursingRecord[] }) => {
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
