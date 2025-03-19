export interface Track {
    id: string;
    name: string;
    title: string;
    artist: string;
    preview_url: string | null;
    image: string;
    trackId: string;
    imageUrl: string;
    spotifyUrl: string;
}

export interface TrackResponse {
    tracks: Track[];
}