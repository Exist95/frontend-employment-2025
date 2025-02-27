'use client'
import { useToastStore } from '@/app/store/toast';
import React, { useEffect } from 'react'

const Toast = () => {
  const { message, type, resetToast, isOn, setIsOn } = useToastStore();

  useEffect(() => {
    if (isOn) {
      const timer = setTimeout(() => {
        setIsOn(false)
        resetToast();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isOn, resetToast, setIsOn]);

  if (!isOn) return null;

  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 rounded-lg transition-all duration-500 ease-in-out w-fit ${isOn
        ? "opacity-100 translate-y-0"
        : "opacity-0 translate-y-full pointer-events-none"
        } ${type === "error" ? "bg-red-500" : "bg-blue-500"} `}
    >
      <div className="text-white">{message}</div>
    </div>
  )
}

export default Toast