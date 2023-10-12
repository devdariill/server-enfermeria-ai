'use client'

import { useIndex } from '@/context/IndexContext'
import type { SeccionB } from '@/types'
import { useEffect } from 'react'

import type { FormEvent, ReactNode } from 'react'
import { toast } from 'sonner'
import { FirstComponent } from './components/FirstComponent'

export const dynamic = 'force-dynamic'

const Label = ({ name, children }: { name: string, children: ReactNode }) => (
  <label className='font-semibold capitalize text-center items-center flex flex-col justify-center'>{name.split('_').join(' ')}
    {children}
  </label>
)

// let id_tercero = -1
function Page (params: any) {
  const { seccionB, getSeccionB } = useIndex()
  useEffect(() => {
    getSeccionB({ id: params.searchParams.id })
  }, [])
  if (!seccionB) return <div>Loading...</div>
  console.log('🚀 ~ file: page.tsx:18 ~ Page ~ seccionB:', seccionB)

  const Input = ({ name, type = 'string', autoFocus = false }: { name: keyof SeccionB, type?: string, autoFocus?: boolean }) => {
    const defaultValue = seccionB[name]
    return (
      <Label name={name}>
        <input type={type} className='w-full py-1 rounded pl-2 outline-gray-300' name={name} defaultValue={defaultValue} autoFocus={autoFocus} />
      </Label>
    )
  }
  // const Select = ({ name, options }: { name: string, options: string[] }) => {
  //   const defaultValue = planificacion[name as keyof Planificacion] ?? options[0]
  //   return (
  //     <Label name={name}>
  //       <select className='col-span-3 w-full py-1 rounded pl-2 outline-gray-300' name={name} defaultValue={defaultValue}>
  //         {options.map((option, i) => <option className='capitalize' key={i}>{option}</option>)}
  //       </select>
  //     </Label>
  //   )
  // }
  // const Checkbox = ({ name, autoFocus = false }: { name: string, autoFocus?: boolean }) => {
  //   const defaultValue = planificacion[name as keyof Planificacion] === 1
  //   return (
  //     <Label name={name}>
  //       <input type='checkbox' className='py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultChecked={defaultValue} />
  //     </Label>
  //   )
  // }
  // const Date = ({ name }: { name: string }) => {
  //   const defaultValue = (planificacion[name as keyof Planificacion] as Planificacion['fec_ant_embarazo']).slice(0, 10)
  //   return (
  //     <Label name={name}>
  //       <input type='date' className='w-full py-1 rounded pl-2 outline-gray-300' name={name} defaultValue={defaultValue} />
  //     </Label>
  //   )
  // }

  return (
    <View id={params.searchParams.id} name={params.searchParams.name} Input={Input} />
  )
}

export default Page

function View ({ id, Input, name }: { id: string, Input: any, name: string }) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = JSON.stringify({ ...FormToBody(event) })
    console.log('🚀 ~ file: page.tsx:70 ~ handleSubmit ~ body:', body)

    const res = await fetch(`/api/seccionb/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    const response = await res.json()
    window.history.back()
    toast.success('Seccion B actualizada')
    console.log('🚀 ~ file: page.tsx:26 ~ handleSubmit ~ response:', response)
  }
  const handleDelete = async () => {
    const confirm = window.confirm('¿Está seguro de eliminar este tercero?')
    if (!confirm) return
    const res = await fetch(`/api/seccionb/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const response = await res.json()
    // router.push(`/list/${1}`)
    window.history.back()
    console.log('🚀 ~ file: page.tsx:56 ~ handleDelete ~ response:', response)
  }

  return (
    <>
      <header className='flex justify-around items-center'>
        <h2 className='text-xl font-semibold text-center'>{name}</h2>
        <h1 className='text-2xl font-semibold text-center'>Seccion B</h1>
      </header>
      <form onSubmit={handleSubmit} className='p-5'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mx-auto [&>div]:grid '>

          <FirstComponent Input={Input} />

          <footer className='grid gap-3 col-span-2 md:col-span-4 grid-cols-1 md:grid-cols-2'>
            <button
              className='bg-red-500 py-2 rounded hover:scale-105 hover:brightness-105 transition-all w-full' onClick={async () => await handleDelete()} type='button'
            >
              Eliminar
            </button>

            <button id='buttonCss' type='submit'>
              Guardar Cambios
            </button>
          </footer>
        </div>
      </form>
    </>
  )
}

const FormToBody = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  const body = Object.fromEntries(data.entries())
  // const message = data.get('message')?.toString() ?? ''
  // const motivo_consulta = data.get('motivo_consulta')?.toString() ?? ''
  return body
}
