'use client'

import { useIndex } from '@/context/IndexContext'
import type { Planificacion } from '@/types'
import { useEffect } from 'react'

import type { FormEvent } from 'react'

// let id_tercero = -1
function Page (params: any) {
  const { planificacion, getPlanificacion } = useIndex()
  useEffect(() => {
    getPlanificacion({ id: params.searchParams.id })
  }, [])
  if (!planificacion) return <div>Loading...</div>

  const TextArea = ({ name, autoFocus = false, required = false }: { name: string, type?: string, autoFocus?: boolean, required?: boolean }) => {
    return (
      <div>
        <label className='font-bold capitalize'>{name}</label>
        <textarea className='py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultValue={planificacion[name as keyof Planificacion] ?? ''} required={required} />
      </div>
    )
  }
  const Input = ({ name, type = 'string', autoFocus = false }: { name: string, type?: string, autoFocus?: boolean }) => {
    return (
      <div>
        <label className='font-bold capitalize'>{name}</label>
        <input type={type} className='w-full py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultValue={type === 'string' ? 'a' : 1} />
      </div>
    )
  }
  // const Checkbox = ({ name, autoFocus = false }: { name: string, autoFocus?: boolean }) => {
  //   return (
  //     <div>
  //       <label className='font-bold capitalize'>{name}</label>
  //       <input type='checkbox' className='w-full py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} />
  //     </div>
  //   )
  // }

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
    // router.push(`/ai/${1}`)
    window.history.back()
    console.log('🚀 ~ file: page.tsx:56 ~ handleDelete ~ response:', response)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-2 gap-3 mx-auto [&>div]:grid'>

        <FirstComponent TextArea={TextArea} Input={Input} />
        <SecondComponent TextArea={TextArea} />
        <ThirdComponent TextArea={TextArea} Input={Input} />

        <TextArea name='impresion_diagnostica' />
        <TextArea name='tratamiento' />

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

const FirstComponent = ({ TextArea, Input }: { TextArea: any, Input: any }) => {
  return (
    <>
      <Input name='h_c' type='number' />
      <Input name='alfabeta' type='number' />

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

// export interface Planificacion {
//   id: number
//   id_tercero: number
//   fecha: string // Puedes usar el tipo Date si prefieres.

//   h_c: number

//   alfabeta: number
//   estudios: string
//   años_estudio: number
//   estado_civil: string
//   estado_ocu: string

//   af_diabetes: number
//   af_hipertension: number
//   af_ca_seno: number
//   af_ca_cervix: number
//   af_enf_cong: number
//   af_otros: string

//   ap_diabetes: number
//   ap_hipertension: number
//   ap_cancer: number
//   ap_ictericia: number
//   ap_infertil: number
//   ap_enf_cong: number
//   ap_otros: string

//   n_comp: number
//   enf_t_sex: number
//   cual: string

//   mes: number
//   año: number
//   neg: number
//   nic: number
//   nunca: number

//   gastac: number
//   ninguno: number
//   gemelar: number
//   mola: number
//   abortos: number
//   p_vag: number
//   cesarea: number
//   ectopica: number
//   esp: number
//   provoc: number
//   nac_vivos: number
//   nac_mtos: number
//   vive: number
//   mtps_primera_sem: number
//   fec_ant_embarazo: string // Puedes usar el tipo Date si prefieres.

//   grupo: string
//   rh1: string
//   rh2: string
//   sensible: number

//   fuma: number
//   cig_d: number

//   vdrl_mes: number
//   vdrl_año: number
//   negativo: number
//   positivo: number

//   aco: number
//   diu: number
//   inyectable: number
//   implante: number
//   um_ninguno: number
//   condon: number
//   ritmo: number
//   otras: number
//   vosec: number
//   tiempo: number

//   observaciones: string
// }
