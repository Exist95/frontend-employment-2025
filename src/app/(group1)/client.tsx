'use client'
import React, { useEffect, useState } from 'react'

const HomeClient = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const adminData = localStorage.getItem('admin');

    if (!adminData) {
      const admin = [{
        id: 'admin',
        password: 'admin1!'
      }];
      localStorage.setItem('admin', JSON.stringify(admin));
    }

    const currentId = localStorage.getItem('currentId');
    setUser(currentId);
  }, []);

  return (
    <div>{user ? `안녕하세요. ${user} 님` : '관리자 및 유저목록을 이용하고 싶다면 로그인을 해주세요.'}</div>
  )

}

export default HomeClient