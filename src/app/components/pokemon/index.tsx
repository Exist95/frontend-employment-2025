'use client'
import { usePokemonData } from '@/hooks/pokemon';
import Image from 'next/image';
import React, { useState } from 'react'
import Input from '../shared/input';

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

  //검색 버튼 생성 후, 검색버튼을 누르면 리스트가 나오게 만드는 건 어떨까?

  return (
    <div className='flex flex-col w-full mt-4'>
      <div className='flex justify-center items-center gap-5'>
        <Input id='limit' label='limit' type='text' value={limit} onChange={handleLimitChange} />
        <Input id='offset' label='offset' type='text' value={offset} onChange={handleOffsetChange} />
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