import React from 'react'
import CommonLayout from '../components/shared/common-layout'

export default function Group2Layout({ children }: { children: React.ReactNode }) {
  return (
    <CommonLayout title='🏠 Group2 레이아웃입니다.'>{children}</CommonLayout>
  )
}

