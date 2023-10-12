'use client'
import { useIndex } from '@/context/IndexContext'
import { useEffect, type FormEvent, type ReactNode } from 'react'
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

function Pages ({ params: { id }, searchParams: { name } }: { params: { id: string }, searchParams: { name: string } }) {
  const idHistoria = id
  const { getHistoria, historia } = useIndex()
  useEffect(() => {
    getHistoria({ id: idHistoria })
  }, [])
  if (!historia) return <div>Loading...</div>

  // function Pages ({ params, searchParams }: any) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const confirm = window.confirm('¿Estas seguro de agregar esta historia?')
    if (!confirm) return
    const body = JSON.stringify({ ...FormToBody(event), id_historia: idHistoria })
    console.log('🚀 ~ file: page.tsx:27 ~ handleSubmit ~ body:', body)

    const res = await fetch(`/api/planificaciones/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    const response = await res.json()
    toast.success('Planificacion agregada')
    window.history.back()
    console.log('🚀 ~ file: page.tsx:26 ~ handleSubmit ~ response:', response)
  }
  return (
    <>
      <header className='flex items-center justify-around'>
        <h1 className='text-2xl font-medium tracking-tight text-black sm:text-4xl'>
          {name}
        </h1>
        <h2 className='text-2xl tracking-tight text-black/80'>
          Planificacion
        </h2>
      </header>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-4 gap-3 mx-auto p-5'>

          <FirstComponent Checkbox={Checkbox} Select={Select} Input={Input} Label={Label} />

          <button id='buttonCss' className='w-full mt-2 col-span-4' type='submit'>
            Agregar Planificacion
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
// const Hr = () => (
//   <hr className='col-span-4 p-1 bg-black/20 rounded-full' />
// )

// export interface Planificacion {
//   id: number
//   id_tercero: number
//   fecha: string // Puedes usar el tipo Date si prefieres.

//   h_c: number

//   alfabeta: number
//   estudios: string
//   anos_estudio: number
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
//   ano: number
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
//   rh: string
//   sensible: number

//   fuma: number
//   cig_d: number

//   vdrl_mes: number
//   vdrl_ano: number
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
