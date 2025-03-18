'use client'

import { useAuth } from "@/shared/contexts/auth-context";
import CoverPhoto from "./components/cover-photo";
import ProfileHeader from "./components/profile-header";
import ProfileTabs from "./components/profile-tabs";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  return (
    <div>
      <CoverPhoto user={user} />
      <ProfileHeader user={user} />
      <ProfileTabs user={user} />
      <div className="mt-4">{children}</div>
    </div>
  );
}
