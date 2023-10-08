export const Hr = ({ title = '', widthSm = false }: { title?: string, widthSm?: boolean }) => {
  const width = widthSm ? 'col-span-2 md:col-span-4' : 'col-span-4'
  return (
    <div className={`relative ${width} py-2`}>
      <hr className='h-[2px] bg-gradient-to-r from-transparent via-neutral-500 to-transparent border-none' />
      <h2 className='absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 px-2 bg-[#e8e8e8]'>{title}</h2>
    </div>
  )
}
