import { LinkTabs } from '@/components/Tabs';
import { Metadata } from 'next'
import React, { FC, ReactNode } from 'react'

export const metadata:Metadata={
    title:'Features | KFC',
}
const FeaturesLayout:FC<{children:ReactNode}> = ({children}) => {
   const tabs = [
     { label: "Goals", path: "/admin/features/goals" },
     { label: "Teams", path: "/admin/features/teams" },
   ];
  return (
    <div>
    <header><LinkTabs tabs={tabs} /></header>

      <main>
        {children}
      </main>
    </div>
  )
}

export default FeaturesLayout