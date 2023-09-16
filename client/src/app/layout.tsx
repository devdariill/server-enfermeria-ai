import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'InfoJobs - Mejora la descripcion',
  description: 'Herramienta para mejorar la descripcion de las ofertas de InfoJobs'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body className={inter.className + 'min-h-screen bg-[#e8e8e8]'}>
        <header className='py-10 bg-[#0f8ece] justify-center grid'>
          <h1 className='flex flex-col items-center justify-center text-lg'>
            <Link href='/'>
              <img src='/logo.png' alt='' />
            </Link>
            <strong className='font-semibold tracking-wider capitalize text-sm'> Summary for low complexity nursing records. </strong>
          </h1>
        </header>
        {children}
      </body>
    </html>
  )
}
