import Link from 'next/link'
import type { ReactNode } from 'react'

export function ButtonLink ({
  children,
  href,
  className
}: {
  children: ReactNode
  href: string
  className?: boolean
}) {
  return (
    <Link href={href} id='buttonCss' className={`${className ? 'block' : ''} hover:scale-y-105`}>
      {children}
    </Link>
  )
}
