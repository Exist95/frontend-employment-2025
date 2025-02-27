'use client'
import { useDarkModeStore } from '@/app/store/darkMode';
import { useToastStore } from '@/app/store/toast';
import React, { useEffect, useState } from 'react'
import Toast from '../toast/toast';

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

  const handleIncrement = () => {
    setCount((prevCount) => {
      const currentCount = prevCount + 1;
      if (currentCount <= 10) {
        localStorage.setItem('count', currentCount.toString())
        return currentCount
      } else {
        setMessage('최댓값은 10입니다.');
        setType('error');
        setIsOn(true);
      }
      return prevCount;
    });
  }

  const handleDecrement = () => {
    setCount((prevCount) => {
      const currentCount = prevCount - 1;
      if (currentCount > 0) {
        localStorage.setItem('count', currentCount.toString())
        return currentCount
      } else {
        setMessage('최소값은 1입니다.');
        setType('error');
        setIsOn(true);
        return prevCount;
      }
    });
  }

  return (
    <div className='flex items-center justify-center gap-4' draggable>
      <button
        className={`w-12 h-12 rounded-lg text-white justify-center items-center ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-400'} transition duration-200`}
        onClick={handleDecrement}>-</button>
      <span className='text-2xl'>{count}</span>
      <button
        className={`w-12 h-12 rounded-lg text-white justify-center items-center ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-400'} transition duration-200`}
        onClick={handleIncrement}>+</button>
    </div>
  )
}

export default ThemeCounterButton