import type { Planificacion } from '@/types'
import Link from 'next/link'

function ListHistorias ({ planificaciones }: { planificaciones: Planificacion[] }) {
  return (
    <article className='flex-shrink-0'>
      <ul className='grid grid-cols-1 gap-12 mt-6 list-none lg:mt-0 lg:gap-24' role='list'>
        {planificaciones?.map((item) => (
          <Item key={item.id} {...item} />
        ))}
      </ul>
    </article>
  )
}

export default ListHistorias

const Item = ({ id, fecha }: Planificacion) => {
  return (
    <li className='flex items-center'>
      <Link href={`/enfermeria/historia?id=${id}`} className='flex items-center justify-center w-12 h-12 text-black bg-white rounded-xl hover:cursor-pointer hover:scale-105'>
        ❖ {id}
      </Link>
      <span className='ml-auto'>
        {fecha} - length
      </span>
    </li>
  )
}
