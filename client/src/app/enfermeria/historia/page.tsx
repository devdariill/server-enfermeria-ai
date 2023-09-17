import TercerosList from '@/app/enfermeria/tercero/components/terceros-list'

function Page () {
  return (
    <div>
      {/* get the route /enfermeria/tercero to show it in a iframe */}
      {/* <iframe src='/enfermeria/tercero' /> */}
      <TercerosList />
    </div>
  )
}

export default Page
