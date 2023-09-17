import { ButtonLink } from '@/app/components/button-link'
import TercerosList from '@/app/enfermeria/tercero/components/terceros-list'

function Page () {
  // const handleClick = async (id: string) => {
  //   setLoading(prevState => ({
  //     ...prevState,
  //     [id]: true
  //   }))

  //   const res = await fetch(`/api/terceros?id=${id}`, {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })

  //   const tercero = await res.json() as Tercero[]
  //   console.log(tercero)

  //   setTerceros(prevState => ({
  //     ...prevState,
  //     tercero
  //   }))

  //   setLoading(prevState => ({
  //     ...prevState,
  //     [id]: false
  //   }))
  // }

  // console.log('🚀 ~ file: page.tsx:8 ~ Page ~ terceros:', terceros)
  return (
    <section className='grid gap-5'>
      <header className='flex'>
        <label className='font-bold flex items-center mr-auto'>Terceros</label>
        <ButtonLink href={LINK_URL({ path: 'add' })} className>Crear Tercero</ButtonLink>
      </header>

      <TercerosList />

    </section>
  )
}

export default Page

const LINK_URL = ({ path }: { path: string }) => `/enfermeria/tercero/${path}`
