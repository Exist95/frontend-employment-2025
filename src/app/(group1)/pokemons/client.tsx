'use client'
import { usePokemonData } from '@/hooks/pokemon';
import Image from 'next/image';
import React, { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query';
import { useToastStore } from '@/app/store/toast';
import Input from '@/app/components/shared/input';
import Button from '@/app/components/shared/button';

const PokemonsClient = () => {
  const [limit, setLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const queryClient = useQueryClient()
  const { showToast } = useToastStore();

  const { data, isLoading, isError, error, refetch } = usePokemonData(limit, offset)

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      showToast('숫자만 입력할 수 있습니다.', 'error');
      return;
    }
    setLimit(Number(value))
    queryClient.removeQueries({ queryKey: ['pokemon'] });
  }

  const handleOffsetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      showToast('숫자만 입력할 수 있습니다.', 'error');
      return;
    }
    setOffset(Number(value));
    queryClient.removeQueries({ queryKey: ['pokemon'] });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (limit < 1) {
        showToast('limit을 1이상 입력해주세요.', 'error');
        return;
      }
      refetch();
    }
  }

  const handleSearchChange = () => {
    if (limit < 1) {
      showToast('limit을 1이상 입력해주세요.', 'error')
      return;
    }
    refetch();
  }

  return (
    <div className='flex flex-col justify-center items-center w-full my-4'>
      <div className='flex flex-col w-80 justify-center items-center gap-5'>
        <Input id='limit' label='limit' type='text' value={limit} onChange={handleLimitChange} onKeyDown={handleKeyDown} />
        <Input id='offset' label='offset' type='text' value={offset} onChange={handleOffsetChange} onKeyDown={handleKeyDown} />
        <Button size='full' value='검색' onClick={handleSearchChange}
        />
      </div>

      {isError && <p>오류 발생: {error instanceof Error ? error.message : 'Unknown error'}</p>}
      <div className='flex justify-center items-center'>
        {isLoading || limit === 0
          ?
          <p className='flex justify-center items-center mt-6 text-xl'>
            {limit === 0 ? 'limit을 입력해주세요' : '포켓몬 리스트 로딩 중...'}
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

export default PokemonsClient