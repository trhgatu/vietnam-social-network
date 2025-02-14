import { LayoutProps } from "@/models";
import { AuthLayout } from "@/shared/layouts/auth";

export default function Layout({children}: LayoutProps) {
  return (
    <AuthLayout>{children}</AuthLayout>
  )
}
