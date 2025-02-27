import { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import React from 'react'
import '@/app/globals.css'
import { TanstackQueryProvider } from '@/configs/tanstack-query/provider';
import ThemeCounterButton from './theme-counter-button';
import Toast from '../toast/toast';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '위팩토리 프론트엔드',
  description: 'by 노종열',
};

interface CommonLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function CommonLayout({ children, title }: CommonLayoutProps) {

  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-800 dark:text-white flex flex-col justify-center items-center p-4`} >
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <ThemeCounterButton />
        {/* <Toast /> */}
        <TanstackQueryProvider>{children}</TanstackQueryProvider>
      </body>
    </html>
  )
}