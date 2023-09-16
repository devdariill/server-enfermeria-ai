import Link from 'next/link'

export default async function Home () {
  return (
    <main className='mx-auto px-4 gap-5 grid py-10'>
      <Link href='/ai' className='block w-full py-5 bg-white/50 rounded-lg shadow-black shadow-lg hover:shadow-xl transition duration-300 ease-in-out'>
        <div className='flex flex-col justify-center items-center h-full'>
          <h1 className='text-4xl font-bold text-gray-800'>AI</h1>
          <p className='text-xl font-semibold text-gray-600'>Artificial Intelligence</p>
        </div>

      </Link>
      <Link href='/enfermeria' className='block w-full py-5 bg-white/50 rounded-lg shadow-black shadow-lg hover:shadow-xl transition duration-300 ease-in-out'>
        <div className='flex flex-col justify-center items-center h-full'>
          <h1 className='text-4xl font-bold text-gray-800'>App</h1>
          <p className='text-xl font-semibold text-gray-600'>Manejo de Datos</p>
        </div>

      </Link>
    </main>
  )
}
