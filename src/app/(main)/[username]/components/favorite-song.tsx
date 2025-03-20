import { Track } from "@/shared/types/track";
import { Music } from "lucide-react";

export default function FavoriteSong({ favoriteSong }: { favoriteSong: Track }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl p-3 shadow-sm border border-gray-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 bg-gray-100 dark:bg-zinc-800 rounded-lg">
          <Music className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </div>
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Bài hát yêu thích</h3>
      </div>
      <div className="rounded-lg overflow-hidden">
        <iframe
          src={`https://open.spotify.com/embed/track/${favoriteSong.trackId}`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
}
