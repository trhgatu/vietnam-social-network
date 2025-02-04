import { MainLayout } from "@/shared/layouts/main";

import React, { PropsWithChildren } from 'react'

export default function Layout({children}: PropsWithChildren) {
  return (
    <MainLayout>{children}</MainLayout>
  )
}
