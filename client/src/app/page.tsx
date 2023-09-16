import { ButtonLink } from './components/button-link'

export default async function Home () {
  return (
    <main className='mx-auto px-4 gap-5 grid py-10'>
      <ButtonLink href='/ai'>
        AI
      </ButtonLink>
      <ButtonLink href='/enfermeria'>
        App
      </ButtonLink>
    </main>
  )
}
