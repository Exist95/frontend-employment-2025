'use client'
import Button from '@/app/components/shared/button';
import Input from '@/app/components/shared/input'
import { ToastType, useToastStore } from '@/app/store/toast';
import React, { useEffect, useState } from 'react'

const SignInClient = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("")
  const { showToast } = useToastStore();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

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


  const handleLogin = () => {
    if (id.length < 1) {
      showToast('아이디를 입력해주세요.', 'error');
      return
    } else if (password.length < 1) {
      showToast('비밀번호를 입력해주세요.', 'error');
      return
    } else if (id) {
      // 로그인 되어 있는 경우, 로컬 스토리지 체크해서 맞으면 로그인, 아니면 에러 토스트
    }
  }

  return (
    <div className='flex flex-col justify-center items-center w-full my-4'>
      <div className='flex flex-col w-80 justify-center items-center gap-5'>
        <Input id='id' label='아이디' type='text' value={id} onChange={handleIdChange} />
        <Input id='password' label='비밀번호' type='password' value={password} onChange={handlePasswordChange} />
        <Button size='full' value='로그인' onClick={handleLogin}
        />
      </div>
    </div>
  )
}

export default SignInClient