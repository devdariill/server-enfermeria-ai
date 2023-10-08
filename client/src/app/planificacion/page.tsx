'use client'

import { useIndex } from '@/context/IndexContext'
import type { Planificacion } from '@/types'
import Link from 'next/link'
import { useEffect } from 'react'

import type { ReactNode } from 'react'
import { toast } from 'sonner'
import { FirstComponent } from './components/FirstComponent'

export const dynamic = 'force-dynamic'

function Page (params: any) {
  const idPlanificacion = params.searchParams.id
  const { planificacion, getPlanificacion } = useIndex()
  useEffect(() => {
    getPlanificacion({ id: idPlanificacion })
  }, [])
  if (!planificacion) return <div>Loading...</div>

  const Input = ({ name, type = 'string' }: { name: string, type?: string }) => {
    const center = type === 'number' ? 'text-center' : ''
    return (
      <Label name={name}>
        <input disabled type={type} className={`${center} w-full -mt-1 py-1 rounded pl-2 outline-gray-300`} name={name} defaultValue={planificacion[name as keyof Planificacion] ?? ''} />
      </Label>
    )
  }
  const Select = ({ name, options }: { name: string, options: string[] }) => {
    const defaultValue = planificacion[name as keyof Planificacion] ?? options[0]
    return (
      <Label name={name}>
        <select disabled className='col-span-3 w-full py-1 rounded pl-2 outline-gray-300' name={name} defaultValue={defaultValue}>
          {options.map((option, i) => <option className='capitalize' key={i}>{option}</option>)}
        </select>
      </Label>
    )
  }
  const Checkbox = ({ name, autoFocus = false }: { name: string, autoFocus?: boolean }) => {
    const defaultValue = planificacion[name as keyof Planificacion] === 1
    return (
      <Label name={name}>
        <input disabled type='checkbox' className='py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultChecked={defaultValue} />
      </Label>
    )
  }
  const Date = ({ name }: { name: string }) => {
    const defaultValue = (planificacion[name as keyof Planificacion] as Planificacion['fec_ant_embarazo']).slice(0, 10)
    return (
      <Label name={name}>
        <input disabled type='date' className='w-full py-1 rounded pl-2 outline-gray-300' name={name} defaultValue={defaultValue} />
      </Label>
    )
  }

  return (
    <View idPlanificacion={idPlanificacion} name={params.searchParams.name} Select={Select} Input={Input} Checkbox={Checkbox} Date={Date} />
  )
}

export default Page

function View ({ idPlanificacion, Select, Input, Checkbox, Date, name }: { idPlanificacion: string, Select: any, Input: any, Checkbox: any, Date: any, name: string }) {
  const handleDelete = async () => {
    const confirm = window.confirm('¿Está seguro de eliminar este tercero?')
    if (!confirm) return
    const res = await fetch(`/api/planificaciones/${idPlanificacion}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const response = await res.json()
    // router.push(`/list/${1}`)
    if (response.DBPlanificacion.includes('dependencies')) return toast.error('No se puede eliminar esta planificacion porque tiene dependencias')

    window.history.back()
  }

  return (
    <>
      <header className='flex justify-around items-center'>
        <h1 className='text-2xl font-semibold text-center'>{name}</h1>
        <h2 className='text-xl font-semibold text-center'>Planificación</h2>
        <Link id='buttonCss' href={`/seccionb/list/${idPlanificacion}?name=${name}`}> Seccion B </Link>
      </header>
      <form onSubmit={() => console.log('enviado')} className='p-5'>
        <div className='grid grid-cols-4 gap-3 mx-auto [&>div]:grid '>

          <FirstComponent Select={Select} Input={Input} Checkbox={Checkbox} Date={Date} />

          <button className='bg-red-500 py-2 rounded hover:scale-105 hover:brightness-105 transition-all col-span-4' onClick={async () => await handleDelete()} type='button'>
            Eliminar
          </button>

        </div>
      </form>
    </>
  )
}

const Label = ({ name, children }: { name: string, children: ReactNode }) => (
  <label className='font-semibold capitalize text-center items-center flex flex-col justify-center'>{name.split('_').join(' ')}
    {children}
  </label>
)
