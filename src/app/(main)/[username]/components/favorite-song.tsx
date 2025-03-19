import { Track } from "@/shared/types/track";

export default function FavoriteSong({ favoriteSong }: { favoriteSong: Track }) {
  return (
    <iframe
      className="mt-4"
      src={`https://open.spotify.com/embed/track/${favoriteSong.trackId}`}
      width="300"
      height="80"
      frameBorder="0"
      allow="encrypted-media"
    ></iframe>
  );
}
