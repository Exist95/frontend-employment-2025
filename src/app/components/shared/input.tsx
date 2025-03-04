'use client'
import React, { useState } from 'react'

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

  return (
    <div className="w-80 relative">
      <input
        id={id}
        className="border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600 w-full h-16 p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        type={type}
        value={value}
        min={min}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder=" "
      />
      {label && (
        <label
          htmlFor={id}
          className="absolute top-1 left-3 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200 ease-in-outpeer-placeholder-shown:top-7 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-3 peer-focus:text-sm peer-focus:text-blue-500"
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default Input