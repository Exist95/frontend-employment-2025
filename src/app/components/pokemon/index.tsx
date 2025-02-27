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
    <div>
      <h1>포켓몬 리스트</h1>
      <div>
        <label htmlFor='limit'>limit:</label>
        <input className="p-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600" id='limit' value={limit} min={1} onChange={handleLimitChange} />
      </div>

      <div>
        <label htmlFor='offset'>offset:</label>
        <input className="p-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600" id='offset' value={offset} min={1} onChange={handleOffsetChange} />
      </div>

      {isLoading && <p>로딩 중...</p>}
      {isError && <p>오류 발생: {error instanceof Error ? error.message : 'Unknown error'}</p>}

      <div className='flex justify-center items-center'>
        <div className='grid grid-cols-4'>
          {data?.map((pokemon: any) => (
            <div key={pokemon.name}>
              <Image src={pokemon.image} alt='image' width={600} height={800} />
              <p>{pokemon.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PokemonPage