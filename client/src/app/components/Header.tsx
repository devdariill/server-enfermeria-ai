'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'

function Header () {
  const view = usePathname() === '/'

  return (
    <header className='w-full text-center gap-2 flex flex-col justify-center max-w-[100px] fixed left-5 bottom-5 z-10 '>
      <LinkC view={view} href='/'>Pacientes</LinkC>
      <LinkC view={!view} href='/charts'>Graficas</LinkC>
    </header>
  )
}

export default Header

const LinkC = ({ view, children, href }: { view: boolean, children: ReactNode, href: string }) => {
  return (
    <Link href={href} className={`${view ? 'bg-[#03045E]' : 'bg-[#48CAE4]'} px-4 py-2 rounded text-white flex-1`}>
      {children}
    </Link>
  )
}
