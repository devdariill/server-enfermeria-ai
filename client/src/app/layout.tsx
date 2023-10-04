import { IndexProvider } from '@/context/IndexContext'
import { StatsProvider } from '@/context/statsContext'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Provider from './Provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'U.Mariana - Mejora la descripcion'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body className={inter.className + 'min-h-screen bg-[#e8e8e8] grid grid-rows-[160px,1fr] '}>
        <header className='py-10 bg-[#0f8ece] justify-center grid'>
          <h1 className='flex flex-col items-center justify-center text-lg'>
            <Link href='/'>
              <img src='/logo.png' alt='' />
            </Link>
            <strong className='font-semibold tracking-wider capitalize text-sm'> Summary for low complexity nursing records. </strong>
          </h1>
        </header>
        <main className='container mx-auto'>
          <hr className='mt-5' />
          <Provider>
            <IndexProvider>
              <StatsProvider>
                {children}
              </StatsProvider>
            </IndexProvider>
          </Provider>
        </main>
      </body>
    </html>
  )
}
