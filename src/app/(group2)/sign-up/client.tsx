'use client'
import Button from '@/app/components/shared/button'
import Input from '@/app/components/shared/input'
import { useToastStore } from '@/app/store/toast'
import React, { useState } from 'react'

const SignUpClient = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const { showToast } = useToastStore();

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
    } else if (!password) {
      showToast('비밀번호를 입력해주세요', 'error')
    } else if (!password2) {
      showToast('비밀번호 확인을 입력해주세요', 'error')
    } else if (password !== password2) {
      showToast('비밀번호와 비밀번호 확인이 다릅니다', 'error')
    } else {
      //회원가입
      //로컬스토리지에 저장
    }
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