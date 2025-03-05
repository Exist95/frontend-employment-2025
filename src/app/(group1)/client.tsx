'use client'
import React, { useEffect } from 'react'

const HomeClient = () => {
  useEffect(() => {
    const adminData = localStorage.getItem('admin');

    if (!adminData || JSON.parse(adminData).length === 0) {
      localStorage.removeItem('currentId')
      const admin = [{
        id: 'admin',
        password: 'admin1!'
      }];
      localStorage.setItem('admin', JSON.stringify(admin));
    }
  }, []);

  const currentId = localStorage.getItem('currentId');

  return (
    <div>{currentId ? `안녕하세요. ${currentId} 님` : '관리자 및 유저목록을 이용하고 싶다면 로그인을 해주세요.'}</div>
  )

}

export default HomeClient