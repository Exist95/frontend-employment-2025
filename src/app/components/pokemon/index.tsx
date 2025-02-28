'use client'
import { usePokemonData } from '@/hooks/pokemon';
import Image from 'next/image';
import React, { useState } from 'react'
import Input from '../shared/input';
import { useDarkModeStore } from '@/app/store/darkMode';
import { useQueryClient } from '@tanstack/react-query';

const PokemonPage = () => {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const { isDarkMode } = useDarkModeStore();
  const queryClient = useQueryClient()

  const { data, isLoading, isError, error, refetch } = usePokemonData(limit, offset)

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(e.target.value))
    queryClient.removeQueries({ queryKey: ['pokemon'] });
  }

  const handleOffsetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOffset(Number(e.target.value))
    queryClient.removeQueries({ queryKey: ['pokemon'] });
  }

  const handleSearchChange = () => {
    refetch();
  }

  //필터기능 추가?

  return (
    <div className='flex flex-col w-full my-4'>
      <div className='flex justify-center items-center gap-5 max-sm:flex-col'>
        <Input id='limit' label='limit' type='text' value={limit} onChange={handleLimitChange} />
        <Input id='offset' label='offset' type='text' value={offset} onChange={handleOffsetChange} />
        <button
          className={`w-12 h-12 rounded-lg text-white justify-center items-center ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-400'} transition duration-200`}
          onClick={handleSearchChange}>검색
        </button>
      </div>

      {isError && <p>오류 발생: {error instanceof Error ? error.message : 'Unknown error'}</p>}

      <div className='flex justify-center items-center'>
        {isLoading || limit === 0
          ?
          <p className='flex justify-center items-center mt-6 text-xl'>
            {limit === 0 ? 'limit을 입력해주세요...' : '포켓몬 리스트 로딩 중...'}
          </p>
          :
          <div className='grid grid-cols-4'>
            {data?.map((pokemon: any) => (
              <div key={pokemon.name}>
                <Image src={pokemon.image} alt='image' width={600} height={600} />
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