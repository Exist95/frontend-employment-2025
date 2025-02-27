'use client'
import React, { useEffect, useLayoutEffect, useState } from 'react'

const ThemeCounterButton = () => {
  const [count, setCount] = useState(0);

  useLayoutEffect(() => {
    const savedCount = localStorage.getItem('count');
    const savedDarkMode = localStorage.getItem('darkMode');

    if (savedCount) {
      setCount(Number(savedCount))
    }

    if (savedDarkMode === 'true') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [])

  useLayoutEffect(() => {
    const darkMode = count >= 5;
    localStorage.setItem('darkMode', darkMode.toString());

    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [count]);

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
      if (currentCount >= 0) {
        localStorage.setItem('count', currentCount.toString())
        return currentCount
      }
      return prevCount;
    });
  }

  return (
    <div>
      <button disabled={count < 1} onClick={handleDecrement}>-</button>
      <span>{count}</span>
      <button disabled={count > 9} onClick={handleIncrement}>+</button>
    </div>
  )
}

export default ThemeCounterButton