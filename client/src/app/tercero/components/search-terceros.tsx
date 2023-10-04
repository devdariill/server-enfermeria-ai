'use client'
import { useIndex } from '@/context/IndexContext'
import type { FormEvent } from 'react'

export const SearchTerceros = () => {
  const { getTercerosByValue } = useIndex()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const search = data.get('search')?.toString().toLowerCase() ?? ''
    if (search.length > 0) {
      await getTercerosByValue({ search })
      console.log('🚀 ~ file: listOfPeople.tsx:34 ~ ListOfPeople ~ search', search)
    }
  }
  return (
    <form action='' className='w-full flex' onSubmit={handleSubmit}>
      <label className='flex w-full'>
        <img src='/search.svg' className='h-5 w-10 my-auto' alt='' />
        <input
          type='search'
          name='search'
          className='ml-2 bg-white w-full border outline-0 rounded-l-md pl-3 py-2'
          placeholder='Search'
        />
        <button className='bg-gray-300 px-2 rounded-r-md' type='submit'>Filter</button>
      </label>
    </form>

  )
}
