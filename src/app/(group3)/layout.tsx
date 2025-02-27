import React from 'react'
import CommonLayout from '../components/shared/common-layout'

export default function Group3Layout({ children }: { children: React.ReactNode }) {
  return (
    <CommonLayout title='🏠 Group3 레이아웃입니다.'>{children}</CommonLayout>
  )
}

