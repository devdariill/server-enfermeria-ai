'use client'

import { useIndex } from '@/context/IndexContext'
import type { HistoriaClinica } from '@/types'
import Link from 'next/link'
import { useEffect } from 'react'

import type { FormEvent, ReactNode } from 'react'
import { toast } from 'sonner'

export const dynamic = 'force-dynamic'

// let id_tercero = -1
function Page (params: any) {
  const { historia, getHistoria } = useIndex()
  const idHistoria = params.searchParams.id
  useEffect(() => {
    getHistoria({ id: idHistoria })
    // historia && (id_tercero = historia.id_tercero)
  }, [])
  if (!historia) return <div>Loading...</div>

  const TextArea = ({ name, autoFocus = false, required = false }: { name: string, type?: string, autoFocus?: boolean, required?: boolean }) => (
    <Label name={name}>
      <textarea className='py-1 w-full rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultValue={historia[name as keyof HistoriaClinica] ?? ''} required={required} />
    </Label>
  )
  const Input = ({ name, type = 'string', autoFocus = false }: { name: string, type?: string, autoFocus?: boolean }) => (
    <Label name={name}>
      <input type={type} className='w-full py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultValue={type === 'string' ? 'a' : 1} />
    </Label>
  )

  return (
    <View idHistoria={idHistoria} name={params.searchParams.name} TextArea={TextArea} Input={Input} />
  )
}

export default Page

function View ({ idHistoria, TextArea, Input, name }: { idHistoria: string, TextArea: any, Input: any, name: string }) {
  // const router = useRouter()
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = JSON.stringify({ ...FormToBody(event) })

    const res = await fetch(`/api/historias/${idHistoria}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    const response = await res.json()
    toast.success('Historia actualizada')
    console.log('🚀 ~ file: page.tsx:26 ~ handleSubmit ~ response:', response)
  }

  const handleDelete = async () => {
    const confirm = window.confirm('¿Está seguro de eliminar este tercero?')
    if (!confirm) return
    const res = await fetch(`/api/historias/${idHistoria}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const response = await res.json()
    // router.push(`/list/${1}`)
    if (response.message.includes('dependencies')) return toast.error('No se puede eliminar este tercero porque tiene dependencias')
    window.history.back()
  }
  return (
    <>
      <header className='flex items-center justify-around mb-5'>
        <h1 className='text-3xl font-semibold text-center capitalize'>{name.split('%').join(' ')}</h1>
        <h2 className='text-2xl font-semibold text-center capitalize'>Historia Clinica</h2>
        <Link href={`/planificacion/list/${idHistoria}?name=${name}`} id='buttonCss'>Planificaciones</Link>
      </header>
      <form onSubmit={handleSubmit} className='py-10'>
        <div className='grid grid-cols-2 gap-3 mx-auto [&>div]:grid'>
          <DynamicComponent Input={Input} />

          <FirstComponent TextArea={TextArea} />
          <SecondComponent TextArea={TextArea} />
          <ThirdComponent TextArea={TextArea} Input={Input} />

          <TextArea name='impresion_diagnostica' />
          <TextArea name='tratamiento' />
          <TextArea name='observaciones' />

          <hr className='col-span-2 p-5' />

          {/* <div>
          <label className='font-bold'>ID Tercero</label>
          <Input name='id_tercero' />
        </div>
        <div>
          <label className='font-bold'>Firma</label>
          <Input name='firma' />
        </div> */}
          <footer className='grid col-span-2 gap-3'>
            <button className='bg-red-500 py-2 rounded hover:scale-105 hover:brightness-105 transition-all' onClick={async () => await handleDelete()} type='button'>
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

const DynamicComponent = ({ Input }: { Input: any }) => {
  // programa, codigo, eps, acudiente
  return (
    <>
      <Input name='programa' autoFocus />
      <Input name='codigo' />
      <Input name='eps' />
      <Input name='acudiente' />
    </>
  )
}

const FirstComponent = ({ TextArea }: { TextArea: any }) => {
  return (
    <>
      <TextArea name='motivo_consulta' autoFocus required />
      <TextArea name='enfermedad_actual' />
      <TextArea name='antecedente_familiar' />
      <TextArea name='antecedente_personal' />
      <TextArea name='habitos' />
      <TextArea name='antecedentes_ginecologico' />

      <hr className='col-span-2 p-5' />
    </>
  )
}
const SecondComponent = ({ TextArea }: { TextArea: any }) => {
  return (
    <>
      <TextArea name='ta' />
      <TextArea name='fc' />
      <TextArea name='p' />
      <TextArea name='r' />
      <TextArea name='t' />

      <hr className='col-span-2 p-5' />
    </>
  )
}
const ThirdComponent = ({ TextArea, Input }: { TextArea: any, Input: any }) => {
  return (
    <>
      <Input name='peso' />
      <Input name='talla' />

      <TextArea name='piel_faneras' />
      <TextArea name='cabeza' />
      <TextArea name='ojos' />
      <TextArea name='nariz' />
      <TextArea name='oidos' />
      <TextArea name='boca' />
      <TextArea name='cuello' />
      <TextArea name='torax' />
      <TextArea name='corazon' />
      <TextArea name='pulmones' />
      <TextArea name='abdomen' />
      <TextArea name='extremidades' />
      <TextArea name='genitourinario' />
      <TextArea name='e_neurologico_elemental' />

      <hr className='col-span-2 p-5' />
    </>
  )
}

const Label = ({ name, children }: { name: string, children: ReactNode }) => (
  <label className='font-semibold capitalize text-center items-center flex flex-col justify-center'>{name.split('_').join(' ')}
    {children}
  </label>
)

// export interface HistoriaClinica {
//   motivo_consulta: string | null
//   enfermedad_actual: string | null

//   id: number
//   programa: string | null
//   codigo: string | null
//   eps: string | null

//   antecedente_familiar: string | null
//   antecedente_personal: string | null
//   habitos: string | null
//   antecedentes_ginecologico: string | null

//   ta: string | null
//   fc: string | null
//   p: string | null
//   r: string | null
//   t: string | null

//   peso: string | null
//   talla: string | null
//   piel_faneras: string | null
//   cabeza: string | null
//   ojos: string | null
//   nariz: string | null
//   oidos: string | null
//   boca: string | null
//   cuello: string | null
//   torax: string | null
//   corazon: string | null
//   pulmones: string | null
//   abdomen: string | null
//   extremidades: string | null
//   genitourinario: string | null
//   e_neurologico_elemental: string | null
//   impresion_diagnostica: string | null
//   tratamiento: string | null
//   id_tercero: number
//   firma: number
// }
