import { LayoutProps } from "@/models/common";
import { AdminLayout } from "@/shared/layouts";

export default function Layout({children}: LayoutProps) {
  return (
    <AdminLayout>{children}</AdminLayout>
  )
}
