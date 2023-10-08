'use client'
import type { FormEvent, ReactNode } from 'react'
import { toast } from 'sonner'
import { FirstComponent } from '../components/FirstComponent'

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
    toast.success('Seccion B agregada')
    window.history.back()
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

      <form onSubmit={handleSubmit} className='py-3'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mx-auto'>
          <FirstComponent Input={Input} />
          <button id='buttonCss' className='w-full mt-2 col-span-2 md:col-span-4' type='submit'>
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
