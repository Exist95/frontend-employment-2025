'use client'
import { useToastStore } from '@/app/store/toast';
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AdminClient = () => {
  const route = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      sessionStorage.setItem('toastMessage', '로그인이 필요합니다.');
      sessionStorage.setItem('toastType', 'error');
      route.push('/sign-in');
    }
  }, [])

  return (
    <div>AdminClient</div>
  )
}

export default AdminClient