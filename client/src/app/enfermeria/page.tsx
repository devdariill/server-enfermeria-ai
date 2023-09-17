import { ButtonLink } from '../components/button-link'

function Page () {
  return (
    <>
      <nav className='grid gap-5'>
        <ButtonLink href='/enfermeria/tercero' className>
          Terceros
        </ButtonLink>
        <ButtonLink href='/enfermeria/historia' className>
          Historias
        </ButtonLink>
      </nav>

    </>
  )
}

export default Page
