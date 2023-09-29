'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// id: number
// id_nacional: number
// nombres: string
// apellidos: string
// fecha_nacimiento: string
// estado_civil: string
// genero: string
// procedencia: string
// residencia: string
// fecha_ingreso: string
// celular: number
function Pages () {
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // const message = data.get('message')?.toString() ?? ''
    const nombres = data.get('nombres')?.toString() ?? ''
    const apellidos = data.get('apellidos')?.toString() ?? ''
    const fecha_nacimiento = data.get('fecha_nacimiento')?.toString() ?? ''
    const estado_civil = data.get('estado_civil')?.toString() ?? ''
    const genero = data.get('genero')?.toString() ?? ''
    const procedencia = data.get('procedencia')?.toString() ?? ''
    const residencia = data.get('residencia')?.toString() ?? ''
    const celular = data.get('celular')?.toString() ?? ''
    const id_nacional = data.get('id_nacional')?.toString() ?? ''
    if (!nombres || !apellidos || !fecha_nacimiento || !estado_civil || !genero || !procedencia || !residencia || !celular || !id_nacional) {
      return window.alert('Rellenar todos los campos')
    }
    const body = JSON.stringify({
      nombres,
      apellidos,
      fecha_nacimiento,
      estado_civil,
      genero,
      procedencia,
      residencia,
      celular,
      id_nacional
    })

    const res = await fetch('/api/terceros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
    const response = await res.json()
    if (response?.error) return toast.error(response.error)
    router.push('/tercero')
    toast.success('Tercero creado')
    console.log('🚀 ~ file: page.tsx:50 ~ handleSubmit ~ response:', response)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-2 gap-3 max-w-sm mx-auto [&>input]:'>
        <div>
          <label className='font-bold'>Nombres</label>
          <Input name='nombres' autoFocus />
        </div>
        <div>
          <label className='font-bold'>Apellidos</label>
          <Input name='apellidos' />
        </div>
        <div>
          <label className='font-bold'>Fecha de Nacimiento</label>
          <input type='date' className='w-full py-1 text-center rounded' name='fecha_nacimiento' />
        </div>
        <div>
          <label className='font-bold'>Estado Civil</label>
          <Input name='estado_civil' />
        </div>
        <div>
          <label className='font-bold'>Género</label>
          <Input name='genero' />
        </div>
        <div>
          <label className='font-bold'>Procedencia</label>
          <Input name='procedencia' />
        </div>
        <div>
          <label className='font-bold'>Residencia</label>
          <Input name='residencia' />
        </div>
        <div>
          <label className='font-bold'>Celular</label>
          <Input type='number' name='celular' />
        </div>
        <div>
          <label className='font-bold'>ID Nacional</label>
          <Input type='number' name='id_nacional' />
        </div>
        <button id='buttonCss' className='w-full mt-2' type='submit'>
          Crear Tercero
        </button>
      </div>
    </form>
  )
}

export default Pages

const Input = ({ name, type = 'string', autoFocus = false }: { name: string, type?: string, autoFocus?: boolean }) => (
  <input type={type} className='py-1 rounded pl-2 outline-gray-300' name={name} autoFocus={autoFocus} defaultValue={type === 'string' ? 'a' : 1} />
)
