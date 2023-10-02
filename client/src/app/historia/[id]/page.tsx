'use client'
import type { FormEvent, ReactNode } from 'react'
import { toast } from 'sonner'

const FormToBody = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  const body = Object.fromEntries(data.entries())
  // const message = data.get('message')?.toString() ?? ''
  // const motivo_consulta = data.get('motivo_consulta')?.toString() ?? ''
  return body
}

function Pages ({ params: { id }, searchParams }: { params: { id: string }, searchParams: { name: string } }) {
  const idTercero = id
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const confirm = window.confirm('¿Estas seguro de agregar esta historia?')
    if (!confirm) return
    const body = JSON.stringify({ ...FormToBody(event), id_tercero: idTercero })

    const res = await fetch(`/api/historias/${idTercero}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    const response = await res.json()
    window.history.back()
    toast.success('Historia agregada')
    console.log('🚀 ~ file: page.tsx:26 ~ handleSubmit ~ response:', response)
  }
  return (
    <>
      <header className='flex items-center mb-5'>
        <h1 className='text-3xl font-semibold text-center capitalize mr-auto'>{searchParams.name.split('%').join(' ')}</h1>
        <h2 className='text-2xl font-semibold text-center capitalize'>Historia Clinica</h2>
      </header>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-3 mx-auto [&>div]:grid'>
          <DynamicComponent />
          <FirstComponent />
          <SecondComponent />
          <ThirdComponent />

          <TextArea name='impresion_diagnostica' />
          <TextArea name='tratamiento' />

          {/* <div>
          <label className='font-bold'>ID Tercero</label>
          <Input name='id_tercero' />
          </div>
          <div>
          <label className='font-bold'>Firma</label>
          <Input name='firma' />
        </div> */}

          <button id='buttonCss' className='w-full mt-2 col-span-2' type='submit'>
            Agregar Historia
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
const TextArea = ({ name, autoFocus = false, required = false }: { name: string, type?: string, autoFocus?: boolean, required?: boolean }) => (
  <Label name={name}>
    <textarea className='py-1 rounded pl-2 outline-gray-300 w-full' name={name} autoFocus={autoFocus} defaultValue='a' required={required} />
  </Label>
)
const Input = ({ name, type = 'string', autoFocus = false }: { name: string, type?: string, autoFocus?: boolean }) => (
  <Label name={name}>
    <input type={type} className='w-full py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultValue={type === 'string' ? 'a' : 1} />
  </Label>
)

const DynamicComponent = () => {
  // programa, codigo, eps, acudiente
  return (
    <>
      <Input name='programa' autoFocus />
      <Input name='codigo' />
      <Input name='eps' />
      <Input name='acudiente' />

      <hr className='col-span-2 p-5' />
    </>
  )
}

const FirstComponent = () => {
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
const SecondComponent = () => {
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
const ThirdComponent = () => {
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
