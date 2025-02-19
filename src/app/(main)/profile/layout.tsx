import { LayoutProps } from "@/models/common";
import { ProfileLayout } from "@/shared/layouts/profile";

export default function Layout({children}: LayoutProps) {
  return (
    <ProfileLayout>{children}</ProfileLayout>
  )
}
