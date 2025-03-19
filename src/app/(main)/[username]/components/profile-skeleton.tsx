"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen pb-6 sm:pb-10 bg-gray-50 dark:bg-zinc-900">
      <div className="bg-white dark:bg-zinc-950 shadow-sm w-full">
        {/* Cover Photo Skeleton */}
        <div className="relative w-full h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden">
          <Skeleton className="w-full h-full" />
        </div>

        {/* Profile Header Skeleton */}
        <div className="max-w-4xl mx-auto px-4 pb-4 relative">
          {/* Avatar Skeleton */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:left-8 md:translate-x-0 -top-20 sm:-top-24 md:-top-28">
            <Skeleton className="w-32 h-32 sm:w-40 sm:h-40 md:w-44 md:h-44 rounded-full" />
          </div>

          {/* Profile Info Skeleton */}
          <div className="mt-16 sm:mt-20 md:mt-6 md:ml-48 lg:ml-52">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="text-center md:text-left">
                <Skeleton className="h-8 w-48 mx-auto md:mx-0 mb-2" />
                <Skeleton className="h-4 w-32 mx-auto md:mx-0" />
              </div>
              <div className="flex flex-wrap justify-center md:justify-end gap-2">
                <Skeleton className="h-9 w-32" />
              </div>
            </div>

            {/* Stats Skeleton */}
            <div className="mt-4 flex gap-6 text-sm justify-center md:justify-start flex-wrap">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Bio Skeleton */}
            <div className="mt-3 space-y-2 text-center md:text-left max-w-2xl">
              <Skeleton className="h-4 w-full max-w-md mx-auto md:mx-0" />
              <Skeleton className="h-4 w-full max-w-sm mx-auto md:mx-0" />
            </div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="sticky top-[60px] bg-white dark:bg-zinc-950 z-10 border-t border-b border-gray-200 dark:border-zinc-800 px-2 md:px-0 w-full">
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <div className="flex min-w-max">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-12 w-24 mx-1" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area Skeleton */}
      <div className="w-full max-w-7xl mx-auto mt-4 px-3 sm:px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Left Sidebar Skeleton */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-[120px]">
              <div className="bg-white dark:bg-zinc-950 rounded-lg shadow p-4">
                <Skeleton className="h-6 w-32 mb-3" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-950 rounded-lg shadow p-4 mt-4">
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-32 mb-3" />
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="aspect-square rounded-lg" />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="col-span-1 lg:col-span-3">
            <div className="space-y-6">
              {/* Post Skeleton */}
              <div className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>

              {/* Another Post Skeleton */}
              <div className="bg-white dark:bg-zinc-950 rounded-lg shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex justify-between">
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}