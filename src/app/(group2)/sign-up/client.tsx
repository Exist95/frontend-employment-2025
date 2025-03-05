'use client'
import Button from '@/app/components/shared/button'
import Input from '@/app/components/shared/input'
import { useToastStore } from '@/app/store/toast'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignUpClient = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const { showToast } = useToastStore();
  const route = useRouter();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(e.target.value)
  }

  const handleSignUp = () => {
    if (!id) {
      showToast('아이디를 입력해주세요', 'error')
      return;
    }
    if (!password) {
      showToast('비밀번호를 입력해주세요', 'error')
      return;
    }
    if (!password2) {
      showToast('비밀번호 확인을 입력해주세요', 'error')
      return;
    }
    if (password !== password2) {
      showToast('비밀번호와 비밀번호 확인이 다릅니다', 'error')
      return;
    }

    const adminData = localStorage.getItem('admin')
    const adminAccounts = adminData ? JSON.parse(adminData) : [];

    const isDuplicate = adminAccounts.some((account: { id: string; password: string }) => account.id === id);

    if (isDuplicate) {
      showToast('이미 존재하는 아이디입니다.', 'error');
      return;
    }

    const newAccount = { id, password }
    adminAccounts.push(newAccount);
    localStorage.setItem('admin', JSON.stringify(adminAccounts));

    showToast('회원가입 성공!', 'success')
    setTimeout(() => {
      route.push('/sign-in')
    }, 1000)
  }


  return (
    <div className='flex flex-col justify-center items-center w-full my-4'>
      <div className='flex flex-col w-80 justify-center items-center gap-5'>
        <Input id='id' label='아이디' type='text' value={id} onChange={handleIdChange} />
        <Input id='password' label='비밀번호' type='password' value={password} onChange={handlePasswordChange} />
        <Input id='password2' label='비밀번호 확인' type='password' value={password2} onChange={handlePassword2Change} />
        <Button size='full' value='회원가입' onClick={handleSignUp}
        />
      </div>
    </div>
  )
}

export default SignUpClient