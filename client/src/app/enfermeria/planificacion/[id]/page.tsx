'use client'
import type { FormEvent } from 'react'

const FormToBody = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault()
  const data = new FormData(event.currentTarget)
  const body = Object.fromEntries(data.entries())
  // const message = data.get('message')?.toString() ?? ''
  // const motivo_consulta = data.get('motivo_consulta')?.toString() ?? ''
  return body
}

function Pages ({ params: { id } }: { params: { id: string } }) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const body = JSON.stringify({ ...FormToBody(event), id_tercero: id })

    const res = await fetch(`/api/historias/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    const response = await res.json()
    console.log('🚀 ~ file: page.tsx:26 ~ handleSubmit ~ response:', response)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-2 gap-3 mx-auto [&>div]:grid'>
        <DynamicComponent />
        <FirstComponent />
        <SecondComponent />
        <ThirdComponent />

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

        <button id='buttonCss' className='w-full mt-2 col-span-2'>
          Agregar Historia
        </button>
      </div>
    </form>
  )
}

export default Pages

const TextArea = ({ name, autoFocus = false, required = false }: { name: string, type?: string, autoFocus?: boolean, required?: boolean }) => (
  <textarea className='py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultValue='a' required={required} />
)
const Input = ({ name, type = 'string', autoFocus = false }: { name: string, type?: string, autoFocus?: boolean }) => (
  <input type={type} className='w-full py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultValue={type === 'string' ? 'a' : 1} />
)

const DynamicComponent = () => {
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

      <hr className='col-span-2 p-5' />
    </>
  )
}

const FirstComponent = () => {
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
const SecondComponent = () => {
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
const ThirdComponent = () => {
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
