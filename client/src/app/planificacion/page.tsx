'use client'

import { useIndex } from '@/context/IndexContext'
import type { Planificacion } from '@/types'
import Link from 'next/link'
import { useEffect } from 'react'

import type { FormEvent, ReactNode } from 'react'
import { toast } from 'sonner'

// let id_tercero = -1
function Page (params: any) {
  const idPlanificacion = params.searchParams.id
  const { planificacion, getPlanificacion } = useIndex()
  useEffect(() => {
    getPlanificacion({ id: idPlanificacion })
  }, [])
  if (!planificacion) return <div>Loading...</div>

  const Input = ({ name, type = 'string' }: { name: string, type?: string }) => {
    return (
      <Label name={name}>
        <input type={type} className='w-full py-1 rounded pl-2 outline-gray-300' name={name} defaultValue={planificacion[name as keyof Planificacion] ?? ''} />
      </Label>
    )
  }
  const Select = ({ name, options }: { name: string, options: string[] }) => {
    const defaultValue = planificacion[name as keyof Planificacion] ?? options[0]
    return (
      <Label name={name}>
        <select className='col-span-3 w-full py-1 rounded pl-2 outline-gray-300' name={name} defaultValue={defaultValue}>
          {options.map((option, i) => <option className='capitalize' key={i}>{option}</option>)}
        </select>
      </Label>
    )
  }
  const Checkbox = ({ name, autoFocus = false }: { name: string, autoFocus?: boolean }) => {
    const defaultValue = planificacion[name as keyof Planificacion] === 1
    return (
      <Label name={name}>
        <input type='checkbox' className='py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultChecked={defaultValue} />
      </Label>
    )
  }
  const Date = ({ name }: { name: string }) => {
    const defaultValue = (planificacion[name as keyof Planificacion] as Planificacion['fec_ant_embarazo']).slice(0, 10)
    return (
      <Label name={name}>
        <input type='date' className='w-full py-1 rounded pl-2 outline-gray-300' name={name} defaultValue={defaultValue} />
      </Label>
    )
  }

  return (
    <View idPlanificacion={idPlanificacion} name={params.searchParams.name} Select={Select} Input={Input} Checkbox={Checkbox} Date={Date} />
  )
}

export default Page

function View ({ idPlanificacion, Select, Input, Checkbox, Date, name }: { idPlanificacion: string, Select: any, Input: any, Checkbox: any, Date: any, name: string }) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = JSON.stringify({ ...FormToBody(event) })
    console.log('🚀 ~ file: page.tsx:70 ~ handleSubmit ~ body:', body)
  }
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
    if (response.DBPlanificacion.includes('dependencies')) return toast.error('No se puede eliminar este tercero porque tiene dependencias')

    window.history.back()
  }

  return (
    <>
      <header className='flex justify-around items-center'>
        <h1 className='text-2xl font-semibold text-center'>{name}</h1>
        <h2 className='text-xl font-semibold text-center'>Planificación</h2>
        <Link id='buttonCss' href={`/seccionb/list/${idPlanificacion}?name=${name}`}> Seccion B </Link>
      </header>
      <form onSubmit={handleSubmit} className='p-5'>
        <div className='grid grid-cols-2  md:grid-cols-4 gap-3 mx-auto [&>div]:grid '>

          <FirstComponent Select={Select} Input={Input} Checkbox={Checkbox} Date={Date} />

          <button className='bg-red-500 py-1 rounded hover:scale-105 hover:brightness-105 transition-all col-span-2' onClick={async () => await handleDelete()} type='button'>
            Eliminar
          </button>

          <button id='buttonCss' type='submit' className='col-span-2'>
            Guardar Cambios
          </button>
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

const Label = ({ name, children }: { name: string, children: ReactNode }) => (
  <label className='font-semibold capitalize text-center items-center flex flex-col justify-center'>{name.split('_').join(' ')}
    {children}
  </label>
)
const FirstComponent = ({ Select, Input, Checkbox, Date }: { Select: any, Input: any, Checkbox: any, Date: any }) => {
  const Hr = () => (
    <hr className='col-span-2 md:col-span-4 p-1 bg-black/20 rounded-full' />
  )

  return (
    <>
      <Checkbox name='alfabeta' autoFocus />
      <Select name='estudios' options={['ning', 'prim', 'sec', 'univ']} />
      <Input name='años_estudio' type='number' />
      <Select name='estado_civil' options={['sol', 'cas', 'ul', 'otra']} />
      <Select name='estado_ocu' options={['estud', 'trab']} />

      <Hr />

      <Checkbox name='af_diabetes' />
      <Checkbox name='af_hipertension' />
      <Checkbox name='af_ca_seno' />
      <Checkbox name='af_ca_cervix' />
      <Checkbox name='af_enf_cong' />
      <Input name='af_otros' />

      <Hr />

      <Checkbox name='ap_diabetes' />
      <Checkbox name='ap_hipertension' />
      <Checkbox name='ap_cancer' />
      <Checkbox name='ap_ictericia' />
      <Checkbox name='ap_infertil' />
      <Checkbox name='ap_enf_cong' />
      <Input name='ap_otros' />

      <Hr />

      <Input name='n_comp' type='number' />
      <Checkbox name='enf_t_sex' />
      <Input name='cual' />

      <Hr />

      <Input name='mes' type='number' />
      <Input name='año' type='number' />
      <Checkbox name='neg' />
      <Checkbox name='nic' />
      <Checkbox name='nunca' />

      <Hr />

      <Input name='gastac' type='number' />
      <Checkbox name='ninguno' />
      <Input name='gemelar' type='number' />
      <Input name='mola' type='number' />

      <Hr />

      <Input name='abortos' type='number' />
      <Input name='p_vag' type='number' />
      <Input name='cesarea' type='number' />
      <Input name='ectopica' type='number' />
      <Input name='esp' type='number' />
      <Input name='provoc' type='number' />
      <Input name='nac_vivos' type='number' />
      <Input name='nac_mtos' type='number' />
      <Input name='vive' type='number' />
      <Input name='mtos_primer_sem' type='number' />
      {/* <Input name='fec_ant_embarazo' /> */}
      <Date name='fec_ant_embarazo' />

      <Hr />
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
