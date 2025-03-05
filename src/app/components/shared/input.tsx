'use client'
import React, { useState } from 'react'
import { MdCancel, MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface InputProps {
  id: string;
  label?: string;
  value: number | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  min?: number;
  type: string;
}

const Input = ({ id, label, value, onChange, onKeyDown, type, min = 1 }: InputProps) => {
  const [isVisibility, setIsVisibility] = useState(false);

  const handleVisibility = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsVisibility(!isVisibility);
  }

  const handleClear = () => {
    onChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="w-80 relative">

      {label && (
        <label
          htmlFor={id}
          className="absolute top-1 left-3 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200 ease-in-outpeer-placeholder-shown:top-7 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-sm peer-focus:text-blue-500"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className="border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 w-full h-16 pl-3 pr-16 pt-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type={type === 'password' ? (isVisibility ? 'text' : 'password') : type}
        value={value}
        min={min}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder=" "
      />
      <div className='absolute top-1/2 right-3 -translate-y-1/2 gap-4'>
        {value !== '' && (
          <MdCancel className='cursor-pointer' onClick={handleClear} />
        )}

        {type === 'password' && value !== '' && (
          <div className='absolute top-1/2 -translate-y-1/2 right-8 cursor-pointer'
            onClick={handleVisibility}>
            {isVisibility ? <MdVisibility /> : <MdVisibilityOff />}
          </div>
        )}
      </div>
    </div>
  )
}

export default Input