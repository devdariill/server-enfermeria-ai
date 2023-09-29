import { Logout } from '@/app/Session/components'
import { ButtonLink } from '../components/button-link'

export const dynamic = 'force-dynamic'

export default async function Home () {
  return (
    <section className='mx-auto px-4 gap-5 flex flex-col py-10 w-full'>
      <ButtonLink href='/list'>Enfermeria</ButtonLink>
      <ButtonLink href='/tercero'>Terceros</ButtonLink>
      <Logout />
    </section>
  )
}
