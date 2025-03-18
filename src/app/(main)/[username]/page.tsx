"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProfilePage() {
  const { username } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (username) {
      router.replace(`/${username}/timeline`);
    }
  }, [username, router]);

  return null;
}
