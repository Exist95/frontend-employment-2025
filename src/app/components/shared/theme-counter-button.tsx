'use client'
import { useDarkModeStore } from '@/app/store/darkMode';
import { useToastStore } from '@/app/store/toast';
import React, { useEffect, useState } from 'react'

const ThemeCounterButton = () => {
  const [count, setCount] = useState(1);
  const { isDarkMode, setDarkMode } = useDarkModeStore();

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
        return prevCount;
      }
    });
  }

  return (
    <div>
      <button onClick={handleDecrement}>-</button>
      <span>{count}</span>
      <button onClick={handleIncrement}>+</button>
    </div>
  )
}

export default ThemeCounterButton