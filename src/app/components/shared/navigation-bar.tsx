'use client'
import Link from 'next/link'
import React, { useLayoutEffect, useState } from 'react'

const links = [
  { href: '/', label: '홈' },
  { href: '/pokemons', label: '포켓몬' },
]

const NavigationBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useLayoutEffect(() => {
    const currentId = localStorage.getItem('currentId');
    setIsLoggedIn(!!currentId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentId');
    setIsLoggedIn(false);
    location.href = '/'
  };

  return (
    <nav className="relative w-full flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md mb-6 max-sm:flex-col">
      <h1 className="text-xl font-bold">위팩토리</h1>
      <div className="flex gap-2 max-sm:grid max-sm:grid-cols-3">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center justify-center px-4 py-2 rounded-lg font-bold dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 `}
          >
            {label}
          </Link>
        ))}
        {isLoggedIn && (
          <>
            <Link
              href="/admin"
              className="flex items-center justify-center px-4 py-2 rounded-lg font-bold dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              관리자
            </Link>
            <Link
              href="/admin/users"
              className="flex items-center justify-center px-4 py-2 rounded-lg font-bold dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
            >
              유저목록
            </Link>
          </>
        )}
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="flex items-center justify-center px-4 py-2 rounded-lg font-bold dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            로그아웃
          </button>
        ) : (
          <Link
            href="/sign-in"
            className="flex items-center justify-center px-4 py-2 rounded-lg font-bold dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            로그인
          </Link>
        )}
      </div>
    </nav>
  )
}

export default NavigationBar