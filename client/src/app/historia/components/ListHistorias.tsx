import type { HistoriaClinica } from '@/types'
import Link from 'next/link'

function ListHistorias ({ historias, name }: { historias: HistoriaClinica[], name: string }) {
  return (
    <article className='lg:w-1/2'>
      <div className='flex-shrink-0'>
        <div>
          <ul className='grid grid-cols-1 gap-12 mt-6 list-none lg:mt-0 lg:gap-24' role='list'>
            {historias?.map((item) => (
              <Item key={item.id} name={name} {...item} />
            ))}
          </ul>
        </div>
      </div>
    </article>

  )
}

export default ListHistorias

const Item = ({ id, motivo_consulta, firma, enfermedad_actual, impresion_diagnostica, name }: HistoriaClinica & { name: string }) => {
  return (
    <li>
      <div>
        <div className='flex items-center'>
          <Link href={`/historia?id=${id}&name=${name}`} className='flex items-center justify-center w-12 h-12 text-black bg-white rounded-xl hover:cursor-pointer hover:scale-105'>
            ❖
          </Link>
          <div className='ml-auto'>
            {enfermedad_actual} - {firma}
          </div>
        </div>
        <p className='mt-5 text-lg font-medium leading-6 text-black'>{impresion_diagnostica}</p>
      </div>
      <div className='mt-2 text-base text-gray-600'>{motivo_consulta}</div>
    </li>
  )
}
