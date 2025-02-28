'use client'
import { useDarkModeStore } from '@/app/store/darkMode';
import { useToastStore } from '@/app/store/toast';
import React, { useEffect, useState } from 'react'
import Button from './button';

const ThemeCounterButton = () => {
  const [count, setCount] = useState(1);
  const { isDarkMode, setDarkMode } = useDarkModeStore();
  const { setMessage, setIsOn, setType } = useToastStore();

  //localStorage에 저장된 count값을 호출하여 useState 초기값으로 설정
  useEffect(() => {
    const savedCount = localStorage.getItem('count');
    if (savedCount) {
      setCount(Number(savedCount))
    }
  }, [])

  //count가 5 이상일 때, 다크모드 적용. 
  useEffect(() => {
    const darkMode = count >= 5;
    setDarkMode(darkMode);
  }, [count, setDarkMode]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const showToast = (message: string) => {
    setMessage(message);
    setType('error');
    setIsOn(true);
  };

  const handleIncrement = () => {
    if (count >= 10) {
      showToast('최댓값은 10입니다.');
      return;
    }
    setCount(count + 1);
    localStorage.setItem('count', (count + 1).toString());
  };

  const handleDecrement = () => {
    if (count <= 1) {
      showToast('최소값은 1입니다.');
      return;
    }
    setCount(count - 1);
    localStorage.setItem('count', (count - 1).toString());
  };

  return (
    <div className='fixed flex flex-col items-center justify-center gap-4 w-36 h-28 p-3 rounded-2xl  shadow-lg bg-gray-100 dark:bg-gray-900 top-24 right-2 max-sm:top-44'
    >
      <span>{count > 4 ? '다크모드' : '라이트모드'}</span>
      <span className="absolute top-0 left-0 inline-flex h-2 w-2 animate-ping rounded-full bg-sky-400 opacity-75"></span>
      <div className='flex items-center justify-between gap-2 w-full'>
        <Button size='md' onClick={handleDecrement} value='-' />
        <span className='text-md font-semibold'>{count}</span>
        <Button size='md' onClick={handleIncrement} value='+' />
      </div>


    </div>
  )
}

export default ThemeCounterButton