'use client'
import Link from 'next/link'
import React from 'react'

const links = [
  { href: '/', label: '홈' },
  { href: '/pokemons', label: '포켓몬' },
  { href: '/sign-in', label: '로그인' },
  { href: '/sign-up', label: '회원가입' },
  { href: '/admin', label: '관리자' },
  { href: '/admin/users', label: '유저목록' }
]

const NavigationBar = () => {

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
      </div>
    </nav>
  )
}

export default NavigationBar