'use client'
import Button from '@/app/components/shared/button';
import Input from '@/app/components/shared/input'
import { ToastType, useToastStore } from '@/app/store/toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const SignInClient = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("")
  const { showToast } = useToastStore();
  const route = useRouter();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const isValidInput = (): boolean => {
    if (id.length < 1) {
      showToast('아이디를 입력해주세요.', 'error');
      return false;
    }
    if (password.length < 1) {
      showToast('비밀번호를 입력해주세요.', 'error');
      return false;
    }
    return true;
  };

  const getAdminAccounts = () => {
    const adminData = localStorage.getItem('admin');
    return adminData ? JSON.parse(adminData) : [];
  };

  const authenticateAdmin = (accounts: { id: string; password: string }[]) => {
    const admin = accounts.find(account => account.id === id && account.password === password);

    if (admin) {
      localStorage.setItem('currentId', admin.id)
      showToast('로그인 성공, 자동으로 이동합니다.', 'success');
      setTimeout(() => {
        route.replace('/')
      }, 1000);

    } else {
      showToast('아이디 또는 비밀번호가 틀렸습니다.', 'error');
    }
  };

  const handleLogin = () => {
    if (!isValidInput()) return;

    const adminAccounts = getAdminAccounts();

    if (adminAccounts) {
      authenticateAdmin(adminAccounts);
    } else {
      showToast('계정이 존재하지 않습니다.', 'error');
    }
  };

  //관리자 페이지에서 로그인 되어 있지 않아, 넘어온 경우 토스트 메시지 띄우기
  useEffect(() => {
    const message = sessionStorage.getItem('toastMessage');
    const type = sessionStorage.getItem('toastType');

    if (message && type) {
      showToast(message, type as ToastType);
      sessionStorage.removeItem('toastMessage');
      sessionStorage.removeItem('toastType');
    }
  }, []);

  return (
    <div className='flex flex-col justify-center items-center w-full my-4'>
      <div className='flex flex-col w-80 justify-center items-center gap-5'>
        <Input id='id' label='아이디' type='text' value={id} onChange={handleIdChange} />
        <Input id='password' label='비밀번호' type='password' value={password} onChange={handlePasswordChange} />
        <div className='flex justify-between w-full font-bold text-sm'>
          <div className='text-blue-500'>아이디가 없으신가요?</div>
          <Link href='/sign-up' className='text-gray-500'>회원가입</Link>
        </div>
        <Button size='full' value='로그인' onClick={handleLogin} />
      </div>
    </div>
  )
}

export default SignInClient