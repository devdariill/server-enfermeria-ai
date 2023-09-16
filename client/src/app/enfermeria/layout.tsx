
export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className='container mx-auto p-10 md:px-0'>
      {children}
    </main>

  )
}
