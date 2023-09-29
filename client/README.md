function Page (params: { params: any, searchParams: any }) {
  console.log('🚀 ~ file: page.tsx:3 ~ Page ~ params:', params) // server-client 
  ...}

import { useRouter } from 'next/navigation'
  router.push(`/list/${item.patient_id}`)

import { usePathname } from 'next/navigation'
  const path = usePathname()

import { useSearchParams } from 'next/navigation'
  const searchParams = useSearchParams()
  const name = searchParams.get('name')?.toString().split('%').join(' ') ?? ''

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

