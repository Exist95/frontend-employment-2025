'use client'
import Input from '@/app/components/shared/input'
import React, { useState } from 'react'

const SignInClient = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("")

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div className='flex flex-col gap-2'>
      <Input id='id' label='아이디' type='text' value={id} onChange={handleIdChange} />
      <Input id='id' label='비밀번호' type='text' value={password} onChange={handlePasswordChange} />
    </div>
  )
}

export default SignInClient