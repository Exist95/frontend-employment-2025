'use client'
import { usePokemonData } from '@/hooks/pokemon';
import Image from 'next/image';
import React, { useState } from 'react'

const PokemonPage = () => {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);

  const { data, isLoading, isError, error } = usePokemonData(limit, offset)

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(e.target.value))
  }

  const handleOffsetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffset(Number(e.target.value))
  }

  return (
    <div className='flex flex-col w-full mt-4'>

      <div className='flex justify-center items-center gap-5'>
        <div className='flex gap-2 items-center justify-center'>
          <label htmlFor='limit' className='text-xl'>limit:</label>
          <input className="p-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600" id='limit' value={limit} min={1} onChange={handleLimitChange} />
        </div>

        <div className='flex gap-2 items-center justify-center'>
          <label htmlFor='offset' className='text-xl'>offset:</label>
          <input className="p-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600" id='offset' value={offset} min={1} onChange={handleOffsetChange} />
        </div>
      </div>


      {isError && <p>오류 발생: {error instanceof Error ? error.message : 'Unknown error'}</p>}

      <div className='flex justify-center items-center'>
        {isLoading
          ?
          <p className='flex justify-center items-center mt-6 text-xl'>포켓몬 리스트 로딩 중...</p>
          :
          <div className='grid grid-cols-4'>
            {data?.map((pokemon: any) => (
              <div key={pokemon.name}>
                <Image src={pokemon.image} alt='image' width={600} height={800} />
                <p>{pokemon.name}</p>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}

export default PokemonPage