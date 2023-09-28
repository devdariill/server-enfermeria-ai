import { Logout } from '@/app/Session/components'
import { ButtonLink } from '../components/button-link'

export const dynamic = 'force-dynamic'

export default async function Home () {
  return (
    <main className='mx-auto px-4 gap-5 grid py-10'>
      <ButtonLink href='/ai'>Enfermeria</ButtonLink>
      <ButtonLink href='/enfermeria/tercero'>Terceros</ButtonLink>
      <Logout />

    </main>
  )
}
