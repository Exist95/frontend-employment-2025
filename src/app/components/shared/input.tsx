'use client'
import React, { useState } from 'react'

interface InputProps {
  id: string;
  label: string;
  value: number | string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  min?: number;
  type: string;
}

const Input = ({ id, label, value, onChange, onKeyDown, type, min = 1 }: InputProps) => {

  return (
    <div className="flex gap-2 items-center justify-center">
      <label htmlFor={id} className="text-xl">{label}:</label>
      <input
        id={id}
        className="p-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white dark:border-gray-600"
        type={type}
        value={value}
        min={min}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}

export default Input