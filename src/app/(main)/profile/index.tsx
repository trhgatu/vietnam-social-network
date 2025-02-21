'use client'

import CoverPhoto from "./components/cover-photo";
import ProfileHeader from "./components/profile-header";
import ProfileTabs from "./components/profile-tabs";
import { useState } from "react";
import ProfilePosts from "./components/profile-posts";
import ProfileInfo from "./components/profile-info";
import ProfileFriends from "./components/profile-friends";
import ProfilePhotos from "./components/profile-photos";

const TABS = {
  POSTS: "posts",
  INFO: "info",
  FRIENDS: "friends",
  PHOTOS: "photos",
  VIDEOS: "videos",
};

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState(TABS.POSTS);

  return (
    <div className="max-w-4xl mx-auto">
      <CoverPhoto />
      <ProfileHeader />
      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-4">
        {activeTab === TABS.POSTS && <ProfilePosts />}
        {activeTab === TABS.INFO && <ProfileInfo />}
        {activeTab === TABS.FRIENDS && <ProfileFriends />}
        {activeTab === TABS.PHOTOS && <ProfilePhotos />}
      </div>
    </div>
  );
}
