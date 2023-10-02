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
    console.log('🚀 ~ file: page.tsx:28 ~ handleSubmit ~ body:', body)
    // const res = await fetch(`/api/seccionb/${idPlanificacion}`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body
    // })
    // const response = await res.json()
    // console.log('🚀 ~ file: page.tsx:26 ~ handleSubmit ~ response:', response)
  }
  return (
    <>
      <header className='flex items-center justify-around'>
        <h1 className='text-2xl font-medium tracking-tight text-black sm:text-4xl'>
          {props?.searchParams?.name.split('%').join(' ')}
        </h1>
        <h2 className='text-2xl tracking-tight text-black/80'>
          Planificacion
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
const Checkbox = ({ name, autoFocus = false }: { name: string, autoFocus?: boolean }) => (
  <Label name={name}>
    <input type='checkbox' className='py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} />
  </Label>
)
const Select = ({ name, options, autoFocus = false }: { name: string, options: string[], autoFocus?: boolean }) => (
  <Label name={name}>
    <select className='col-span-3 w-full py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus}>
      {options.map((option, i) => <option className='capitalize' key={i}>{option}</option>)}
    </select>
  </Label>
)
const Hr = () => (
  <hr className='col-span-4 p-1 bg-black/20 rounded-full' />
)

const FirstComponent = () => {
  return (
    <>
      {/* <Input name='h_c' type='number' autoFocus /> */}
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
      <Label name='fec_ant_embarazo'>
        <input type='date' className='w-full py-1 rounded pl-2 outline-gray-300' name='fec_ant_embarazo' />
      </Label>

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
