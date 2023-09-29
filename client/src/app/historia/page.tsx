'use client'

import { useIndex } from '@/context/IndexContext'
import type { HistoriaClinica } from '@/types'
import { useEffect } from 'react'

import type { FormEvent } from 'react'

// let id_tercero = -1
function Page (params: any) {
  const { historia, getHistoria } = useIndex()
  useEffect(() => {
    getHistoria({ id: params.searchParams.id })
    // historia && (id_tercero = historia.id_tercero)
  }, [])
  if (!historia) return <div>Loading...</div>

  const TextArea = ({ name, autoFocus = false, required = false }: { name: string, type?: string, autoFocus?: boolean, required?: boolean }) => (
    <textarea className='py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultValue={historia[name as keyof HistoriaClinica] ?? ''} required={required} />
  )
  const Input = ({ name, type = 'string', autoFocus = false }: { name: string, type?: string, autoFocus?: boolean }) => (
    <input type={type} className='w-full py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultValue={type === 'string' ? 'a' : 1} />
  )

  return (
    <View id={params.searchParams.id} TextArea={TextArea} Input={Input} />
  )
}

export default Page

function View ({ id, TextArea, Input }: { id: string, TextArea: any, Input: any }) {
  // const router = useRouter()
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = JSON.stringify({ ...FormToBody(event) })

    const res = await fetch(`/api/historias/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    const response = await res.json()
    console.log('🚀 ~ file: page.tsx:26 ~ handleSubmit ~ response:', response)
  }

  const handleDelete = async () => {
    const confirm = window.confirm('¿Está seguro de eliminar este tercero?')
    if (!confirm) return
    const res = await fetch(`/api/historias/${id}`, {
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
    <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-2 gap-3 mx-auto [&>div]:grid'>
        <DynamicComponent Input={Input} />

        <FirstComponent TextArea={TextArea} />
        <SecondComponent TextArea={TextArea} />
        <ThirdComponent TextArea={TextArea} Input={Input} />

        <div>
          <label className='font-bold'>Impresion Diagnostica</label>
          <TextArea name='impresion_diagnostica' />
        </div>
        <div>
          <label className='font-bold'>Tratamiento</label>
          <TextArea name='tratamiento' />
        </div>

        {/* <div>
          <label className='font-bold'>ID Tercero</label>
          <Input name='id_tercero' />
        </div>
        <div>
          <label className='font-bold'>Firma</label>
          <Input name='firma' />
        </div> */}

        <button className='bg-red-500 py-1 rounded hover:scale-105 hover:brightness-105 transition-all' onClick={async () => await handleDelete()} type='button'>
          Eliminar
        </button>

        <button id='buttonCss' type='submit'>
          Guardar Cambios
        </button>
      </div>
    </form>
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
      <div>
        <label className='font-bold'>Programa</label>
        <Input name='programa' autoFocus />
      </div>
      <div>
        <label className='font-bold'>Codigo</label>
        <Input name='codigo' />
      </div>
      <div>
        <label className='font-bold'>EPS</label>
        <Input name='eps' />
      </div>
      <div>
        <label className='font-bold'>Acudiente</label>
        <Input name='acudiente' />
      </div>
    </>
  )
}

const FirstComponent = ({ TextArea }: { TextArea: any }) => {
  return (
    <>
      <div>
        <label className='font-bold'>Motivo de Consulta</label>
        <TextArea name='motivo_consulta' autoFocus required />
      </div>
      <div>
        <label className='font-bold'>Enfermedad Actual</label>
        <TextArea name='enfermedad_actual' />
      </div>

      <div>
        <label className='font-bold'>Antecedente Familiar</label>
        <TextArea name='antecedente_familiar' />
      </div>
      <div>
        <label className='font-bold'>Antecedente Personal</label>
        <TextArea name='antecedente_personal' />
      </div>
      <div>
        <label className='font-bold'>Habitos</label>
        <TextArea name='habitos' />
      </div>
      <div>
        <label className='font-bold'>Antecedentes Ginecologicos</label>
        <TextArea name='antecedentes_ginecologico' />
      </div>

      <hr className='col-span-2 p-5' />
    </>
  )
}
const SecondComponent = ({ TextArea }: { TextArea: any }) => {
  return (
    <>
      <div>
        <label className='font-bold'>TA</label>
        <TextArea name='ta' />
      </div>
      <div>
        <label className='font-bold'>FC</label>
        <TextArea name='fc' />
      </div>
      <div>
        <label className='font-bold'>P</label>
        <TextArea name='p' />
      </div>
      <div>
        <label className='font-bold'>R</label>
        <TextArea name='r' />
      </div>
      <div>
        <label className='font-bold'>T</label>
        <TextArea name='t' />
      </div>

      <hr />
      <hr className='col-span-2 p-5' />
    </>
  )
}
const ThirdComponent = ({ TextArea, Input }: { TextArea: any, Input: any }) => {
  return (
    <>
      <div>
        <label className='font-bold'>Peso Kg</label>
        <Input name='peso' />
      </div>
      <div>
        <label className='font-bold'>Talla Cm</label>
        <Input name='talla' />
      </div>
      <div>
        <label className='font-bold'>Piel y Faneras</label>
        <TextArea name='piel_faneras' />
      </div>
      <div>
        <label className='font-bold'>Cabeza</label>
        <TextArea name='cabeza' />
      </div>
      <div>
        <label className='font-bold'>Ojos</label>
        <TextArea name='ojos' />
      </div>
      <div>
        <label className='font-bold'>Nariz</label>
        <TextArea name='nariz' />
      </div>
      <div>
        <label className='font-bold'>Oidos</label>
        <TextArea name='oidos' />
      </div>
      <div>
        <label className='font-bold'>Boca</label>
        <TextArea name='boca' />
      </div>
      <div>
        <label className='font-bold'>Cuello</label>
        <TextArea name='cuello' />
      </div>
      <div>
        <label className='font-bold'>Torax</label>
        <TextArea name='torax' />
      </div>
      <div>
        <label className='font-bold'>Corazon</label>
        <TextArea name='corazon' />
      </div>
      <div>
        <label className='font-bold'>Pulmones</label>
        <TextArea name='pulmones' />
      </div>
      <div>
        <label className='font-bold'>Abdomen</label>
        <TextArea name='abdomen' />
      </div>
      <div>
        <label className='font-bold'>Extremidades</label>
        <TextArea name='extremidades' />
      </div>
      <div>
        <label className='font-bold'>Genitourinario</label>
        <TextArea name='genitourinario' />
      </div>
      <div>
        <label className='font-bold'>E. Neurologico Elemental</label>
        <TextArea name='e_neurologico_elemental' />
      </div>

      <hr className='col-span-2 p-5' />
    </>
  )
}
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
