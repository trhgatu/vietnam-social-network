import { LayoutProps } from "@/models/common";
import { MainLayout } from "@/shared/layouts/main";

export default function Layout({children}: LayoutProps) {
  return (
    <MainLayout>{children}</MainLayout>
  )
}
