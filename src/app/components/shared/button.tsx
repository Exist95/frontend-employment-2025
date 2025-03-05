'use client'
import { useDarkModeStore } from '@/app/store/darkMode';
import Link from 'next/link';
import React from 'react'

interface ButtonProps {
  onClick?: () => void;
  size: 'sm' | 'md' | 'lg' | 'full';
  value: string;
  type?: 'button' | 'link';
  link?: string;
}

const sizeClass = {
  sm: 'w-4 h-4 text-sm',
  md: 'w-8 h-8 text-md',
  lg: 'w-12 h-12 text-lg',
  full: 'w-full h-16'
}

const Button = ({ onClick, size, value, type = 'button', link }: ButtonProps) => {
  const { isDarkMode } = useDarkModeStore();
  const buttonClass = `rounded-lg text-white flex items-center justify-center p-4
    ${isDarkMode ? 'bg-gray-600 hover:bg-gray-500' : 'bg-blue-500 hover:bg-blue-400'} 
    transition duration-200 ${sizeClass[size]}`;

  if (type === 'link' && link) {
    return (
      <Link href={link} className={buttonClass}>
        {value}
      </Link>
    );
  }

  return (
    <button className={buttonClass} onClick={onClick}>
      {value}
    </button>
  );
}

export default Button