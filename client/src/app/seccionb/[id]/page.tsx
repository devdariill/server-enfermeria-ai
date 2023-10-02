'use client'
import type { FormEvent, ReactNode } from 'react'

const FormToBody = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  const entries = Array.from(data.entries())
  const body = Object.fromEntries(entries.map(([name, value]) => {
    if (name === 'fec_ant_embarazo' && value === '') {
      return [name, '2000-01-01']
    } else if (value === 'on') {
      return [name, 1]
    } else {
      return [name, value]
    }
  }))
  return body
}

function Pages (props: any) {
  console.log('🚀 ~ file: page.tsx:21 ~ Pages ~ props:', props)
  const idPlanificacion: string = props.params.id
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const confirm = window.confirm('¿Estas seguro de agregar esta historia?')
    if (!confirm) return
    const body = JSON.stringify({ ...FormToBody(event), id_planificacion: idPlanificacion })
    const res = await fetch(`/api/seccionb/${idPlanificacion}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    const response = await res.json()
    console.log('🚀 ~ file: page.tsx:26 ~ handleSubmit ~ response:', response)
  }
  return (
    <>
      <header className='flex items-center justify-around'>
        <h1 className='text-2xl font-medium tracking-tight text-black sm:text-4xl'>
          {props?.searchParams?.name.split('%').join(' ')}
        </h1>
        <h2 className='text-2xl tracking-tight text-black/80'>
          Seccion B
        </h2>
      </header>
      <form onSubmit={handleSubmit} className='py-10'>
        <div className='grid grid-cols-4 gap-3 mx-auto'>
          <FirstComponent />
          <button id='buttonCss' className='w-full mt-2 col-span-4' type='submit'>
            Agregar Seccion B
          </button>
        </div>
      </form>
    </>
  )
}

export default Pages

const Label = ({ name, children }: { name: string, children: ReactNode }) => (
  <label className='font-semibold capitalize text-center items-center flex flex-col justify-center'>{name.split('_').join(' ')}
    {children}
  </label>
)
const Input = ({ name, type = 'string', autoFocus = false }: { name: string, type?: string, autoFocus?: boolean }) => (
  <Label name={name}>
    <input type={type} className='w-full py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultValue={type === 'string' ? 'a' : 1} />
  </Label>
)
// const Checkbox = ({ name, autoFocus = false }: { name: string, autoFocus?: boolean }) => (
//   <Label name={name}>
//     <input type='checkbox' className='py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} />
//   </Label>
// )
const Hr = () => (
  <hr className='col-span-4 p-1 bg-black/20 rounded-full' />
)

const FirstComponent = () => {
  return (
    <>
      {/* <Input name='h_c' type='number' autoFocus /> */}
      <Input name='metodo' />
      <Input name='ciclos' type='number' />
      <Input name='amenorrea' />
      <Input name='sangrado' />
      <Input name='manchado' />
      <Input name='fum' />
      <Input name='lactando' />
      <Input name='cefalea_mareo' />
      <Input name='dolor_mamario' />
      <Input name='dolor_pelvico' />
      <Input name='flujo_caracter' />
      <Input name='varices' />

      <Hr />

      <Input name='senos' />
      <Input name='abdomen' />
      <Input name='cervix' />
      <Input name='utero' />
      <Input name='anexos' />
      <Input name='t_a_mm_hg' />
      <Input name='peso_kg' />

      <Hr />

      <Input name='cambio_metodo' />
      <Input name='motivo' />
      <Input name='nuevo_metodo' />
      <Input name='observaciones' />
      <Input name='citologia' />

    </>
  )
}
// export interface SeccionB {
//   id: number
//   id_planificacion: number

//   metodo: string
//   ciclos: string
//   amenorrea: string
//   sangrado: string
//   manchado: string
//   fum: string
//   lactando: string
//   cefalea_mareo: string
//   dolor_mamario: string
//   dolor_pelvico: string
//   flujo_caracter: string
//   varices: string

//   senos: string
//   abdomen: string
//   cervix: string
//   utero: string
//   anexos: string
//   t_a_mm_hg: string
//   peso_kg: string

//   cambio_metodo: string
//   motivo: string
//   nuevo_metodo: string
//   observaciones: string
//   citologia: string
// }
