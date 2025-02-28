'use client'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation';
import React from 'react'

const links = [
  { href: '/', label: '홈' },
  { href: '/pokemons', label: '포켓몬 목록' },
  { href: '/sign-in', label: '로그인' },
  { href: '/sign-up', label: '회원가입' },
  { href: '/admin', label: '관리자' },
  { href: '/admin/users', label: '유저목록' }

]

const NavigationBar = () => {
  const segment = useSelectedLayoutSegment() || '';

  return (
    <nav className="w-full flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-md mb-6">
      <h1 className="text-xl font-bold">위팩토리</h1>
      <div className="flex gap-4">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`px-4 py-2 rounded-lg ${segment === href.replace("/", "") ? 'bg-blue-500 text-white' : 'hover:bg-gray-300 dark:hover:bg-gray-700'}`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default NavigationBar