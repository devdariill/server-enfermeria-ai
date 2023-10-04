import TercerosList from '@/app/tercero/components/terceros-list'
import { ButtonLink } from '@/components/button-link'
import { SearchTerceros } from './components/search-terceros'

export const dynamic = 'force-dynamic'

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
      <header className='flex justify-evenly'>
        <label className='font-bold flex items-center'>Terceros</label>

        <div className='my-auto'>
          <SearchTerceros />
        </div>

        <ButtonLink href={LINK_URL({ path: 'add' })} className>Crear Tercero</ButtonLink>
      </header>

      <TercerosList />
    </section>
  )
}

export default Page

const LINK_URL = ({ path }: { path: string }) => `/tercero/${path}`
